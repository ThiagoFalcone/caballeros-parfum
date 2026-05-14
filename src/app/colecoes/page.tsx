'use client'

import { useState } from 'react'
import Link from 'next/link'
import { perfumes } from '@/data/perfumes'
import PerfumeCard from '@/components/PerfumeCard'
import ScrollScene from '@/components/ScrollScene'

const brandSlug = (marca: string) => marca.toLowerCase().replace(/\s+/g, '-')

const marcas = Array.from(new Set(perfumes.map(p => p.marca)))

// Maps brand name → CSS class (defined in globals.css) + monogram letter
const marcaAccent: Record<string, { cssClass: string; label: string }> = {
  // Arabic brands
  'Lattafa':                    { cssClass: 'brand-lattafa',          label: 'L'  },
  'Al Haramain':                { cssClass: 'brand-al-haramain',      label: 'AH' },
  'Ajmal':                      { cssClass: 'brand-ajmal',            label: 'A'  },
  'Swiss Arabian':              { cssClass: 'brand-swiss-arabian',    label: 'SA' },
  'Rasasi':                     { cssClass: 'brand-rasasi',           label: 'R'  },
  'Armaf':                      { cssClass: 'brand-armaf',            label: 'AR' },
  'Maison Alhambra':            { cssClass: 'brand-maison-alhambra',  label: 'MA' },
  'Afnan':                      { cssClass: 'brand-afnan',            label: 'AF' },
  'Ard Al Zaafaran':            { cssClass: 'brand-ard-al-zaafaran',  label: 'AZ' },
  'Zimaya':                     { cssClass: 'brand-zimaya',           label: 'Z'  },
  // Niche brands
  'Xerjoff':                    { cssClass: 'brand-xerjoff',          label: 'XJ' },
  'Nishane':                    { cssClass: 'brand-nishane',          label: 'N'  },
  'Parfums de Marly':           { cssClass: 'brand-parfums-de-marly', label: 'PM' },
  'Maison Francis Kurkdjian':   { cssClass: 'brand-mfk',              label: 'MFK'},
  'Creed':                      { cssClass: 'brand-creed',            label: 'C'  },
  'Initio':                     { cssClass: 'brand-initio',           label: 'I'  },
  'Kilian':                     { cssClass: 'brand-kilian',           label: 'K'  },
  'Amouage':                    { cssClass: 'brand-amouage',          label: 'AM' },
}

export default function ColecoesPage() {
  const [marcaAtiva, setMarcaAtiva] = useState<string | null>(null)

  const produtosMarca = marcaAtiva
    ? perfumes.filter(p => p.marca === marcaAtiva && p.ativo)
    : []

  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-2">Por Marca</p>
          <h1 className="font-serif text-4xl md:text-5xl text-white">Coleções</h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
          {marcas.map((marca, i) => {
            const accent = marcaAccent[marca] ?? { cssClass: 'bg-smoke', label: marca[0] }
            const isActive = marcaAtiva === marca
            return (
              <ScrollScene key={marca} animation="fadeUp" delay={i * 0.08}>
                <button
                  type="button"
                  data-surface="dark"
                  onClick={() => setMarcaAtiva(isActive ? null : marca)}
                  className={`${accent.cssClass} relative overflow-hidden rounded-2xl aspect-video w-full border transition-all duration-300 ${
                    isActive
                      ? 'border-gold shadow-[0_0_30px_rgba(201,168,76,0.2)]'
                      : 'border-gold/10 hover:border-gold/40'
                  }`}
                >
                  {/* Arabesque circle ornament */}
                  <span
                    aria-hidden
                    className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full border border-gold/10 opacity-60"
                  />
                  <span
                    aria-hidden
                    className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full border border-gold/15 opacity-60"
                  />

                  {/* Monogram */}
                  <span className="absolute top-4 left-4 font-serif text-gold/20 text-5xl leading-none select-none">
                    {accent.label}
                  </span>

                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                    <h2 className="font-serif text-xl md:text-2xl text-white drop-shadow">{marca}</h2>
                    <p className="text-gold text-xs tracking-widest">
                      {perfumes.filter(p => p.marca === marca).length} perfumes
                    </p>
                  </div>

                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold" />
                  )}
                </button>
              </ScrollScene>
            )
          })}
        </div>

        {marcaAtiva && (
          <div key={marcaAtiva}>
            <div className="flex items-baseline justify-between mb-8 animate-card-in">
              <h2 className="font-serif text-3xl text-white">{marcaAtiva}</h2>
              <Link
                href={`/colecoes/${brandSlug(marcaAtiva)}`}
                className="text-gold/60 text-[10px] tracking-[0.2em] uppercase font-sans hover:text-gold transition-colors duration-200"
              >
                Ver coleção completa →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {produtosMarca.map((p) => (
                <div key={p.id} className="animate-card-in">
                  <PerfumeCard perfume={p} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
