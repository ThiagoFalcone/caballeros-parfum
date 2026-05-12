'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { perfumes } from '@/data/perfumes'
import { supabase } from '@/lib/supabase'

type Pedido = {
  id: string
  created_at: string
  nome_cliente: string
  email_cliente: string
  itens: Array<{ nome: string; marca: string; preco: number; quantidade: number }>
  total: number
  status: 'pendente' | 'confirmado' | 'enviado' | 'entregue' | 'cancelado'
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

const NEXT_STATUS: Record<string, string> = {
  pendente:   'confirmado',
  confirmado: 'enviado',
  enviado:    'entregue',
}

export default function AdminPage() {
  const [pedidos,  setPedidos]  = useState<Pedido[]>([])
  const [loading,  setLoading]  = useState(true)
  const [updating, setUpdating] = useState<string | null>(null)
  const [tab,      setTab]      = useState<'pedidos' | 'catalogo'>('pedidos')

  const fetchPedidos = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return

    const res = await fetch('/api/admin/pedidos', {
      headers: { Authorization: `Bearer ${session.access_token}` },
    })
    if (res.ok) setPedidos(await res.json())
    setLoading(false)
  }, [])

  useEffect(() => { fetchPedidos() }, [fetchPedidos])

  async function updateStatus(id: string, status: string) {
    setUpdating(id)
    const { data: { session } } = await supabase.auth.getSession()
    await fetch(`/api/admin/pedidos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.access_token}`,
      },
      body: JSON.stringify({ status }),
    })
    await fetchPedidos()
    setUpdating(null)
  }

  // Stats
  const total     = perfumes.length
  const marcas    = Array.from(new Set(perfumes.map(p => p.marca))).length
  const pendentes = pedidos.filter(p => p.status === 'pendente').length
  const receita   = pedidos.filter(p => p.status !== 'cancelado').reduce((s, p) => s + p.total, 0)

  const stats = [
    { label: 'Pedidos',   value: pedidos.length },
    { label: 'Pendentes', value: pendentes,      highlight: pendentes > 0 },
    { label: 'Receita',   value: `R$ ${receita.toFixed(2)}` },
    { label: 'Perfumes',  value: total },
    { label: 'Marcas',    value: marcas },
  ]

  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="mb-10 flex items-start justify-between flex-wrap gap-4">
          <div>
            <p className="text-gold text-[10px] tracking-[0.35em] uppercase mb-2 font-sans">Painel</p>
            <h1 className="font-serif text-4xl text-white">Administração</h1>
          </div>
          <button type="button" onClick={fetchPedidos}
            className="text-ash/40 text-[10px] tracking-widest uppercase border border-white/[0.06] px-4 py-2 rounded-lg hover:text-gold transition-colors font-sans">
            Atualizar
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-10">
          {stats.map(s => (
            <div key={s.label} className={`border rounded-xl p-4 ${(s as { highlight?: boolean }).highlight ? 'bg-yellow-500/5 border-yellow-500/20' : 'bg-smoke border-white/[0.05]'}`}>
              <p className="text-ash/45 text-[9px] tracking-[0.2em] uppercase font-sans mb-2">{s.label}</p>
              <p className={`font-serif text-2xl ${(s as { highlight?: boolean }).highlight ? 'text-yellow-400' : 'text-white'}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-white/[0.06] mb-8">
          {(['pedidos', 'catalogo'] as const).map(t => (
            <button key={t} type="button" onClick={() => setTab(t)}
              className={`pb-3 text-sm font-sans tracking-wide border-b-2 -mb-px transition-colors ${t === tab ? 'text-gold border-gold' : 'text-ash/50 border-transparent hover:text-ash/70'}`}>
              {t === 'pedidos' ? 'Pedidos' : 'Catálogo'}
            </button>
          ))}
        </div>

        {/* ── TAB PEDIDOS ── */}
        {tab === 'pedidos' && (
          loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-6 h-6 rounded-full border-2 border-gold/30 border-t-gold animate-spin" />
            </div>
          ) : pedidos.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-ash/40 text-sm">Nenhum pedido ainda.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {pedidos.map(p => (
                <div key={p.id} className="bg-smoke border border-white/[0.05] rounded-2xl p-5">
                  <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
                    <div>
                      <p className="text-white font-medium text-sm">{p.nome_cliente}</p>
                      <p className="text-ash/50 text-xs">{p.email_cliente}</p>
                      <p className="text-ash/30 text-[10px] mt-1 font-mono">
                        {new Date(p.created_at).toLocaleString('pt-BR')}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className={`text-[10px] tracking-widest uppercase px-3 py-1 rounded-full border ${STATUS_COLOR[p.status]}`}>
                        {STATUS_LABEL[p.status]}
                      </span>
                      <span className="font-serif text-gold text-lg">
                        R${p.total.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  </div>

                  {/* Itens */}
                  <div className="flex flex-col gap-1 mb-4">
                    {p.itens.map((item, i) => (
                      <div key={i} className="flex justify-between text-xs text-ash/60">
                        <span>{item.marca} {item.nome} × {item.quantidade}</span>
                        <span>R${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}</span>
                      </div>
                    ))}
                  </div>

                  {/* Ações */}
                  {NEXT_STATUS[p.status] && (
                    <div className="flex gap-2 flex-wrap">
                      <button
                        type="button"
                        disabled={updating === p.id}
                        onClick={() => updateStatus(p.id, NEXT_STATUS[p.status])}
                        className="text-[10px] tracking-widest uppercase px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold hover:bg-gold/20 transition-colors disabled:opacity-50"
                      >
                        {updating === p.id ? '…' : `Marcar como ${STATUS_LABEL[NEXT_STATUS[p.status]]}`}
                      </button>
                      {p.status !== 'cancelado' && (
                        <button
                          type="button"
                          disabled={updating === p.id}
                          onClick={() => updateStatus(p.id, 'cancelado')}
                          className="text-[10px] tracking-widest uppercase px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors disabled:opacity-50"
                        >
                          Cancelar
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )
        )}

        {/* ── TAB CATÁLOGO ── */}
        {tab === 'catalogo' && (
          <div className="bg-smoke border border-white/[0.05] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.04]">
                    {['ID', 'Nome', 'Marca', 'Família', 'Preço', 'Status'].map(col => (
                      <th key={col} className="text-left text-ash/35 text-[9px] tracking-[0.2em] uppercase font-sans font-normal px-5 py-3">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {perfumes.map((p, i) => (
                    <tr key={p.id} className={`border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors ${i % 2 !== 0 ? 'bg-white/[0.01]' : ''}`}>
                      <td className="px-5 py-3 text-ash/25 font-mono text-xs">{p.id}</td>
                      <td className="px-5 py-3">
                        <Link href={`/perfume/${p.slug}`} className="text-white/75 hover:text-gold transition-colors text-sm">
                          {p.nome}
                        </Link>
                      </td>
                      <td className="px-5 py-3 text-ash/55 text-xs">{p.marca}</td>
                      <td className="px-5 py-3 text-ash/55 text-xs">{p.familia}</td>
                      <td className="px-5 py-3 text-gold/75 font-mono text-xs">R${p.preco.toFixed(2)}</td>
                      <td className="px-5 py-3">
                        <span className={`text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full ${p.ativo ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/5 text-ash/35'}`}>
                          {p.ativo ? 'Ativo' : 'Inativo'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
