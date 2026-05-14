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
  { id: 'relevancia', label: 'Relevância'  },
  { id: 'menor',      label: 'Menor preço' },
  { id: 'maior',      label: 'Maior preço' },
  { id: 'az',         label: 'A – Z'       },
  { id: 'za',         label: 'Z – A'       },
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
  const [ordemAberta,  setOrdemAberta]  = useState(false)
  const [faixaAberta,  setFaixaAberta]  = useState(false)

  const ordemRef = useRef<HTMLDivElement>(null)
  const faixaRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ordemRef.current && !ordemRef.current.contains(e.target as Node)) setOrdemAberta(false)
      if (faixaRef.current && !faixaRef.current.contains(e.target as Node)) setFaixaAberta(false)
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

  const dropdownPanel = light
    ? 'bg-white border-noir/[0.07] shadow-[0_8px_32px_rgba(0,0,0,0.08)]'
    : 'bg-smoke border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.5)]'

  const dropdownItem = (active: boolean) =>
    active
      ? 'text-gold'
      : light
        ? 'text-noir/45 hover:text-noir hover:bg-gold/[0.04]'
        : 'text-ash hover:text-white hover:bg-white/[0.04]'

  const inactiveLabel = light ? 'text-noir/35 hover:text-noir/65' : 'text-ash/40 hover:text-ash/80'

  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="mb-10">
          <p className="text-gold text-[10px] tracking-[0.4em] uppercase mb-2">Catálogo Completo</p>
          <h1 className={`font-serif text-4xl md:text-5xl ${light ? 'text-noir' : 'text-white'}`}>
            Explorar Perfumes
          </h1>
        </div>

        {/* ── Search ────────────────────────────────────── */}
        <div className={`flex items-center gap-3 pb-4 mb-7 border-b
          ${light ? 'border-noir/[0.08]' : 'border-white/[0.06]'}`}>
          <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.5"
            viewBox="0 0 24 24" className="text-gold/35 shrink-0">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            placeholder="Buscar por nome, marca ou família…"
            value={busca}
            onChange={e => setBusca(e.target.value)}
            className={`flex-1 bg-transparent outline-none text-sm font-sans
              ${light ? 'text-noir placeholder:text-noir/25' : 'text-white placeholder:text-ash/35'}`}
          />
          {busca && (
            <button type="button" onClick={() => setBusca('')}
              className="text-ash/40 hover:text-gold transition-colors text-xl leading-none">×</button>
          )}
        </div>

        {/* ── Filter bar: família | preço + ordenar ─────── */}
        <div className="flex items-center justify-between gap-4">

          {/* Família — text tabs, horizontal scroll */}
          <div className="flex items-center gap-5 overflow-x-auto scrollbar-hide min-w-0 pb-3">
            {([{ id: null, label: 'Todos' }, ...familias.map(f => ({ id: f as string | null, label: f }))] as { id: string | null; label: string }[]).map(({ id, label }) => {
              const active = familiaAtiva === id
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => setFamiliaAtiva(id)}
                  className={`shrink-0 text-[11px] font-sans tracking-[0.2em] uppercase
                    transition-all duration-200 whitespace-nowrap pb-2 border-b
                    ${active
                      ? 'text-gold border-gold'
                      : `border-transparent ${inactiveLabel}`
                    }`}
                >
                  {label}
                </button>
              )
            })}
          </div>

          {/* Preço + Sort */}
          <div className="flex items-center gap-4 shrink-0 pb-3">

            {/* Preço dropdown */}
            <div ref={faixaRef} className="relative">
              <button
                type="button"
                onClick={() => { setFaixaAberta(v => !v); setOrdemAberta(false) }}
                className={`flex items-center gap-1 text-[11px] font-sans tracking-[0.2em] uppercase
                  transition-colors duration-200
                  ${faixa !== 'todos' ? 'text-gold' : inactiveLabel}`}
              >
                {faixa === 'todos' ? 'Preço' : FAIXAS.find(f => f.id === faixa)?.label}
                <svg width="7" height="7" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8"
                  className={`transition-transform duration-200 ${faixaAberta ? 'rotate-180' : ''}`}>
                  <path d="M2 3.5l3 3 3-3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {faixaAberta && (
                <div className={`absolute right-0 top-full mt-2 z-30 min-w-[170px] rounded-xl border overflow-hidden ${dropdownPanel}`}>
                  {FAIXAS.map(f => (
                    <button key={f.id} type="button"
                      onClick={() => { setFaixa(f.id); setFaixaAberta(false) }}
                      className={`w-full text-left px-4 py-2.5 text-[11px] font-sans tracking-[0.15em] uppercase transition-colors duration-150 ${dropdownItem(f.id === faixa)}`}>
                      {f.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <span className={`h-3 w-px ${light ? 'bg-noir/[0.12]' : 'bg-white/[0.10]'}`} />

            {/* Ordenar dropdown */}
            <div ref={ordemRef} className="relative">
              <button
                type="button"
                onClick={() => { setOrdemAberta(v => !v); setFaixaAberta(false) }}
                className={`flex items-center gap-1 text-[11px] font-sans tracking-[0.2em] uppercase
                  transition-colors duration-200
                  ${ordem !== 'relevancia' ? 'text-gold' : inactiveLabel}`}
              >
                {ORDENACOES.find(o => o.id === ordem)?.label}
                <svg width="7" height="7" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8"
                  className={`transition-transform duration-200 ${ordemAberta ? 'rotate-180' : ''}`}>
                  <path d="M2 3.5l3 3 3-3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {ordemAberta && (
                <div className={`absolute right-0 top-full mt-2 z-30 min-w-[140px] rounded-xl border overflow-hidden ${dropdownPanel}`}>
                  {ORDENACOES.map(o => (
                    <button key={o.id} type="button"
                      onClick={() => { setOrdem(o.id); setOrdemAberta(false) }}
                      className={`w-full text-left px-4 py-2.5 text-[11px] font-sans tracking-[0.15em] uppercase transition-colors duration-150 ${dropdownItem(o.id === ordem)}`}>
                      {o.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Thin rule */}
        <div className={`h-px mb-7 ${light ? 'bg-noir/[0.06]' : 'bg-white/[0.04]'}`} />

        {/* Count + clear */}
        <div className="flex items-center justify-between mb-8">
          <p className={`text-[11px] font-sans tracking-wider ${light ? 'text-noir/30' : 'text-ash/40'}`}>
            {filtrados.length} {filtrados.length === 1 ? 'perfume encontrado' : 'perfumes encontrados'}
          </p>
          {temFiltros && (
            <button type="button" onClick={limpar}
              className={`text-[11px] font-sans tracking-wider uppercase transition-colors
                ${light ? 'text-noir/30 hover:text-gold' : 'text-ash/40 hover:text-gold'}`}>
              Limpar filtros
            </button>
          )}
        </div>

        {/* Grid */}
        {!mounted ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 8 }).map((_, i) => <PerfumeCardSkeleton key={i} />)}
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
            <p className={`text-sm font-sans ${light ? 'text-noir/40' : 'text-ash'}`}>
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
