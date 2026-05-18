import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

async function isAdmin(req: Request): Promise<boolean> {
  const token = req.headers.get('authorization')?.replace('Bearer ', '')
  if (!token) return false
  const { data } = await supabaseAdmin.auth.getUser(token)
  return data.user?.email === process.env.ADMIN_EMAIL
}

export async function GET(req: Request) {
  if (!await isAdmin(req)) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })
  }

  const { data, error } = await supabaseAdmin
    .from('avaliacoes')
    .select('id, created_at, nome, nota, comentario, aprovado, perfume_id')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
