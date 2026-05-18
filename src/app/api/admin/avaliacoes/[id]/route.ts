import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

async function isAdmin(req: Request): Promise<boolean> {
  const token = req.headers.get('authorization')?.replace('Bearer ', '')
  if (!token) return false
  const { data } = await supabaseAdmin.auth.getUser(token)
  return data.user?.email === process.env.ADMIN_EMAIL
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  if (!await isAdmin(req)) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })
  }

  const { aprovado } = await req.json()

  const { error } = await supabaseAdmin
    .from('avaliacoes')
    .update({ aprovado })
    .eq('id', params.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  if (!await isAdmin(req)) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })
  }

  const { error } = await supabaseAdmin
    .from('avaliacoes')
    .delete()
    .eq('id', params.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
