'use client'

import { useState } from 'react'
import Image from 'next/image'
import { perfumes } from '@/data/perfumes'
import PerfumeCard from '@/components/PerfumeCard'
import ScrollScene from '@/components/ScrollScene'

const marcas = Array.from(new Set(perfumes.map(p => p.marca)))

const marcaImages: Record<string, string> = {
  'Lattafa': 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=800&q=80',
  'Al Haramain': 'https://images.unsplash.com/photo-1588514912908-e8bc2cf6c6c7?w=800&q=80',
  'Ajmal': 'https://images.unsplash.com/photo-1594913656049-5b6d779b9b4e?w=800&q=80',
  'Swiss Arabian': 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80',
  'Rasasi': 'https://images.unsplash.com/photo-1548695607-9c73430547ac?w=800&q=80',
  'Armaf': 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&q=80',
}

export default function ColecoesPage() {
  const [marcaAtiva, setMarcaAtiva] = useState<string | null>(null)

  const produtosMarca = marcaAtiva
    ? perfumes.filter(p => p.marca === marcaAtiva && p.ativo)
    : []

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-2">Por Marca</p>
          <h1 className="font-serif text-4xl md:text-5xl text-white">Coleções</h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
          {marcas.map((marca, i) => (
            <ScrollScene key={marca} animation="fadeUp" delay={i * 0.08}>
              <button
                type="button"
                onClick={() => setMarcaAtiva(marcaAtiva === marca ? null : marca)}
                className={`relative overflow-hidden rounded-2xl aspect-video w-full border transition-all ${
                  marcaAtiva === marca ? 'border-gold' : 'border-gold/10 hover:border-gold/30'
                }`}
              >
                <Image
                  src={marcaImages[marca] ?? perfumes.find(p => p.marca === marca)?.imagemUrl ?? ''}
                  alt={marca} fill className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-noir/90 to-noir/30 transition-opacity ${
                  marcaAtiva === marca ? 'opacity-90' : 'opacity-70'
                }`} />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <h2 className="font-serif text-xl md:text-2xl text-white">{marca}</h2>
                  <p className="text-gold text-xs tracking-widest mt-1">
                    {perfumes.filter(p => p.marca === marca).length} perfumes
                  </p>
                </div>
              </button>
            </ScrollScene>
          ))}
        </div>

        {marcaAtiva && (
          <div>
            <ScrollScene className="mb-8">
              <h2 className="font-serif text-3xl text-white">{marcaAtiva}</h2>
            </ScrollScene>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {produtosMarca.map(p => (
                <ScrollScene key={p.id} animation="fadeUp">
                  <PerfumeCard perfume={p} />
                </ScrollScene>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
