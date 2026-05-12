'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

type Pedido = {
  id: string
  created_at: string
  itens: Array<{ nome: string; marca: string; preco: number; quantidade: number }>
  total: number
  status: string
}

const STATUS_LABEL: Record<string, string> = {
  pendente:   'Pendente',
  confirmado: 'Confirmado',
  enviado:    'Enviado',
  entregue:   'Entregue',
  cancelado:  'Cancelado',
}

const STATUS_COLOR: Record<string, string> = {
  pendente:   'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  confirmado: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  enviado:    'bg-purple-500/10 text-purple-400 border-purple-500/20',
  entregue:   'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  cancelado:  'bg-red-500/10 text-red-400 border-red-500/20',
}

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([])
  const [loading, setLoading] = useState(true)
  const [email,   setEmail]   = useState('')

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { setLoading(false); return }

      setEmail(session.user.email ?? '')

      const { data } = await supabase
        .from('pedidos')
        .select('id, created_at, itens, total, status')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })

      setPedidos(data ?? [])
      setLoading(false)
    }
    load()
  }, [])

  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        <div className="mb-10">
          <p className="text-gold text-[10px] tracking-[0.35em] uppercase mb-2 font-sans">Área do Cliente</p>
          <h1 className="font-serif text-4xl text-white">Meus Pedidos</h1>
          {email && <p className="text-ash/40 text-xs mt-1">{email}</p>}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 rounded-full border-2 border-gold/30 border-t-gold animate-spin" />
          </div>
        ) : pedidos.length === 0 ? (
          <div className="flex flex-col items-center gap-5 py-20 text-center">
            <span className="w-14 h-14 rounded-full border border-white/[0.06] flex items-center justify-center">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-ash/25">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" strokeLinecap="round" />
              </svg>
            </span>
            <div>
              <p className="text-white/70 text-sm mb-1">Nenhum pedido registrado.</p>
              <p className="text-ash/40 text-xs max-w-xs mx-auto leading-relaxed">
                {email
                  ? 'Seus próximos pedidos aparecerão aqui.'
                  : 'Faça login para ver seus pedidos.'}
              </p>
            </div>
            {!email ? (
              <Link href="/entrar" className="text-gold/55 text-[10px] tracking-[0.2em] uppercase hover:text-gold transition-colors">
                Fazer login →
              </Link>
            ) : (
              <Link href="/explorar" className="text-gold/55 text-[10px] tracking-[0.2em] uppercase hover:text-gold transition-colors">
                Explorar catálogo →
              </Link>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {pedidos.map(p => (
              <div key={p.id} className="bg-smoke border border-white/[0.05] rounded-2xl p-5">
                <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
                  <div>
                    <p className="text-ash/30 text-[10px] font-mono">
                      {new Date(p.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </p>
                    <p className="text-ash/20 text-[9px] font-mono mt-0.5">#{p.id.slice(0, 8)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] tracking-widest uppercase px-3 py-1 rounded-full border ${STATUS_COLOR[p.status] ?? 'bg-white/5 text-ash/40 border-white/10'}`}>
                      {STATUS_LABEL[p.status] ?? p.status}
                    </span>
                    <span className="font-serif text-gold text-lg">
                      R${p.total.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  {p.itens.map((item, i) => (
                    <div key={i} className="flex justify-between text-xs text-ash/60">
                      <span>{item.marca} {item.nome} × {item.quantidade}</span>
                      <span>R${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
