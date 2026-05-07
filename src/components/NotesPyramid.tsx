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

type NoteVisual = { emoji: string; cls: string }

function noteVisual(nota: string): NoteVisual {
  const n = nota.toLowerCase()
  if (/rosa|peônia|heliotropo/.test(n))           return { emoji: '🌹', cls: 'note-floral-rose' }
  if (/jasmim|orquídea|frésia|lírio/.test(n))     return { emoji: '🌸', cls: 'note-floral-jasmine' }
  if (/íris|violeta/.test(n))                      return { emoji: '🌷', cls: 'note-floral-iris' }
  if (/lavanda/.test(n))                            return { emoji: '💜', cls: 'note-floral-lavender' }
  if (/gerânio|flor/.test(n))                       return { emoji: '🌿', cls: 'note-floral-green' }
  if (/bergamota|toranja/.test(n))                  return { emoji: '🍋', cls: 'note-citrus-bergamot' }
  if (/limão/.test(n))                              return { emoji: '🍋', cls: 'note-citrus-lemon' }
  if (/mandarina|tangerina/.test(n))                return { emoji: '🍊', cls: 'note-citrus-mandarin' }
  if (/laranja|neroli/.test(n))                     return { emoji: '🍊', cls: 'note-citrus-mandarin' }
  if (/maçã/.test(n))                               return { emoji: '🍎', cls: 'note-citrus-apple' }
  if (/pêssego/.test(n))                            return { emoji: '🍑', cls: 'note-citrus-peach' }
  if (/frutas vermelhas|groselha|morango/.test(n))  return { emoji: '🍓', cls: 'note-citrus-berry' }
  if (/abacaxi/.test(n))                            return { emoji: '🍍', cls: 'note-citrus-pineapple' }
  if (/oud/.test(n))                                return { emoji: '🪵', cls: 'note-wood-oud' }
  if (/sândalo/.test(n))                            return { emoji: '🌲', cls: 'note-wood-sandal' }
  if (/cedro/.test(n))                              return { emoji: '🌲', cls: 'note-wood-cedar' }
  if (/patchouli|vetiver/.test(n))                  return { emoji: '🌿', cls: 'note-wood-patch' }
  if (/madeira|bétula|guaiacol/.test(n))            return { emoji: '🪵', cls: 'note-wood-generic' }
  if (/canela/.test(n))                             return { emoji: '🍂', cls: 'note-spice-cinnamon' }
  if (/cardamomo/.test(n))                          return { emoji: '🌱', cls: 'note-spice-cardamom' }
  if (/pimenta/.test(n))                            return { emoji: '🌶️', cls: 'note-spice-pepper' }
  if (/açafrão/.test(n))                            return { emoji: '🌼', cls: 'note-spice-saffron' }
  if (/especiarias|noz/.test(n))                    return { emoji: '✦',  cls: 'note-spice-generic' }
  if (/âmbar/.test(n))                              return { emoji: '💛', cls: 'note-oriental-amber' }
  if (/incenso/.test(n))                            return { emoji: '🕯️', cls: 'note-oriental-incense' }
  if (/baunilha/.test(n))                           return { emoji: '🫘', cls: 'note-oriental-vanilla' }
  if (/benjoim|resinas/.test(n))                    return { emoji: '💧', cls: 'note-oriental-resin' }
  if (/tabaco|café/.test(n))                        return { emoji: '☕', cls: 'note-oriental-tobacco' }
  if (/rum/.test(n))                                return { emoji: '🥃', cls: 'note-oriental-rum' }
  if (/almíscar branco/.test(n))                    return { emoji: '☁️', cls: 'note-musk-white' }
  if (/almíscar/.test(n))                           return { emoji: '💫', cls: 'note-musk-generic' }
  if (/couro/.test(n))                              return { emoji: '🟤', cls: 'note-musk-leather' }
  if (/civet|aldeídos/.test(n))                     return { emoji: '✧',  cls: 'note-musk-civet' }
  if (/menta|alecrim|sálvia/.test(n))               return { emoji: '🌿', cls: 'note-aromatic' }
  return                                                   { emoji: '✦',  cls: 'note-default' }
}

const layers = [
  {
    label: 'Notas de Topo',
    sub: 'Primeira impressão · evapora em 15–30 min',
    widthClass: 'w-full sm:w-1/2',
    borderClass: 'border-gold/50',
    bgClass: 'bg-gold/10',
    accentClass: 'text-gold',
  },
  {
    label: 'Notas de Corpo',
    sub: 'Coração da fragrância · dura 2–4h',
    widthClass: 'w-full sm:w-3/4',
    borderClass: 'border-gold/30',
    bgClass: 'bg-gold/[0.06]',
    accentClass: 'text-gold/80',
  },
  {
    label: 'Notas de Fundo',
    sub: 'Memória olfativa · persiste por horas',
    widthClass: 'w-full',
    borderClass: 'border-gold/20',
    bgClass: 'bg-gold/[0.03]',
    accentClass: 'text-gold/60',
  },
]

export default function NotesPyramid({ notasTopo, notasCorpo, notasFundo }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const notasPorCamada = [notasTopo, notasCorpo, notasFundo]

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const blocks = el.querySelectorAll('.pyramid-layer')
    gsap.fromTo(blocks,
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, stagger: 0.2, duration: 0.65, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 82%', toggleActions: 'play none none none' },
      }
    )
  }, [])

  return (
    <div ref={containerRef} className="py-14">
      <div className="flex items-center gap-5 mb-10">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/25" />
        <h3 className="font-serif text-white text-2xl tracking-wide">Pirâmide Olfativa</h3>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/25" />
      </div>

      <div className="flex flex-col items-center gap-2">
        {layers.map((layer, i) => (
          <div
            key={layer.label}
            className={`pyramid-layer opacity-0 ${layer.widthClass} border ${layer.borderClass} ${layer.bgClass} rounded-xl px-6 py-5`}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className={`font-sans text-[10px] tracking-[0.3em] uppercase mb-1 ${layer.accentClass}`}>
                  {layer.label}
                </p>
                <p className="text-ash text-[11px] leading-none">{layer.sub}</p>
              </div>
              <span className={`font-serif text-3xl leading-none ${layer.accentClass} opacity-30 select-none`}>
                {['I', 'II', 'III'][i]}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {notasPorCamada[i].map(nota => {
                const visual = noteVisual(nota)
                return (
                  <span
                    key={nota}
                    className={`inline-flex items-center gap-2 border ${layer.borderClass} rounded-full pl-0.5 pr-3 py-0.5 text-xs text-white/80 font-sans`}
                  >
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm shrink-0 leading-none ${visual.cls}`}>
                      {visual.emoji}
                    </span>
                    {nota}
                  </span>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </div>
  )
}
