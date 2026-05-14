'use client'

import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { perfumes } from '@/data/perfumes'
import PerfumeCard from '@/components/PerfumeCard'
import { useTheme } from '@/components/ThemeProvider'

const NICHE_BRANDS = [
  'Xerjoff', 'Nishane', 'Parfums de Marly', 'Maison Francis Kurkdjian',
  'Creed', 'Initio', 'Kilian', 'Amouage',
]

const BRAND_META: Record<string, { css: string; tagline: string; origin: string; num: string }> = {
  'Xerjoff':                  { css: 'brand-xerjoff',          tagline: 'Luxo Italiano',         origin: 'Itália',   num: '01' },
  'Nishane':                  { css: 'brand-nishane',          tagline: 'Avant-garde Turco',      origin: 'Turquia',  num: '02' },
  'Parfums de Marly':         { css: 'brand-parfums-de-marly', tagline: 'Herança Equestre',       origin: 'França',   num: '03' },
  'Maison Francis Kurkdjian': { css: 'brand-mfk',              tagline: 'Alta Perfumaria',        origin: 'França',   num: '04' },
  'Creed':                    { css: 'brand-creed',            tagline: 'Desde 1760',             origin: 'Londres',  num: '05' },
  'Initio':                   { css: 'brand-initio',           tagline: 'Hedonismo Científico',   origin: 'França',   num: '06' },
  'Kilian':                   { css: 'brand-kilian',           tagline: 'Provocação Refinada',    origin: 'Paris',    num: '07' },
  'Amouage':                  { css: 'brand-amouage',          tagline: 'Jóia do Oriente',        origin: 'Omã',      num: '08' },
}

const nichoPerfumes = perfumes.filter(p => NICHE_BRANDS.includes(p.marca) && p.ativo)

