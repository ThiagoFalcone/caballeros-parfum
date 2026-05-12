import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function POST(req: Request) {
  const { nome, email, password } = await req.json()

  const { error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { nome },
  })

  if (error) {
    const msg = error.message.includes('already registered')
      ? 'Este e-mail já está cadastrado.'
      : error.message
    return NextResponse.json({ error: msg }, { status: 400 })
  }

  return NextResponse.json({ success: true })
}
