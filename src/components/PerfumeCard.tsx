'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Perfume } from '@/types'
import { useCart } from '@/context/CartContext'

interface Props { perfume: Perfume }

export default function PerfumeCard({ perfume }: Props) {
  const { addToCart } = useCart()

  return (
    <div className="group relative bg-smoke rounded-2xl overflow-hidden border border-gold/10 hover:border-gold/30 transition-all duration-300
      md:hover:[transform:perspective(800px)_rotateY(3deg)_rotateX(2deg)] md:hover:shadow-[0_20px_60px_rgba(201,168,76,0.1)]">
      <Link href={`/perfume/${perfume.slug}`}>
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={perfume.imagemUrl}
            alt={perfume.nome}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 80vw, (max-width: 1200px) 33vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-noir/80 via-transparent to-transparent" />
          <span className="absolute top-3 left-3 bg-noir/70 backdrop-blur text-gold text-[10px] tracking-widest uppercase px-2 py-1 rounded-full border border-gold/20">
            {perfume.familia}
          </span>
        </div>
        <div className="p-4">
          <p className="text-gold text-xs tracking-widest uppercase mb-1">{perfume.marca}</p>
          <h3 className="font-serif text-white text-lg leading-tight mb-1">{perfume.nome}</h3>
          <p className="text-ash text-xs">{perfume.notasTopo.slice(0, 2).join(' · ')}</p>
        </div>
      </Link>
      <div className="px-4 pb-4 flex items-center justify-between">
        <span className="text-white font-sans font-medium">
          R${perfume.preco.toFixed(2).replace('.', ',')}
        </span>
        <button
          onClick={() => addToCart(perfume)}
          className="bg-gold/10 border border-gold/30 text-gold text-xs px-3 py-2 rounded-lg hover:bg-gold hover:text-noir transition-all"
        >
          + Carrinho
        </button>
      </div>
    </div>
  )
}
