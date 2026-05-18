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

type Avaliacao = {
  id: string
  created_at: string
  nome: string
  nota: number
  comentario: string | null
  aprovado: boolean
  perfume_id: string
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

function StarDisplay({ nota }: { nota: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24"
          fill={i <= nota ? '#C9A84C' : 'none'} stroke="#C9A84C" strokeWidth="1.5">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            strokeLinejoin="round"/>
        </svg>
      ))}
    </div>
  )
}

export default function AdminPage() {
  const [pedidos,    setPedidos]    = useState<Pedido[]>([])
  const [loading,    setLoading]    = useState(true)
  const [updating,   setUpdating]   = useState<string | null>(null)
  const [tab,        setTab]        = useState<'pedidos' | 'catalogo' | 'avaliacoes'>('pedidos')
  const [estoque,    setEstoque]    = useState<Record<string, number>>({})
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([])
  const [avLoading,  setAvLoading]  = useState(false)

  const fetchPedidos = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return
    const res = await fetch('/api/admin/pedidos', {
      headers: { Authorization: `Bearer ${session.access_token}` },
    })
    if (res.ok) setPedidos(await res.json())
    setLoading(false)
  }, [])

  const fetchEstoque = useCallback(async () => {
    const { data } = await supabase.from('estoque').select('perfume_id, quantidade')
    if (!data) return
    const map: Record<string, number> = {}
    data.forEach(({ perfume_id, quantidade }: { perfume_id: string; quantidade: number }) => {
      map[perfume_id] = quantidade
    })
    setEstoque(map)
  }, [])

  const fetchAvaliacoes = useCallback(async () => {
    setAvLoading(true)
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) { setAvLoading(false); return }
    const res = await fetch('/api/admin/avaliacoes', {
      headers: { Authorization: `Bearer ${session.access_token}` },
    })
    if (res.ok) setAvaliacoes(await res.json())
    setAvLoading(false)
  }, [])

  useEffect(() => {
    fetchPedidos()
    fetchEstoque()
  }, [fetchPedidos, fetchEstoque])

  useEffect(() => {
    if (tab === 'avaliacoes') fetchAvaliacoes()
  }, [tab, fetchAvaliacoes])

  async function updateEstoque(perfumeId: string, delta: number) {
    setUpdating(`estoque-${perfumeId}`)
    const { data: { session } } = await supabase.auth.getSession()
    const res = await fetch(`/api/admin/estoque/${perfumeId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.access_token}`,
      },
      body: JSON.stringify({ delta }),
    })
    if (res.ok) {
      const { quantidade } = await res.json()
      setEstoque(prev => ({ ...prev, [perfumeId]: quantidade }))
    }
    setUpdating(null)
  }

  async function updateAvaliacao(id: string, aprovado: boolean) {
    setUpdating(`av-${id}`)
    const { data: { session } } = await supabase.auth.getSession()
    await fetch(`/api/admin/avaliacoes/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.access_token}`,
      },
      body: JSON.stringify({ aprovado }),
    })
    setAvaliacoes(prev => prev.map(a => a.id === id ? { ...a, aprovado } : a))
    setUpdating(null)
  }

  async function deleteAvaliacao(id: string) {
    setUpdating(`av-${id}`)
    const { data: { session } } = await supabase.auth.getSession()
    await fetch(`/api/admin/avaliacoes/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${session?.access_token}` },
    })
    setAvaliacoes(prev => prev.filter(a => a.id !== id))
    setUpdating(null)
  }

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
  const total       = perfumes.length
  const marcas      = Array.from(new Set(perfumes.map(p => p.marca))).length
  const pendentes   = pedidos.filter(p => p.status === 'pendente').length
  const receita     = pedidos.filter(p => p.status !== 'cancelado').reduce((s, p) => s + p.total, 0)
  const avPendentes = avaliacoes.filter(a => !a.aprovado).length

  const stats = [
    { label: 'Pedidos',   value: pedidos.length },
    { label: 'Pendentes', value: pendentes,   highlight: pendentes > 0 },
    { label: 'Receita',   value: 'R$ ' + receita.toFixed(2) },
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
          {(['pedidos', 'catalogo', 'avaliacoes'] as const).map(t => (
            <button key={t} type="button" onClick={() => setTab(t)}
              className={`pb-3 text-sm font-sans tracking-wide border-b-2 -mb-px transition-colors flex items-center gap-2 ${t === tab ? 'text-gold border-gold' : 'text-ash/50 border-transparent hover:text-ash/70'}`}>
              {t === 'pedidos' ? 'Pedidos' : t === 'catalogo' ? 'Catalogo' : 'Avaliacoes'}
              {t === 'avaliacoes' && avPendentes > 0 && (
                <span className="bg-yellow-500/20 text-yellow-400 text-[9px] px-1.5 py-0.5 rounded-full">{avPendentes}</span>
              )}
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
                        <span>{item.marca} {item.nome} x{item.quantidade}</span>
                        <span>R${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}</span>
                      </div>
                    ))}
                  </div>

                  {/* Acoes */}
                  {NEXT_STATUS[p.status] && (
                    <div className="flex gap-2 flex-wrap">
                      <button
                        type="button"
                        disabled={updating === p.id}
                        onClick={() => updateStatus(p.id, NEXT_STATUS[p.status])}
                        className="text-[10px] tracking-widest uppercase px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold hover:bg-gold/20 transition-colors disabled:opacity-50"
                      >
                        {updating === p.id ? '...' : `Marcar como ${STATUS_LABEL[NEXT_STATUS[p.status]]}`}
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

        {/* ── TAB CATALOGO ── */}
        {tab === 'catalogo' && (
          <div className="bg-smoke border border-white/[0.05] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.04]">
                    {['ID', 'Nome', 'Marca', 'Familia', 'Preco', 'Estoque', 'Status'].map(col => (
                      <th key={col} className="text-left text-ash/35 text-[9px] tracking-[0.2em] uppercase font-sans font-normal px-5 py-3">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {perfumes.map((p, i) => {
                    const qty = estoque[p.id] ?? null
                    const isUpdating = updating === `estoque-${p.id}`
                    return (
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
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              disabled={isUpdating || qty === 0}
                              onClick={() => updateEstoque(p.id, -1)}
                              className="w-6 h-6 rounded-md bg-white/[0.05] border border-white/[0.08] text-ash/60 hover:text-white hover:bg-white/[0.1] transition-colors disabled:opacity-30 text-sm font-mono flex items-center justify-center"
                            >
                              -
                            </button>
                            <span className={`font-mono text-xs w-6 text-center ${qty === 0 ? 'text-red-400' : qty !== null && qty <= 3 ? 'text-yellow-400' : 'text-white/70'}`}>
                              {isUpdating ? '...' : qty ?? '-'}
                            </span>
                            <button
                              type="button"
                              disabled={isUpdating}
                              onClick={() => updateEstoque(p.id, +1)}
                              className="w-6 h-6 rounded-md bg-white/[0.05] border border-white/[0.08] text-ash/60 hover:text-white hover:bg-white/[0.1] transition-colors disabled:opacity-30 text-sm font-mono flex items-center justify-center"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="px-5 py-3">
                          <span className={`text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full ${p.ativo ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/5 text-ash/35'}`}>
                            {p.ativo ? 'Ativo' : 'Inativo'}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── TAB AVALIACOES ── */}
        {tab === 'avaliacoes' && (
          avLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-6 h-6 rounded-full border-2 border-gold/30 border-t-gold animate-spin" />
            </div>
          ) : avaliacoes.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-ash/40 text-sm">Nenhuma avaliacao ainda.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {avaliacoes.map(a => {
                const perfume = perfumes.find(p => p.id === a.perfume_id)
                const isUpdating = updating === `av-${a.id}`
                return (
                  <div key={a.id} className={`bg-smoke border rounded-xl p-4 flex flex-col gap-3 ${a.aprovado ? 'border-white/[0.05]' : 'border-yellow-500/20 bg-yellow-500/[0.02]'}`}>
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          {!a.aprovado && (
                            <span className="bg-yellow-500/20 text-yellow-400 text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full">Pendente</span>
                          )}
                          {a.aprovado && (
                            <span className="bg-emerald-500/10 text-emerald-400 text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full">Publicada</span>
                          )}
                          <StarDisplay nota={a.nota} />
                        </div>
                        <p className="text-white/80 text-sm font-medium">{a.nome}</p>
                        {perfume && (
                          <Link href={`/perfume/${perfume.slug}`} className="text-gold/60 text-xs hover:text-gold transition-colors">
                            {perfume.marca} {perfume.nome}
                          </Link>
                        )}
                        <p className="text-ash/30 text-[10px] font-mono">
                          {new Date(a.created_at).toLocaleString('pt-BR')}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        {!a.aprovado ? (
                          <button
                            type="button"
                            disabled={isUpdating}
                            onClick={() => updateAvaliacao(a.id, true)}
                            className="text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition-colors disabled:opacity-50"
                          >
                            {isUpdating ? '...' : 'Aprovar'}
                          </button>
                        ) : (
                          <button
                            type="button"
                            disabled={isUpdating}
                            onClick={() => updateAvaliacao(a.id, false)}
                            className="text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-ash/50 hover:text-white transition-colors disabled:opacity-50"
                          >
                            {isUpdating ? '...' : 'Despublicar'}
                          </button>
                        )}
                        <button
                          type="button"
                          disabled={isUpdating}
                          onClick={() => deleteAvaliacao(a.id)}
                          className="text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors disabled:opacity-50"
                        >
                          Excluir
                        </button>
                      </div>
                    </div>
                    {a.comentario && (
                      <p className="text-ash/60 text-sm leading-relaxed border-t border-white/[0.04] pt-3">{a.comentario}</p>
                    )}
                  </div>
                )
              })}
            </div>
          )
        )}

      </div>
    </div>
  )
}
