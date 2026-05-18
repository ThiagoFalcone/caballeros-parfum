'use client'

import { useState } from 'react'

interface Props { perfumeId: string; nomePerfume: string }

export default function AviseMe({ perfumeId, nomePerfume }: Props) {
  const [email,   setEmail]   = useState('')
  const [loading, setLoading] = useState(false)
  const [done,    setDone]    = useState(false)
  const [erro,    setErro]    = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setErro('')
    const res = await fetch('/api/avisos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ perfume_id: perfumeId, email }),
    })
    setLoading(false)
    if (res.ok) {
      setDone(true)
    } else {
      const data = await res.json()
      setErro(data.error ?? 'Erro ao cadastrar.')
    }
  }

  if (done) {
    return (
      <div className="flex items-center gap-2 text-emerald-400 text-sm py-3">
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Avisaremos quando <strong>{nomePerfume}</strong> voltar ao estoque.
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-ash/60 text-sm">
        <span className="w-2 h-2 rounded-full bg-red-400/70 inline-block" />
        Produto esgotado — cadastre seu e-mail para ser avisado
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email" required value={email} onChange={e => setEmail(e.target.value)}
          placeholder="seu@email.com"
          className="flex-1 bg-noir/60 border border-white/[0.08] rounded-lg px-4 py-2.5 text-white text-sm
            placeholder:text-ash/25 focus:outline-none focus:border-gold/40 transition-colors"
        />
        <button
          type="submit" disabled={loading}
          className="shrink-0 bg-gold/10 border border-gold/30 text-gold text-sm font-sans px-4 py-2.5
            rounded-lg hover:bg-gold/20 transition-colors disabled:opacity-50"
        >
          {loading ? '…' : 'Avisar'}
        </button>
      </form>
      {erro && <p className="text-red-400/80 text-xs">{erro}</p>}
    </div>
  )
}
