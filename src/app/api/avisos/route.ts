import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function POST(req: Request) {
  const { perfume_id, email } = await req.json()

  if (!perfume_id || !email) {
    return NextResponse.json({ error: 'Dados incompletos.' }, { status: 400 })
  }

  const { error } = await supabaseAdmin
    .from('avisos_estoque')
    .insert({ perfume_id, email })

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ ok: true }) // already registered — silent success
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
