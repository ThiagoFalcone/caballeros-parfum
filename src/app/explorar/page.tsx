'use client'

import { useState } from 'react'
import { perfumes, familias } from '@/data/perfumes'
import PerfumeCard from '@/components/PerfumeCard'
import WhatsAppButton from '@/components/WhatsAppButton'

export default function ExplorarPage() {
  const [familiaAtiva, setFamiliaAtiva] = useState<string | null>(null)

  const filtrados = familiaAtiva
    ? perfumes.filter(p => p.familia === familiaAtiva && p.ativo)
    : perfumes.filter(p => p.ativo)

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-10">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-2">Catálogo Completo</p>
          <h1 className="font-serif text-4xl md:text-5xl text-white">Explorar Perfumes</h1>
        </div>

        <div className="flex gap-2 flex-wrap mb-10 overflow-x-auto pb-2">
          <button
            type="button"
            onClick={() => setFamiliaAtiva(null)}
            className={`flex-shrink-0 px-4 py-2 rounded-full border text-xs font-sans tracking-wider uppercase transition-all ${
              !familiaAtiva ? 'bg-gold text-noir border-gold' : 'border-gold/30 text-ash hover:border-gold/60 hover:text-white'
            }`}
          >
            Todos
          </button>
          {familias.map(familia => (
            <button
              type="button"
              key={familia}
              onClick={() => setFamiliaAtiva(familia)}
              className={`flex-shrink-0 px-4 py-2 rounded-full border text-xs font-sans tracking-wider uppercase transition-all ${
                familiaAtiva === familia ? 'bg-gold text-noir border-gold' : 'border-gold/30 text-ash hover:border-gold/60 hover:text-white'
              }`}
            >
              {familia}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filtrados.map(perfume => (
            <PerfumeCard key={perfume.id} perfume={perfume} />
          ))}
        </div>

        {filtrados.length === 0 && (
          <p className="text-ash text-center py-20">Nenhum perfume encontrado.</p>
        )}
      </div>
      <WhatsAppButton />
    </div>
  )
}
