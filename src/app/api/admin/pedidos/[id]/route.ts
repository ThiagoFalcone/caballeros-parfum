import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

async function isAdmin(req: Request) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '')
  if (!token) return false
  const { data: { user } } = await supabaseAdmin.auth.getUser(token)
  return user?.email === process.env.ADMIN_EMAIL
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  if (!await isAdmin(req)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { status } = await req.json()
  const allowed = ['pendente', 'confirmado', 'enviado', 'entregue', 'cancelado']
  if (!allowed.includes(status)) {
    return NextResponse.json({ error: 'Status inválido.' }, { status: 400 })
  }

  const { error } = await supabaseAdmin
    .from('pedidos')
    .update({ status })
    .eq('id', params.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
