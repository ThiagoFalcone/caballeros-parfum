'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface Avaliacao {
  id: string
  created_at: string
  nome: string
  nota: number
  comentario: string | null
}

interface Props { perfumeId: string }

function Stars({ nota, size = 14 }: { nota: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24"
          fill={i <= nota ? '#C9A84C' : 'none'} stroke="#C9A84C" strokeWidth="1.5">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            strokeLinejoin="round"/>
        </svg>
      ))}
    </div>
  )
}

export default function AvaliacaoSection({ perfumeId }: Props) {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([])
  const [nome,       setNome]       = useState('')
  const [nota,       setNota]       = useState(5)
  const [comentario, setComentario] = useState('')
  const [hover,      setHover]      = useState(0)
  const [loading,    setLoading]    = useState(false)
  const [enviado,    setEnviado]    = useState(false)

  useEffect(() => {
    supabase
      .from('avaliacoes')
      .select('id, created_at, nome, nota, comentario')
      .eq('perfume_id', perfumeId)
      .eq('aprovado', true)
      .order('created_at', { ascending: false })
      .then(({ data }) => { if (data) setAvaliacoes(data) })
  }, [perfumeId])

  const media = avaliacoes.length
    ? avaliacoes.reduce((s, a) => s + a.nota, 0) / avaliacoes.length
    : 0

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await fetch('/api/avaliacoes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ perfume_id: perfumeId, nome, nota, comentario }),
    })
    setLoading(false)
    setEnviado(true)
    setNome(''); setComentario(''); setNota(5)
  }

  return (
    <div className="flex flex-col gap-10">

      {/* Resumo */}
      {avaliacoes.length > 0 && (
        <div className="flex items-center gap-6">
          <div className="text-center">
            <p className="font-serif text-5xl text-gold leading-none">{media.toFixed(1)}</p>
            <Stars nota={Math.round(media)} size={13} />
            <p className="text-ash/40 text-[10px] mt-1">{avaliacoes.length} avaliação{avaliacoes.length !== 1 ? 'ões' : ''}</p>
          </div>
          <div className="flex-1 flex flex-col gap-1.5">
            {[5, 4, 3, 2, 1].map(n => {
              const count = avaliacoes.filter(a => a.nota === n).length
              const pct   = avaliacoes.length ? (count / avaliacoes.length) * 100 : 0
              return (
                <div key={n} className="flex items-center gap-2">
                  <span className="text-ash/40 text-[10px] w-2">{n}</span>
                  <div className="flex-1 h-1 rounded-full bg-white/[0.06]">
                    <div className="h-full rounded-full bg-gold/60 transition-all duration-500"
                      style={{ width: `${pct}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Lista */}
      {avaliacoes.length > 0 && (
        <div className="flex flex-col gap-5">
          {avaliacoes.map(a => (
            <div key={a.id} className="border-b border-white/[0.05] pb-5">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-white/80 text-sm font-medium">{a.nome}</p>
                  <p className="text-ash/35 text-[10px] mt-0.5">
                    {new Date(a.created_at).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <Stars nota={a.nota} size={12} />
              </div>
              {a.comentario && (
                <p className="text-ash/65 text-sm leading-relaxed">{a.comentario}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Formulário */}
      {enviado ? (
        <div className="bg-noir/60 rounded-xl p-5 border border-emerald-500/20 text-emerald-400 text-sm flex items-center gap-2">
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Avaliação enviada! Será publicada após moderação.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-noir/40 rounded-xl p-5 border border-white/[0.05] flex flex-col gap-4">
          <p className="text-ash/50 text-[10px] tracking-[0.25em] uppercase">Deixar avaliação</p>

          {/* Estrelas interativas */}
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(i => (
              <button key={i} type="button"
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setNota(i)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24"
                  fill={(hover || nota) >= i ? '#C9A84C' : 'none'}
                  stroke="#C9A84C" strokeWidth="1.5"
                  className="transition-all duration-150">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                    strokeLinejoin="round"/>
                </svg>
              </button>
            ))}
          </div>

          <input
            type="text" required value={nome} onChange={e => setNome(e.target.value)}
            placeholder="Seu nome"
            className="bg-noir border border-white/[0.08] rounded-lg px-4 py-2.5 text-white text-sm
              placeholder:text-ash/25 focus:outline-none focus:border-gold/40 transition-colors"
          />
          <textarea
            value={comentario} onChange={e => setComentario(e.target.value)}
            placeholder="Conte sua experiência (opcional)"
            rows={3}
            className="bg-noir border border-white/[0.08] rounded-lg px-4 py-2.5 text-white text-sm
              placeholder:text-ash/25 focus:outline-none focus:border-gold/40 transition-colors resize-none"
          />
          <button
            type="submit" disabled={loading}
            className="self-start bg-gold text-noir font-sans font-semibold px-6 py-2.5 rounded-lg
              hover:bg-yellow-400 transition-colors disabled:opacity-60 text-sm"
          >
            {loading ? 'Enviando…' : 'Enviar avaliação'}
          </button>
        </form>
      )}
    </div>
  )
}
