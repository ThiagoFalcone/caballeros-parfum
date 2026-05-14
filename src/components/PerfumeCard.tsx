'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Perfume } from '@/types'
import { useCart } from '@/context/CartContext'
import { useTheme } from './ThemeProvider'
import { useWishlist } from '@/context/WishlistContext'
import { useToast } from '@/context/ToastContext'

interface Props { perfume: Perfume }

export default function PerfumeCard({ perfume }: Props) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)
  const { theme } = useTheme()
  const light = theme === 'light'
  const { toggle, isWishlisted } = useWishlist()
  const { showToast } = useToast()

  const handleAdd = () => {
    addToCart(perfume)
    setAdded(true)
    showToast(perfume.nome, 'Adicionado ao carrinho')
    setTimeout(() => setAdded(false), 1800)
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const wasWishlisted = isWishlisted(perfume.id)
    toggle(perfume.id)
    if (!wasWishlisted) showToast(perfume.nome, 'Adicionado aos favoritos')
  }

  const wishlisted = isWishlisted(perfume.id)

  const [reais, centavos] = perfume.preco.toFixed(2).split('.')

  return (
    <div
      className={`group relative flex flex-col rounded-2xl overflow-hidden
        border transition-all duration-500 ease-out
        ${light
          ? 'bg-white border-gold/20 hover:border-gold/50 hover:shadow-[0_20px_50px_-8px_rgba(201,168,76,0.18)]'
          : 'bg-gradient-to-b from-[#131313] to-noir border-white/[0.05] hover:border-gold/20 md:hover:shadow-[0_24px_64px_-8px_rgba(201,168,76,0.13),inset_0_0_0_1px_rgba(201,168,76,0.08)] md:hover:[transform:perspective(1000px)_rotateY(2deg)_rotateX(1.5deg)_translateY(-6px)]'
        }`}
    >
      <Link href={`/perfume/${perfume.slug}`} className="flex-1 flex flex-col">

        {/* ── Palco da imagem ─────────────────────────────────────── */}
        <div className={`relative aspect-[3/4] overflow-hidden ${light ? 'bg-[#F5F0E6]' : 'bg-noir'}`}>

          {/* Aura dourada que aparece no hover */}
          <div className="absolute inset-0 transition-opacity duration-700 opacity-0 group-hover:opacity-100
            bg-[radial-gradient(ellipse_70%_55%_at_50%_65%,rgba(201,168,76,0.07),transparent)]" />

          {/* Imagem do frasco */}
          <Image
            src={perfume.imagemUrl}
            alt={perfume.nome}
            fill
            className="object-contain transition-transform duration-700 ease-out
              scale-[0.80] group-hover:scale-[0.88]
              drop-shadow-[0_12px_32px_rgba(0,0,0,0.4)]"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
          />

          {/* Vinheta inferior */}
          <div className={`absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t
            ${light ? 'from-white via-white/40 to-transparent' : 'from-noir via-noir/40 to-transparent'}`} />

          {/* Família olfativa */}
          <span className={`absolute top-3 right-3
            text-gold/75 text-[9px] tracking-[0.25em] uppercase font-sans
            backdrop-blur-sm px-2.5 py-[5px] rounded-full border border-gold/15
            ${light ? 'bg-white/70' : 'bg-noir/70'}`}>
            {perfume.familia}
          </span>

          {/* Wishlist heart */}
          <button
            type="button"
            onClick={handleWishlist}
            aria-label={wishlisted ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            className={`absolute top-3 left-3 z-10 w-8 h-8 rounded-full flex items-center justify-center
              border backdrop-blur-sm transition-all duration-300
              ${wishlisted
                ? 'bg-gold/20 border-gold/50 text-gold scale-110'
                : `border-white/10 text-white/40 hover:text-gold/70 hover:border-gold/30 hover:scale-105 ${light ? 'bg-white/70' : 'bg-noir/70'}`
              }`}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill={wishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* ── Linha separadora animada ─────────────────────────────── */}
        <div className={`relative h-px overflow-hidden ${light ? 'bg-black/[0.06]' : 'bg-white/[0.04]'}`}>
          <div className="absolute inset-0
            bg-gradient-to-r from-transparent via-gold/50 to-transparent
            -translate-x-full group-hover:translate-x-full
            transition-transform duration-700 ease-in-out" />
        </div>

        {/* ── Informações ──────────────────────────────────────────── */}
        <div className="px-4 pt-3.5 pb-2">
          <p className="text-gold/55 text-[9px] tracking-[0.3em] uppercase font-sans mb-1.5">
            {perfume.marca}
          </p>
          <h3 className={`font-serif text-[1.05rem] leading-snug mb-2 transition-colors duration-300
            group-hover:text-gold/90 ${light ? 'text-noir' : 'text-white'}`}>
            {perfume.nome}
          </h3>
          <p className={`text-[10px] tracking-wide leading-relaxed ${light ? 'text-noir/45' : 'text-ash/50'}`}>
            {perfume.notasTopo.join(' · ')}
          </p>
        </div>
      </Link>

      {/* ── Rodapé: preço + botão ────────────────────────────────── */}
      <div className="px-4 pb-4 pt-1 flex items-end justify-between gap-2">
        <div className="leading-none">
          <span className="font-serif text-gold/50 text-[10px] tracking-widest uppercase block mb-0.5">
            A partir de
          </span>
          <span className="font-serif text-gold text-xl leading-none">
            R${reais}
            <span className="text-sm text-gold/60">,{centavos}</span>
          </span>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          aria-label={added ? 'Adicionado ao carrinho' : 'Adicionar ao carrinho'}
          className={`
            shrink-0 flex items-center gap-1.5
            text-[10px] tracking-[0.18em] uppercase font-sans
            px-3 py-2 rounded-lg border
            transition-all duration-300
            ${added
              ? 'bg-gold text-noir border-gold'
              : 'bg-transparent text-gold/70 border-gold/20 hover:bg-gold/10 hover:border-gold/40 hover:text-gold'
            }
          `}
        >
          {added ? (
            <>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Ok
            </>
          ) : (
            <>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 5v14M5 12h14" strokeLinecap="round" />
              </svg>
              Carrinho
            </>
          )}
        </button>
      </div>
    </div>
  )
}
