'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { useCart } from '@/context/CartContext'
import CartDrawer from './CartDrawer'

const navLinks = [
  { href: '/explorar', label: 'Explorar' },
  { href: '/colecoes', label: 'Coleções' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/contato', label: 'Contato' },
]

export default function Header() {
  const headerRef = useRef<HTMLElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { totalItems } = useCart()

  useEffect(() => {
    const onScroll = () => {
      if (!headerRef.current) return
      gsap.to(headerRef.current, {
        backgroundColor: window.scrollY > 60 ? '#0a0a0a' : 'transparent',
        borderBottomColor: window.scrollY > 60 ? 'rgba(201,168,76,0.15)' : 'transparent',
        duration: 0.3,
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 border-b border-transparent"
        style={{ backgroundColor: 'transparent' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <Image src="/logo.png" alt="Caballeros Parfum" width={140} height={40} className="object-contain" priority />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href}
                className="text-xs font-sans text-ash hover:text-gold transition-colors tracking-widest uppercase">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={() => setDrawerOpen(true)}
              className="relative p-2 text-white hover:text-gold transition-colors" aria-label="Carrinho">
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round"/>
                <path d="M16 10a4 4 0 01-8 0" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-noir text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-white" aria-label="Menu">
              <div className="w-5 flex flex-col gap-[5px]">
                <span className={`block h-px bg-current transition-all ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
                <span className={`block h-px bg-current transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-px bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-noir/95 backdrop-blur border-t border-gold/10 px-6 py-6 flex flex-col gap-5">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                className="text-sm font-sans text-ash hover:text-gold transition-colors tracking-widest uppercase">
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