export default function NichoPage() {
  const [brandAtiva, setBrandAtiva] = useState<string | null>(null)
  const { theme } = useTheme()
  const light = theme === 'light'

  const titleRef   = useRef<HTMLDivElement>(null)
  const eyebrowRef = useRef<HTMLParagraphElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const lineRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 })

      tl.fromTo(eyebrowRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
      )
      .fromTo(titleRef.current?.querySelectorAll('.word') ?? [],
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, stagger: 0.14, ease: 'power4.out' },
        '-=0.4'
      )
      .fromTo(lineRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.9, ease: 'power3.inOut' },
        '-=0.5'
      )
      .fromTo(subtitleRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        '-=0.5'
      )
    })
    return () => ctx.revert()
  }, [])

  const displayed = brandAtiva
    ? nichoPerfumes.filter(p => p.marca === brandAtiva)
    : nichoPerfumes

  return (
    <div className={`min-h-screen ${light ? 'bg-[#F5F0E6]' : 'bg-[#070707]'}`}>

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <div className="relative min-h-[70vh] flex flex-col justify-end pb-14 md:pb-20 overflow-hidden">

        {/* Atmospheric background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_75%_20%,rgba(201,168,76,0.05),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_70%_at_5%_90%,rgba(201,168,76,0.03),transparent)]" />

        {/* Decorative vertical rules — hidden on mobile to avoid clutter */}
        <div className="hidden md:block absolute top-0 left-[12%] bottom-0 w-px bg-gradient-to-b from-transparent via-gold/[0.08] to-transparent" />
        <div className="hidden md:block absolute top-0 right-[18%] bottom-0 w-px bg-gradient-to-b from-transparent via-gold/[0.05] to-transparent" />

        {/* Ghost counter — smaller on mobile */}
        <div className="absolute top-24 md:top-28 right-4 md:right-14 text-right select-none pointer-events-none">
          <span className="font-serif text-[4.5rem] md:text-[11rem] leading-none text-gold/[0.04] block">08</span>
          <span className="text-gold/15 text-[8px] tracking-[0.4em] uppercase block -mt-2 md:-mt-4">Maisons</span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 md:pt-36 relative z-10">

          <p
            ref={eyebrowRef}
            className="text-gold/55 text-[10px] tracking-[0.5em] uppercase mb-7 md:mb-10 opacity-0"
          >
            Seleção Exclusiva
          </p>

          {/* Overflow clips the word reveal */}
          <div className="overflow-hidden">
            <div ref={titleRef}>
              <span className="word inline-block font-serif text-[2.8rem] sm:text-[4.5rem] md:text-[7rem] leading-[0.88]
                text-white opacity-0">
                Parfumerie
              </span>
              <br />
              <span className="word inline-block font-serif text-[2.8rem] sm:text-[4.5rem] md:text-[7rem] leading-[0.88]
                italic text-gradient-gold opacity-0">
                de Nicho
              </span>
            </div>
          </div>

          {/* Animated line */}
          <div
            ref={lineRef}
            className="nicho-line h-px bg-gradient-to-r from-gold/40 via-gold/20 to-transparent mt-7 md:mt-10 mb-6 md:mb-8 origin-left opacity-0"
          />

          <p
            ref={subtitleRef}
            className={`text-sm leading-relaxed max-w-xs opacity-0
              ${light ? 'text-noir/55' : 'text-ash/60'}`}
          >
            Ateliês independentes que recusam compromissos.
            Ingredientes raros e narrativas olfativas únicas.
          </p>
        </div>
      </div>

      {/* ── BRAND CAROUSEL ───────────────────────────────────────────── */}
      <div className={`relative border-y ${light ? 'border-noir/8' : 'border-gold/[0.07]'}`}>

        {/* Fade masks */}
        <div className={`absolute left-0 top-0 bottom-0 w-10 z-10 pointer-events-none
          bg-gradient-to-r ${light ? 'from-[#F5F0E6]' : 'from-[#070707]'} to-transparent`} />
        <div className={`absolute right-0 top-0 bottom-0 w-10 z-10 pointer-events-none
          bg-gradient-to-l ${light ? 'from-[#F5F0E6]' : 'from-[#070707]'} to-transparent`} />

        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-3 py-4 px-4 w-max">
            {NICHE_BRANDS.map((brand) => {
              const meta = BRAND_META[brand]
              const isActive = brandAtiva === brand
              return (
                <button
                  key={brand}
                  type="button"
                  data-surface="dark"
                  onClick={() => setBrandAtiva(isActive ? null : brand)}
                  className={`${meta.css} relative flex-shrink-0 rounded-xl px-5 py-4
                    w-[180px] md:w-[220px] text-left border
                    transition-all duration-300 overflow-hidden group
                    ${isActive
                      ? 'border-gold shadow-[0_0_24px_rgba(201,168,76,0.18)]'
                      : 'border-gold/[0.08] hover:border-gold/40'
                    }`}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                    bg-[radial-gradient(ellipse_80%_80%_at_50%_110%,rgba(201,168,76,0.07),transparent)]" />
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px]
                      bg-gradient-to-r from-transparent via-gold to-transparent" />
                  )}
                  <p className="text-gold/35 text-[8px] tracking-[0.35em] uppercase mb-2 font-mono">{meta.num}</p>
                  <p className="font-serif text-white text-sm leading-tight">{brand}</p>
                  <p className="text-ash/40 text-[9px] tracking-wide mt-1.5">{meta.origin} · {meta.tagline}</p>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── PRODUCT GRID ──────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">

        <div className="flex items-start justify-between gap-3 mb-10">
          <div className="min-w-0 flex-1">
            <h2 className={`font-serif text-2xl md:text-3xl leading-snug truncate ${light ? 'text-noir' : 'text-white'}`}>
              {brandAtiva ?? 'Toda a Seleção'}
            </h2>
            <p className={`text-[10px] tracking-[0.3em] uppercase mt-1.5 ${light ? 'text-noir/35' : 'text-ash/35'}`}>
              {displayed.length} fragrância{displayed.length !== 1 ? 's' : ''}
            </p>
          </div>

          {brandAtiva && (
            <button
              type="button"
              onClick={() => setBrandAtiva(null)}
              className="shrink-0 flex items-center gap-1.5 text-gold/50 hover:text-gold
                text-[10px] tracking-[0.25em] uppercase transition-colors duration-200 mt-1"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 1l8 8M9 1L1 9" strokeLinecap="round" />
              </svg>
              Limpar
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayed.map(p => (
            <div key={p.id} className="animate-card-in h-full">
              <PerfumeCard perfume={p} />
            </div>
          ))}
        </div>

        {displayed.length === 0 && (
          <div className="py-24 text-center">
            <p className={`font-serif text-2xl ${light ? 'text-noir/25' : 'text-white/15'}`}>
              Nenhum resultado
            </p>
          </div>
        )}
      </div>

      {/* ── FOOTER NOTE ───────────────────────────────────────────────── */}
      <div className={`border-t py-10 ${light ? 'border-noir/8' : 'border-white/[0.04]'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className={`text-[11px] tracking-[0.35em] uppercase ${light ? 'text-noir/25' : 'text-ash/25'}`}>
            Todas as fragrâncias são 100% originais · Importação direta
          </p>
        </div>
      </div>
    </div>
  )
}
