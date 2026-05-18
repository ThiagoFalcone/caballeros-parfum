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

  const { delta } = await req.json() // +1 or -1

  const { data: current } = await supabaseAdmin
    .from('estoque')
    .select('quantidade')
    .eq('perfume_id', params.id)
    .single()

  const novaQtd = Math.max(0, (current?.quantidade ?? 0) + delta)

  const { error } = await supabaseAdmin
    .from('estoque')
    .upsert({ perfume_id: params.id, quantidade: novaQtd })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ quantidade: novaQtd })
}
