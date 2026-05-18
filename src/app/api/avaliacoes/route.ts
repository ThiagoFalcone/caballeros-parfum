import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function POST(req: Request) {
  const { perfume_id, nome, nota, comentario } = await req.json()

  if (!perfume_id || !nome || !nota) {
    return NextResponse.json({ error: 'Dados incompletos.' }, { status: 400 })
  }

  if (nota < 1 || nota > 5) {
    return NextResponse.json({ error: 'Nota inválida.' }, { status: 400 })
  }

  const { error } = await supabaseAdmin
    .from('avaliacoes')
    .insert({ perfume_id, nome, nota, comentario: comentario || null, aprovado: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true })
}
