'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { perfumes, familias } from '@/data/perfumes'
import PerfumeCard from '@/components/PerfumeCard'
import PerfumeCardSkeleton from '@/components/PerfumeCardSkeleton'
import WhatsAppButton from '@/components/WhatsAppButton'
import { useTheme } from '@/components/ThemeProvider'

const FAIXAS = [
  { id: 'todos',    label: 'Todos os preços' },
  { id: 'ate150',   label: 'Até R$150'       },
  { id: '150-200',  label: 'R$150 – R$200'   },
  { id: 'acima200', label: 'Acima de R$200'  },
]

const ORDENACOES = [
  { id: 'relevancia', label: 'Relevância'   },
  { id: 'menor',      label: 'Menor preço'  },
  { id: 'maior',      label: 'Maior preço'  },
  { id: 'az',         label: 'A – Z'        },
  { id: 'za',         label: 'Z – A'        },
]

export default function ExplorarPage() {
  const { theme } = useTheme()
  const light = theme === 'light'
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const [busca,        setBusca]        = useState('')
  const [familiaAtiva, setFamiliaAtiva] = useState<string | null>(null)
  const [faixa,        setFaixa]        = useState('todos')
  const [ordem,        setOrdem]        = useState('relevancia')

  const filtrados = useMemo(() => {
    let lista = perfumes.filter(p => p.ativo)

    if (busca.trim()) {
      const q = busca.toLowerCase()
      lista = lista.filter(p =>
        p.nome.toLowerCase().includes(q) ||
        p.marca.toLowerCase().includes(q) ||
        p.familia.toLowerCase().includes(q)
      )
    }

    if (familiaAtiva) lista = lista.filter(p => p.familia === familiaAtiva)

    if (faixa === 'ate150')   lista = lista.filter(p => p.preco <= 150)
    if (faixa === '150-200')  lista = lista.filter(p => p.preco > 150 && p.preco <= 200)
    if (faixa === 'acima200') lista = lista.filter(p => p.preco > 200)

    const sorted = [...lista]
    if (ordem === 'menor') sorted.sort((a, b) => a.preco - b.preco)
    if (ordem === 'maior') sorted.sort((a, b) => b.preco - a.preco)
    if (ordem === 'az')    sorted.sort((a, b) => a.nome.localeCompare(b.nome, 'pt'))
    if (ordem === 'za')    sorted.sort((a, b) => b.nome.localeCompare(a.nome, 'pt'))

    return sorted
  }, [busca, familiaAtiva, faixa, ordem])

  const [ordemAberta, setOrdemAberta] = useState(false)
  const ordemRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ordemRef.current && !ordemRef.current.contains(e.target as Node)) {
        setOrdemAberta(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const temFiltros = busca || familiaAtiva || faixa !== 'todos' || ordem !== 'relevancia'

  function limpar() {
    setBusca('')
    setFamiliaAtiva(null)
    setFaixa('todos')
    setOrdem('relevancia')
  }

  const pillBase = 'flex-shrink-0 px-4 py-2 rounded-full border text-xs font-sans tracking-wider uppercase transition-all duration-200'
  const pillActive   = 'bg-gold text-noir border-gold'
  const pillInactive = light
    ? 'border-gold/30 text-noir/60 hover:border-gold/60 hover:text-noir'
    : 'border-gold/30 text-ash hover:border-gold/60 hover:text-white'

  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="mb-8">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-2">Catálogo Completo</p>
          <h1 className="font-serif text-4xl md:text-5xl text-white">Explorar Perfumes</h1>
        </div>

        {/* ── Busca ─────────────────────────────────────────────── */}
        <div className={`flex items-center gap-3 rounded-xl border px-4 py-3 mb-6 transition-all duration-200
          focus-within:border-gold/50
          ${light ? 'bg-white border-gold/20' : 'bg-smoke border-white/10'}`}>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5"
            viewBox="0 0 24 24" className="text-gold/50 shrink-0">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            placeholder="Buscar por nome, marca ou família…"
            value={busca}
            onChange={e => setBusca(e.target.value)}
            className={`flex-1 bg-transparent outline-none text-sm font-sans
              ${light ? 'text-noir placeholder:text-noir/35' : 'text-white placeholder:text-ash/50'}`}
          />
          {busca && (
            <button type="button" onClick={() => setBusca('')}
              className="text-ash hover:text-gold transition-colors text-lg leading-none">
              ×
            </button>
          )}
        </div>

        {/* ── Família ───────────────────────────────────────────── */}
        <div className="flex gap-2 flex-wrap overflow-x-auto pb-1 mb-3">
          <button type="button" onClick={() => setFamiliaAtiva(null)}
            className={`${pillBase} ${!familiaAtiva ? pillActive : pillInactive}`}>
            Todos
          </button>
          {familias.map(f => (
            <button type="button" key={f} onClick={() => setFamiliaAtiva(f)}
              className={`${pillBase} ${familiaAtiva === f ? pillActive : pillInactive}`}>
              {f}
            </button>
          ))}
        </div>

        {/* ── Preço + Ordem ─────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
          <div className="flex gap-2 flex-wrap">
            {FAIXAS.map(f => (
              <button type="button" key={f.id} onClick={() => setFaixa(f.id)}
                className={`${pillBase} ${faixa === f.id ? pillActive : pillInactive}`}>
                {f.label}
              </button>
            ))}
          </div>

          {/* Custom dropdown — evita estilo nativo do browser */}
          <div ref={ordemRef} className="relative flex-shrink-0">
            <button
              type="button"
              onClick={() => setOrdemAberta(v => !v)}
              className={`flex items-center gap-2 text-xs font-sans tracking-wider uppercase
                border rounded-full px-4 py-2 transition-colors duration-200
                ${light
                  ? 'bg-transparent border-gold/25 text-noir/60 hover:border-gold/50 hover:text-noir'
                  : 'bg-transparent border-white/10 text-ash hover:border-gold/30 hover:text-white'}`}
            >
              {ORDENACOES.find(o => o.id === ordem)?.label}
              <svg
                width="10" height="10" viewBox="0 0 10 10" fill="none"
                stroke="currentColor" strokeWidth="1.5"
                className={`transition-transform duration-200 ${ordemAberta ? 'rotate-180' : ''}`}
              >
                <path d="M2 3.5l3 3 3-3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {ordemAberta && (
              <div className={`absolute right-0 top-full mt-1 z-30 min-w-[140px]
                rounded-xl border overflow-hidden shadow-xl
                ${light ? 'bg-white border-gold/15' : 'bg-smoke border-white/10'}`}>
                {ORDENACOES.map(o => (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => { setOrdem(o.id); setOrdemAberta(false) }}
                    className={`w-full text-left px-4 py-2.5 text-xs font-sans tracking-wider uppercase
                      transition-colors duration-150
                      ${o.id === ordem
                        ? 'text-gold'
                        : light
                          ? 'text-noir/55 hover:text-noir hover:bg-gold/5'
                          : 'text-ash hover:text-white hover:bg-white/5'}`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Contagem + limpar ─────────────────────────────────── */}
        <div className="flex items-center justify-between mb-6">
          <p className={`text-xs font-sans tracking-wider ${light ? 'text-noir/45' : 'text-ash/60'}`}>
            {filtrados.length} {filtrados.length === 1 ? 'perfume encontrado' : 'perfumes encontrados'}
          </p>
          {temFiltros && (
            <button type="button" onClick={limpar}
              className="text-xs text-gold/70 hover:text-gold font-sans tracking-wider transition-colors underline underline-offset-2">
              Limpar filtros
            </button>
          )}
        </div>

        {/* ── Grid ──────────────────────────────────────────────── */}
        {!mounted ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <PerfumeCardSkeleton key={i} />
            ))}
          </div>
        ) : filtrados.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filtrados.map(perfume => (
              <PerfumeCard key={perfume.id} perfume={perfume} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 py-24">
            <span className="text-gold/20 text-7xl font-serif select-none">∅</span>
            <p className={`text-sm font-sans ${light ? 'text-noir/50' : 'text-ash'}`}>
              Nenhum perfume encontrado com esses filtros.
            </p>
            <button type="button" onClick={limpar}
              className="text-gold text-xs tracking-widest uppercase border border-gold/30 px-6 py-2 rounded-full hover:bg-gold/10 transition-colors">
              Ver todos
            </button>
          </div>
        )}
      </div>

      <WhatsAppButton />
    </div>
  )
}
