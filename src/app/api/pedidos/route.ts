import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function POST(req: Request) {
  const body = await req.json()
  const { nome_cliente, email_cliente, whatsapp, itens, total, user_id } = body

  if (!nome_cliente || !email_cliente || !itens || !total) {
    return NextResponse.json({ error: 'Dados incompletos.' }, { status: 400 })
  }

  const { data, error } = await supabaseAdmin
    .from('pedidos')
    .insert({ nome_cliente, email_cliente, whatsapp: whatsapp ?? null, itens, total, user_id: user_id ?? null })
    .select('id')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ id: data.id })
}
