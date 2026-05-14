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

const FAMILIAS = [
  {
    nome: 'Oriental', num: 'I', acc: '#C9A84C',
    bg: 'linear-gradient(160deg,#1a0e00 0%,#2a1800 55%,#0a0808 100%)',
    desc: 'Âmbar · Oud · Baunilha',
  },
  {
    nome: 'Floral', num: 'II', acc: '#E879AA',
    bg: 'linear-gradient(160deg,#1a0010 0%,#2d0018 55%,#080a0a 100%)',
    desc: 'Rosa · Jasmim · Íris',
  },
  {
    nome: 'Amadeirado', num: 'III', acc: '#A0714A',
    bg: 'linear-gradient(160deg,#0f0a00 0%,#1e1400 55%,#080808 100%)',
    desc: 'Cedro · Sândalo · Patchouli',
  },
  {
    nome: 'Cítrico', num: 'IV', acc: '#9AB822',
    bg: 'linear-gradient(160deg,#0a1000 0%,#141e00 55%,#080a08 100%)',
    desc: 'Bergamota · Limão · Neroli',
  },
  {
    nome: 'Especiado', num: 'V', acc: '#C44A00',
    bg: 'linear-gradient(160deg,#1a0000 0%,#2d0a00 55%,#0a0808 100%)',
    desc: 'Açafrão · Pimenta · Canela',
  },
  {
    nome: 'Frutal', num: 'VI', acc: '#D06010',
    bg: 'linear-gradient(160deg,#1a0800 0%,#2a1000 55%,#0a0808 100%)',
    desc: 'Pêssego · Groselha · Maçã',
  },
]

const ARABIC_BRANDS = [
  { nome: 'Lattafa',       css: 'brand-lattafa',       origem: 'Dubai, EAU',      letra: 'L'  },
  { nome: 'Al Haramain',   css: 'brand-al-haramain',   origem: 'Arábia Saudita',  letra: 'AH' },
  { nome: 'Ajmal',         css: 'brand-ajmal',         origem: 'Dubai, EAU',      letra: 'A'  },
  { nome: 'Swiss Arabian', css: 'brand-swiss-arabian', origem: 'Dubai, EAU',      letra: 'SA' },
  { nome: 'Rasasi',        css: 'brand-rasasi',        origem: 'Dubai, EAU',      letra: 'R'  },
  { nome: 'Armaf',         css: 'brand-armaf',         origem: 'Dubai, EAU',      letra: 'AR' },
]

const TRUST = [
  '43 Fragrâncias', 'Importação Direta', '100% Originais',
  'Entrega Brasil', 'Marcas Premium', 'Curadoria Exclusiva',
]

