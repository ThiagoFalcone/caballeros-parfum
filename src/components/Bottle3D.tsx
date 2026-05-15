'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'

// Xerjoff Alexandria II — frasco de cristal dourado, formato único
const BOTTLE = {
  url:   'https://fimgs.net/mdimg/perfume/375x500.17786.jpg',
  nome:  'Alexandria II',
  marca: 'Xerjoff',
}

export default function Bottle3D() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [active, setActive] = useState(false)

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const dx = (e.clientX - rect.left  - rect.width  / 2) / (rect.width  / 2)
    const dy = (e.clientY - rect.top   - rect.height / 2) / (rect.height / 2)
    setTilt({ x: -dy * 16, y: dx * 16 })
    setActive(true)
  }, [])

  const handleLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 })
    setActive(false)
  }, [])

  return (
    <div
      className="relative flex items-center justify-center select-none cursor-none"
      style={{ height: '440px', width: '100%' }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {/* Glow base — pulsa quando há interação */}
      <div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 rounded-full blur-3xl transition-all duration-700"
        style={{
          width:  active ? '160px' : '120px',
          height: active ? '32px'  : '20px',
          background: 'rgba(201,168,76,0.22)',
        }}
      />

      {/* Anel de luz externo */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 55% at 50% 48%, rgba(201,168,76,${active ? '0.06' : '0.03'}), transparent)`,
          transition: 'background 0.5s ease',
        }}
      />

      {/* Float wrapper → animação CSS; Tilt wrapper → JS */}
      <div className="animate-bottle-float">
        <div
          style={{
            transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: active ? 'transform 0.08s ease-out' : 'transform 0.6s ease-out',
            willChange: 'transform',
          }}
        >
          <Image
            src={BOTTLE.url}
            alt={BOTTLE.nome}
            width={210}
            height={280}
            priority
            className="object-contain"
            style={{
              filter: `drop-shadow(0 ${active ? 48 : 32}px 64px rgba(201,168,76,${active ? '0.35' : '0.22'}))
                       drop-shadow(0 8px 24px rgba(0,0,0,0.7))`,
              transition: 'filter 0.4s ease',
            }}
          />
        </div>
      </div>

      {/* Label */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center pointer-events-none">
        <p className="text-gold/25 text-[7px] tracking-[0.5em] uppercase font-mono">{BOTTLE.marca}</p>
        <p className="text-white/12 text-[6px] tracking-widest mt-0.5">{BOTTLE.nome}</p>
      </div>

      {/* Hint — some text on desktop only */}
      <p className="absolute top-4 right-4 text-white/10 text-[7px] tracking-[0.3em] uppercase hidden md:block pointer-events-none">
        Arraste para girar
      </p>
    </div>
  )
}
