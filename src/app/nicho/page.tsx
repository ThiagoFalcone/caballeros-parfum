'use client'

import { useState } from 'react'
import { perfumes } from '@/data/perfumes'
import PerfumeCard from '@/components/PerfumeCard'
import ScrollScene from '@/components/ScrollScene'
import { useTheme } from '@/components/ThemeProvider'

const NICHE_BRANDS = [
  'Xerjoff',
  'Nishane',
  'Parfums de Marly',
  'Maison Francis Kurkdjian',
  'Creed',
  'Initio',
  'Kilian',
  'Amouage',
]

const BRAND_META: Record<string, { css: string; tagline: string; origin: string }> = {
  'Xerjoff':                  { css: 'brand-xerjoff',          tagline: 'Luxo Italiano',         origin: 'Itália'       },
  'Nishane':                  { css: 'brand-nishane',          tagline: 'Avant-garde Turco',      origin: 'Turquia'      },
  'Parfums de Marly':         { css: 'brand-parfums-de-marly', tagline: 'Herança Equestre',       origin: 'França'       },
  'Maison Francis Kurkdjian': { css: 'brand-mfk',              tagline: 'Alta Perfumaria',        origin: 'França'       },
  'Creed':                    { css: 'brand-creed',            tagline: 'Desde 1760',             origin: 'Londres'      },
  'Initio':                   { css: 'brand-initio',           tagline: 'Hedonismo Científico',   origin: 'França'       },
  'Kilian':                   { css: 'brand-kilian',           tagline: 'Provocação Refinada',    origin: 'Paris'        },
  'Amouage':                  { css: 'brand-amouage',          tagline: 'Jóia do Oriente',        origin: 'Omã'          },
}

const nichoPerfumes = perfumes.filter(p => NICHE_BRANDS.includes(p.marca) && p.ativo)

export default function NichoPage() {
  const [brandAtiva, setBrandAtiva] = useState<string | null>(null)
  const { theme } = useTheme()
  const light = theme === 'light'

  const displayed = brandAtiva
    ? nichoPerfumes.filter(p => p.marca === brandAtiva)
    : nichoPerfumes

  return (
    <div className={`min-h-screen ${light ? 'bg-[#F5F0E6]' : 'bg-[#080808]'}`}>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden pt-28 pb-20">
        {/* Background atmosphere */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(201,168,76,0.05),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_20%_80%,rgba(201,168,76,0.03),transparent)]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <ScrollScene>
            <p className="text-gold text-[10px] tracking-[0.45em] uppercase mb-5">
              Seleção Exclusiva
            </p>
          </ScrollScene>
          <ScrollScene animation="fadeUp" delay={0.1}>
            <h1 className={`font-serif text-5xl md:text-7xl leading-[0.95] mb-6 ${light ? 'text-noir' : 'text-white'}`}>
              Parfumerie
              <br />
              <span className="text-gradient-gold italic">de Nicho</span>
            </h1>
          </ScrollScene>
          <ScrollScene animation="fadeUp" delay={0.2}>
            <p className={`text-base md:text-lg leading-relaxed max-w-xl ${light ? 'text-noir/60' : 'text-ash/70'}`}>
              Criações de ateliês independentes que recusam compromissos.
              Ingredientes raros, tiragens limitadas e narrativas olfativas
              que desafiam convenções.
            </p>
          </ScrollScene>
        </div>

        {/* Ornamental divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-16">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
            <span className="text-gold/30 text-xs tracking-[0.4em] uppercase">Maisons</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
          </div>
        </div>
      </div>

      {/* ── Brand selector ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-16">
          {NICHE_BRANDS.map((brand, i) => {
            const meta = BRAND_META[brand]
            const isActive = brandAtiva === brand
            const count = nichoPerfumes.filter(p => p.marca === brand).length
            return (
              <ScrollScene key={brand} animation="fadeUp" delay={i * 0.06}>
                <button
                  type="button"
                  data-surface="dark"
                  onClick={() => setBrandAtiva(isActive ? null : brand)}
                  className={`${meta.css} relative overflow-hidden rounded-xl aspect-[4/3] w-full border
                    transition-all duration-400 group text-left
                    ${isActive
                      ? 'border-gold shadow-[0_0_28px_rgba(201,168,76,0.18),inset_0_0_0_1px_rgba(201,168,76,0.12)]'
                      : 'border-gold/10 hover:border-gold/35 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
                    }`}
                >
                  {/* Inner glow on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                    bg-[radial-gradient(ellipse_70%_70%_at_50%_100%,rgba(201,168,76,0.06),transparent)]" />

                  {/* Ornament rings */}
                  <span aria-hidden className="absolute -bottom-10 -right-10 w-44 h-44 rounded-full border border-gold/[0.06]" />
                  <span aria-hidden className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full border border-gold/[0.09]" />

                  {/* Active indicator */}
                  {isActive && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />}

                  <div className="absolute inset-0 p-4 flex flex-col justify-between">
                    <div>
                      <p className="text-gold/45 text-[9px] tracking-[0.3em] uppercase mb-1">{meta.origin}</p>
                      <h3 className="font-serif text-white text-base leading-snug">{brand}</h3>
                    </div>
                    <div className="flex items-end justify-between">
                      <p className="text-ash/50 text-[9px] tracking-wide">{meta.tagline}</p>
                      <span className={`text-[9px] tracking-widest font-sans px-2 py-0.5 rounded-full border
                        ${isActive ? 'border-gold/50 text-gold' : 'border-gold/15 text-gold/40'}`}>
                        {count}
                      </span>
                    </div>
                  </div>
                </button>
              </ScrollScene>
            )
          })}
        </div>

        {/* ── Filter state label ─────────────────────────────────────── */}
        <div className="flex items-center justify-between mb-8">
          <div>
            {brandAtiva ? (
              <div className="flex items-center gap-3">
                <h2 className={`font-serif text-2xl ${light ? 'text-noir' : 'text-white'}`}>{brandAtiva}</h2>
                <button
                  type="button"
                  onClick={() => setBrandAtiva(null)}
                  className="text-gold/50 hover:text-gold text-[10px] tracking-[0.2em] uppercase transition-colors"
                >
                  × Limpar
                </button>
              </div>
            ) : (
              <h2 className={`font-serif text-2xl ${light ? 'text-noir' : 'text-white'}`}>
                Toda a Seleção
              </h2>
            )}
            <p className={`text-[10px] tracking-widest uppercase mt-1 ${light ? 'text-noir/40' : 'text-ash/40'}`}>
              {displayed.length} fragrância{displayed.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Subtle horizontal rule */}
          <div className="hidden sm:block h-px flex-1 ml-8 bg-gradient-to-r from-gold/15 to-transparent" />
        </div>

        {/* ── Product grid ───────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayed.map((p) => (
            <div key={p.id} className="animate-card-in h-full">
              <PerfumeCard perfume={p} />
            </div>
          ))}
        </div>

        {displayed.length === 0 && (
          <div className="py-24 text-center">
            <p className={`font-serif text-2xl mb-2 ${light ? 'text-noir/30' : 'text-white/20'}`}>Nenhum resultado</p>
          </div>
        )}
      </div>

      {/* ── Editorial footer note ──────────────────────────────────────── */}
      <div className={`border-t mt-8 py-12 ${light ? 'border-noir/8' : 'border-white/[0.04]'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className={`text-[11px] tracking-[0.3em] uppercase ${light ? 'text-noir/30' : 'text-ash/30'}`}>
            Todas as fragrâncias são 100% originais · Importação direta
          </p>
        </div>
      </div>
    </div>
  )
}
