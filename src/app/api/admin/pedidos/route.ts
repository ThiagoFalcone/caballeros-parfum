import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

async function isAdmin(req: Request) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '')
  if (!token) return false
  const { data: { user } } = await supabaseAdmin.auth.getUser(token)
  return user?.email === process.env.ADMIN_EMAIL
}

export async function GET(req: Request) {
  if (!await isAdmin(req)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { data, error } = await supabaseAdmin
    .from('pedidos')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
