'use client'

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { perfumesDestaque } from '@/data/perfumes'
import PerfumeCard from '@/components/PerfumeCard'
import ScrollScene from '@/components/ScrollScene'

gsap.registerPlugin(ScrollTrigger)

const SplineHero = dynamic(() => import('@/components/SplineHero'), { ssr: false })

export default function HomePage() {
  const heroTextRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = heroTextRef.current
    if (!el) return
    gsap.fromTo(
      el.querySelectorAll('.hero-item'),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 1, ease: 'power3.out', delay: 0.3 }
    )
  }, [])

  return (
    <>
      {/* Hero */}
      <section data-surface="dark" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="hidden md:block absolute inset-0 z-0 opacity-60">
          <SplineHero />
        </div>
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-noir/95 via-noir/70 to-transparent" />

        <div ref={heroTextRef} className="relative z-20 max-w-7xl mx-auto px-6 pt-24 pb-16">
          <p className="hero-item text-gold text-xs tracking-[0.3em] uppercase mb-4 opacity-0">
            Curadoria exclusiva
          </p>
          <h1 className="hero-item font-serif text-5xl md:text-7xl text-white leading-tight max-w-xl mb-6 opacity-0">
            O Oriente<br />
            <em className="text-gradient-gold">em cada gota</em>
          </h1>
          <p className="hero-item text-ash text-lg max-w-md leading-relaxed mb-10 opacity-0">
            Perfumes árabes autênticos das melhores casas: Lattafa, Al Haramain, Ajmal e muito mais.
          </p>
          <div className="hero-item flex flex-col sm:flex-row gap-4 opacity-0">
            <Link href="/explorar"
              className="inline-flex items-center gap-2 bg-gold text-noir font-sans font-semibold px-8 py-4 rounded-full hover:bg-yellow-400 transition-colors">
              Explorar Coleção
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link href="/sobre"
              className="inline-flex items-center gap-2 border border-gold/30 text-gold font-sans px-8 py-4 rounded-full hover:bg-gold/10 transition-colors">
              Nossa História
            </Link>
          </div>
        </div>

        <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-noir/90 backdrop-blur border-t border-gold/10 p-4">
          <Link href="/explorar"
            className="flex items-center justify-center gap-2 bg-gold text-noir font-sans font-semibold py-3 rounded-full w-full">
            Ver Coleção →
          </Link>
        </div>
      </section>

      {/* Em Destaque */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
        <ScrollScene className="text-center mb-16">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3">Seleção Especial</p>
          <h2 className="font-serif text-4xl md:text-5xl text-white">Em Destaque</h2>
        </ScrollScene>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {perfumesDestaque.map((perfume, i) => (
            <ScrollScene key={perfume.id} animation="fadeUp" delay={i * 0.1}>
              <PerfumeCard perfume={perfume} />
            </ScrollScene>
          ))}
        </div>

        <ScrollScene className="text-center mt-12">
          <Link href="/explorar"
            className="inline-flex items-center gap-2 border border-gold/30 text-gold font-sans text-sm px-8 py-3 rounded-full hover:bg-gold/10 transition-colors">
            Ver todos os perfumes →
          </Link>
        </ScrollScene>
      </section>

      {/* Marcas */}
      <section className="border-t border-gold/10 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollScene className="text-center mb-10">
            <p className="text-ash text-xs tracking-widest uppercase">As melhores casas árabes</p>
          </ScrollScene>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {['Lattafa', 'Al Haramain', 'Ajmal', 'Swiss Arabian', 'Rasasi', 'Armaf'].map((marca, i) => (
              <ScrollScene key={marca} animation="fadeIn" delay={i * 0.05}>
                <Link href={`/colecoes?marca=${marca}`}
                  className="font-serif text-lg text-ash hover:text-gold transition-colors">
                  {marca}
                </Link>
              </ScrollScene>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
