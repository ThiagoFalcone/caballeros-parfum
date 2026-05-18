import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

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

  // Notificação por e-mail
  if (resend && process.env.ADMIN_EMAIL) {
    const linhas = (itens as Array<{ nome: string; marca: string; quantidade: number; preco: number }>)
      .map(i => `<tr>
        <td style="padding:6px 12px;border-bottom:1px solid #2a2a2a;">${i.marca} ${i.nome}</td>
        <td style="padding:6px 12px;border-bottom:1px solid #2a2a2a;text-align:center;">${i.quantidade}</td>
        <td style="padding:6px 12px;border-bottom:1px solid #2a2a2a;text-align:right;">R$${(i.preco * i.quantidade).toFixed(2).replace('.', ',')}</td>
      </tr>`).join('')

    await resend.emails.send({
      from: 'Caballeros Parfum <onboarding@resend.dev>',
      to: process.env.ADMIN_EMAIL,
      subject: `🧴 Novo pedido — ${nome_cliente}`,
      html: `
        <div style="background:#0a0a0a;color:#fff;font-family:sans-serif;padding:32px;max-width:560px;margin:0 auto;border-radius:12px;">
          <h2 style="color:#C9A84C;margin:0 0 4px;">Caballeros Parfum</h2>
          <p style="color:#888;font-size:12px;margin:0 0 24px;">Novo pedido recebido</p>
          <p style="margin:0 0 8px;"><strong>Cliente:</strong> ${nome_cliente}</p>
          <p style="margin:0 0 8px;"><strong>E-mail:</strong> ${email_cliente}</p>
          <p style="margin:0 0 24px;"><strong>Pedido #:</strong> ${data.id}</p>
          <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
            <thead>
              <tr style="background:#1a1a1a;">
                <th style="padding:8px 12px;text-align:left;color:#888;font-size:11px;">Produto</th>
                <th style="padding:8px 12px;color:#888;font-size:11px;">Qtd</th>
                <th style="padding:8px 12px;text-align:right;color:#888;font-size:11px;">Valor</th>
              </tr>
            </thead>
            <tbody>${linhas}</tbody>
          </table>
          <p style="text-align:right;font-size:18px;color:#C9A84C;font-weight:bold;">
            Total: R$${Number(total).toFixed(2).replace('.', ',')}
          </p>
          <a href="${process.env.NEXT_PUBLIC_BASE_URL}/cp-painel"
            style="display:inline-block;margin-top:16px;background:#C9A84C;color:#0a0a0a;padding:10px 20px;border-radius:8px;text-decoration:none;font-weight:bold;">
            Ver no painel
          </a>
        </div>`,
    }).catch(() => {}) // não bloquear o pedido se o e-mail falhar
  }

  return NextResponse.json({ id: data.id })
}
