import { createServerClient, type CookieOptions } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  let res = NextResponse.next()

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return res
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name: string) { return req.cookies.get(name)?.value },
        set(name: string, value: string, options: CookieOptions) {
          res = NextResponse.next({ request: { headers: req.headers } })
          res.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          res = NextResponse.next({ request: { headers: req.headers } })
          res.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  const path = req.nextUrl.pathname
  const isProtected = path.startsWith('/conta') || path.startsWith('/admin')
  const isAuthPage  = path === '/entrar' || path === '/cadastrar'

  if (isProtected && !session) {
    const url = req.nextUrl.clone()
    url.pathname = '/entrar'
    url.searchParams.set('next', path)
    return NextResponse.redirect(url)
  }

  if (isAuthPage && session) {
    return NextResponse.redirect(new URL('/conta', req.url))
  }

  return res
}

export const config = {
  matcher: ['/conta/:path*', '/admin/:path*', '/entrar', '/cadastrar'],
}
