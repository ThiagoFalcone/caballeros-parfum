'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'

const BOTTLE = {
  url:   'https://fimgs.net/mdimg/perfume/375x500.17786.jpg',
  nome:  'Alexandria II',
  marca: 'Xerjoff',
  familia: 'Floral · Oriental',
  origem: 'Torino, Itália',
}

export default function Bottle3D() {
  const [tilt, setTilt]     = useState({ x: 0, y: 0 })
  const [active, setActive] = useState(false)

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const dx = (e.clientX - rect.left  - rect.width  / 2) / (rect.width  / 2)
    const dy = (e.clientY - rect.top   - rect.height / 2) / (rect.height / 2)
    setTilt({ x: -dy * 14, y: dx * 14 })
    setActive(true)
  }, [])

  const handleLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 })
    setActive(false)
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0]
    const rect = e.currentTarget.getBoundingClientRect()
    const dx = (touch.clientX - rect.left  - rect.width  / 2) / (rect.width  / 2)
    const dy = (touch.clientY - rect.top   - rect.height / 2) / (rect.height / 2)
    setTilt({ x: -dy * 14, y: dx * 14 })
    setActive(true)
  }, [])

  const handleTouchEnd = useCallback(() => {
    setTilt({ x: 0, y: 0 })
    setActive(false)
  }, [])

  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{ height: '480px', width: '100%' }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Futuristic grid background */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)',
        backgroundSize: '44px 44px',
        maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 80%)',
      }} />

      {/* Outer orbit ring */}
      <div className="absolute orbit-ring-outer pointer-events-none" style={{
        width: '320px', height: '320px',
        top: '50%', left: '50%',
        border: '1px solid rgba(201,168,76,0.10)',
        borderRadius: '50%',
        animation: 'orbit-spin 14s linear infinite',
      }}>
        {/* Dot on the ring */}
        <div style={{
          position: 'absolute', width: '5px', height: '5px',
          borderRadius: '50%', background: 'rgba(201,168,76,0.55)',
          top: '-2.5px', left: '50%', transform: 'translateX(-50%)',
          boxShadow: '0 0 6px rgba(201,168,76,0.6)',
        }} />
      </div>

      {/* Inner orbit ring */}
      <div className="absolute pointer-events-none" style={{
        width: '230px', height: '230px',
        top: '50%', left: '50%',
        border: '1px solid rgba(201,168,76,0.06)',
        borderRadius: '50%',
        animation: 'orbit-spin 9s linear infinite reverse',
      }}>
        <div style={{
          position: 'absolute', width: '3px', height: '3px',
          borderRadius: '50%', background: 'rgba(201,168,76,0.35)',
          bottom: '-1.5px', left: '50%', transform: 'translateX(-50%)',
        }} />
      </div>

      {/* Ground glow */}
      <div className="absolute left-1/2 -translate-x-1/2 rounded-full blur-3xl transition-all duration-700 pointer-events-none" style={{
        bottom: '68px',
        width:  active ? '170px' : '110px',
        height: active ? '28px'  : '16px',
        background: `rgba(201,168,76,${active ? '0.28' : '0.16'})`,
      }} />

      {/* Bottle: float + perspective tilt */}
      <div className="animate-bottle-float relative z-10">
        <div style={{
          transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: active ? 'transform 0.08s ease-out' : 'transform 0.6s ease-out',
          willChange: 'transform',
        }}>
          {/* Vignette mask removes the Fragrantica white background */}
          <div className="relative" style={{ width: '200px', height: '267px' }}>
            <Image
              src={BOTTLE.url}
              alt={BOTTLE.nome}
              fill
              priority
              className="object-contain"
              style={{
                filter: `drop-shadow(0 28px 52px rgba(201,168,76,${active ? '0.38' : '0.24'})) drop-shadow(0 6px 20px rgba(0,0,0,0.85))`,
                transition: 'filter 0.4s ease',
              }}
            />
            {/* Radial vignette: fades the white Fragrantica background into the dark section */}
            <div className="absolute inset-0 pointer-events-none" style={{
              background: 'radial-gradient(ellipse 78% 82% at 50% 50%, transparent 48%, #050505 78%)',
            }} />
          </div>
        </div>
      </div>

      {/* HUD specs — right side, desktop only */}
      <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 text-right space-y-4 pointer-events-none hidden md:block">
        <div>
          <p className="text-gold/20 text-[6px] tracking-[0.5em] uppercase mb-0.5">Marca</p>
          <p className="text-white/20 text-[8px] tracking-[0.2em]">{BOTTLE.marca}</p>
        </div>
        <div className="w-px h-6 bg-gold/10 ml-auto" />
        <div>
          <p className="text-gold/20 text-[6px] tracking-[0.5em] uppercase mb-0.5">Coleção</p>
          <p className="text-white/20 text-[8px] tracking-[0.2em]">{BOTTLE.nome}</p>
        </div>
        <div className="w-px h-6 bg-gold/10 ml-auto" />
        <div>
          <p className="text-gold/20 text-[6px] tracking-[0.5em] uppercase mb-0.5">Origem</p>
          <p className="text-white/20 text-[8px] tracking-[0.2em]">{BOTTLE.origem}</p>
        </div>
      </div>

      {/* HUD specs — left side, desktop only */}
      <div className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 text-left space-y-4 pointer-events-none hidden md:block">
        <div>
          <p className="text-gold/20 text-[6px] tracking-[0.5em] uppercase mb-0.5">Família</p>
          <p className="text-white/20 text-[8px] tracking-[0.2em]">{BOTTLE.familia}</p>
        </div>
        <div className="w-px h-6 bg-gold/10" />
        {/* Corner decorations */}
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-px bg-gold/20" />
          <div className="w-1 h-1 rounded-full bg-gold/20" />
        </div>
      </div>

      {/* Corner brackets — futuristic frame */}
      {[
        'top-6 left-6 border-t border-l',
        'top-6 right-6 border-t border-r',
        'bottom-6 left-6 border-b border-l',
        'bottom-6 right-6 border-b border-r',
      ].map((cls, i) => (
        <div key={i} className={`absolute w-4 h-4 border-gold/15 pointer-events-none ${cls}`} />
      ))}
    </div>
  )
}