export default function HomePage() {
  const heroRef     = useRef<HTMLDivElement>(null)
  const editorialRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    gsap.fromTo(
      el.querySelectorAll('.hero-item'),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 1, ease: 'power3.out', delay: 0.3 }
    )
  }, [])

  useEffect(() => {
    const el = editorialRef.current
    if (!el) return
    gsap.fromTo(
      el.querySelectorAll('.ed-word'),
      { opacity: 0, y: 80 },
      {
        opacity: 1, y: 0, stagger: 0.1, duration: 1.3, ease: 'power4.out',
        scrollTrigger: { trigger: el, start: 'top 78%', toggleActions: 'play none none none' },
      }
    )
  }, [])

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section data-surface="dark" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="hidden md:block absolute inset-0 z-0 opacity-60">
          <SplineHero />
        </div>
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-noir/95 via-noir/70 to-transparent" />

        <div ref={heroRef} className="relative z-20 max-w-7xl mx-auto px-6 pt-24 pb-16">
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

      {/* ── TRUST STRIP ──────────────────────────────────────────────────── */}
      <div className="border-y border-gold/[0.08] overflow-hidden bg-noir">
        <div className="animate-trust-scroll py-3.5">
          {[...TRUST, ...TRUST].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-4 shrink-0 px-8">
              <span className="w-1 h-1 rounded-full bg-gold/35 shrink-0" />
              <span className="text-ash/50 text-[9px] tracking-[0.4em] uppercase font-sans whitespace-nowrap">
                {item}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* ── FAMÍLIAS OLFATIVAS ────────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
          <ScrollScene>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-gold/50 text-[10px] tracking-[0.45em] uppercase mb-3">Explore por família</p>
                <h2 className="font-serif text-4xl md:text-5xl text-white">
                  Famílias<br /><em>Olfativas</em>
                </h2>
              </div>
              <span className="font-serif text-[5rem] md:text-[8rem] leading-none text-gold/[0.05] select-none hidden sm:block">
                VI
              </span>
            </div>
          </ScrollScene>
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="md:hidden overflow-x-auto scrollbar-hide px-4">
          <div className="flex gap-3 pb-2" style={{ width: 'max-content' }}>
            {FAMILIAS.map(f => (
              <Link
                key={f.nome}
                href={`/explorar?familia=${f.nome}`}
                className="relative flex-shrink-0 w-[150px] h-[210px] rounded-2xl overflow-hidden
                  border border-white/[0.06] flex flex-col justify-between p-5 group"
                style={{ background: f.bg }}
              >
                <span className="font-serif text-[3rem] leading-none select-none italic"
                  style={{ color: f.acc, opacity: 0.15 }}>
                  {f.num}
                </span>
                <div>
                  <div className="w-6 h-px mb-2.5" style={{ backgroundColor: f.acc, opacity: 0.5 }} />
                  <p className="font-serif text-white text-base leading-tight">{f.nome}</p>
                  <p className="text-white/30 text-[8px] tracking-wide mt-1.5 font-sans">{f.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop: 6-column grid */}
        <div className="hidden md:grid max-w-7xl mx-auto px-4 sm:px-6 grid-cols-6 gap-3">
          {FAMILIAS.map((f, i) => (
            <ScrollScene key={f.nome} animation="fadeUp" delay={i * 0.08}>
              <Link
                href={`/explorar?familia=${f.nome}`}
                className="relative h-[290px] rounded-2xl overflow-hidden
                  border border-white/[0.06] flex flex-col justify-between p-5 group
                  hover:border-white/20 transition-colors duration-300"
                style={{ background: f.bg }}
              >
                <span className="font-serif text-[3.5rem] leading-none select-none italic"
                  style={{ color: f.acc, opacity: 0.12 }}>
                  {f.num}
                </span>
                <div>
                  <div className="w-7 h-px mb-3 transition-all duration-300 group-hover:w-12"
                    style={{ backgroundColor: f.acc, opacity: 0.55 }} />
                  <p className="font-serif text-white text-sm leading-tight">{f.nome}</p>
                  <p className="text-white/30 text-[8px] tracking-wide mt-1.5 font-sans">{f.desc}</p>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                  bg-[radial-gradient(ellipse_70%_60%_at_50%_110%,rgba(255,255,255,0.03),transparent)]" />
              </Link>
            </ScrollScene>
          ))}
        </div>
      </section>

      {/* ── EM DESTAQUE ───────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28 border-t border-white/[0.04]">
        <ScrollScene className="mb-14">
          <div className="flex items-end gap-6">
            <div>
              <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3">Seleção especial</p>
              <h2 className="font-serif text-4xl md:text-5xl text-white">Em Destaque</h2>
            </div>
            <span className="font-serif text-[4.5rem] leading-none text-gold/[0.07] select-none hidden md:block pb-1">
              {String(perfumesDestaque.length).padStart(2, '0')}
            </span>
          </div>
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

      {/* ── EDITORIAL STRIP ──────────────────────────────────────────────── */}
      <div ref={editorialRef} className="relative overflow-hidden bg-[#050505] py-24 md:py-40 border-y border-gold/[0.06]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_70%_at_85%_50%,rgba(201,168,76,0.04),transparent)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 md:px-14">
          <p className="ed-word inline-block text-gold/35 text-[9px] tracking-[0.55em] uppercase mb-10 opacity-0">
            Nossa essência
          </p>
          <h2 className="font-serif leading-[0.87] mb-10">
            {['Do', 'deserto'].map((w, i) => (
              <span key={i}
                className="ed-word inline-block mr-[0.22em] opacity-0 text-white"
                style={{ fontSize: 'clamp(2.8rem, 8vw, 7.5rem)' }}>
                {w}
              </span>
            ))}
            <br />
            {['à', 'sua'].map((w, i) => (
              <span key={i}
                className="ed-word inline-block mr-[0.22em] opacity-0 text-white"
                style={{ fontSize: 'clamp(2.8rem, 8vw, 7.5rem)' }}>
                {w}
              </span>
            ))}
            <span
              className="ed-word inline-block opacity-0 text-gradient-gold italic"
              style={{ fontSize: 'clamp(2.8rem, 8vw, 7.5rem)' }}>
              pele.
            </span>
          </h2>
          <p className="ed-word inline-block text-ash/40 text-sm leading-relaxed max-w-xs opacity-0">
            Cada frasco selecionado com rigor — das casas árabes mais respeitadas,
            direto para você.
          </p>
        </div>
      </div>

      {/* ── MARCAS ÁRABES ─────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollScene className="mb-12">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-gold/50 text-[10px] tracking-[0.45em] uppercase mb-3">Casas árabes</p>
                <h2 className="font-serif text-4xl md:text-5xl text-white">As Marcas</h2>
              </div>
              <Link href="/colecoes"
                className="text-gold/35 hover:text-gold/70 text-[9px] tracking-[0.35em] uppercase transition-colors hidden md:block mb-1">
                Ver coleções →
              </Link>
            </div>
          </ScrollScene>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {ARABIC_BRANDS.map((brand, i) => (
              <ScrollScene key={brand.nome} animation="fadeUp" delay={i * 0.08}>
                <Link
                  href={`/colecoes/${brand.nome.toLowerCase().replace(/\s+/g, '-')}`}
                  data-surface="dark"
                  className={`${brand.css} relative group rounded-xl border border-gold/[0.08]
                    hover:border-gold/25 transition-all duration-300 p-5 h-[120px]
                    flex flex-col justify-between overflow-hidden`}
                >
                  <span className="font-serif text-gold/[0.18] text-[2rem] leading-none select-none italic">
                    {brand.letra}
                  </span>
                  <div>
                    <p className="font-serif text-white text-sm leading-tight">{brand.nome}</p>
                    <p className="text-ash/30 text-[8px] tracking-wide mt-0.5">{brand.origem}</p>
                  </div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                    bg-[radial-gradient(ellipse_80%_70%_at_50%_110%,rgba(201,168,76,0.06),transparent)]" />
                </Link>
              </ScrollScene>
            ))}
          </div>

          <ScrollScene className="text-center mt-8 md:hidden">
            <Link href="/colecoes"
              className="text-gold/40 text-[9px] tracking-[0.35em] uppercase">
              Ver todas as marcas →
            </Link>
          </ScrollScene>
        </div>
      </section>
    </>
  )
}
