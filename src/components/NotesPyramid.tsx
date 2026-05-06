'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  notasTopo: string[]
  notasCorpo: string[]
  notasFundo: string[]
}

export default function NotesPyramid({ notasTopo, notasCorpo, notasFundo }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const layers = el.querySelectorAll('.pyramid-layer')
    gsap.fromTo(layers,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, stagger: 0.2, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none none' },
      }
    )
  }, [])

  const layers = [
    { label: 'Notas de Topo', notas: notasTopo, width: 'w-1/3', bg: 'bg-gold/20', border: 'border-gold/40' },
    { label: 'Notas de Corpo', notas: notasCorpo, width: 'w-2/3', bg: 'bg-gold/10', border: 'border-gold/25' },
    { label: 'Notas de Fundo', notas: notasFundo, width: 'w-full', bg: 'bg-gold/5', border: 'border-gold/15' },
  ]

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-2 py-8">
      <h3 className="font-serif text-white text-xl mb-6">Pirâmide Olfativa</h3>
      {layers.map(layer => (
        <div key={layer.label} className={`pyramid-layer ${layer.width} ${layer.bg} border ${layer.border} rounded-lg px-4 py-3 text-center opacity-0`}>
          <p className="text-gold text-[10px] tracking-widest uppercase mb-1">{layer.label}</p>
          <p className="text-white text-sm">{layer.notas.join(' · ')}</p>
        </div>
      ))}
    </div>
  )
}
