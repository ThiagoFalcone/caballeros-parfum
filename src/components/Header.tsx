'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { useTheme } from './ThemeProvider'
import CartDrawer from './CartDrawer'
import ThemeToggle from './ThemeToggle'

const navLinks = [
  { href: '/',          label: 'Home'     },
  { href: '/explorar',  label: 'Explorar' },
  { href: '/colecoes',  label: 'Coleções' },
  { href: '/nicho',     label: 'Nicho'    },
  { href: '/sobre',     label: 'Sobre'    },
  { href: '/contato',   label: 'Contato'  },
]

function headerBg(scrolled: boolean, light: boolean) {
  if (light) return scrolled ? 'rgba(245,240,230,0.97)' : 'rgba(245,240,230,0.80)'
  return scrolled ? 'rgba(10,10,10,0.97)' : 'rgba(10,10,10,0.55)'
}

export default function Header() {
  const headerRef = useRef<HTMLElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { totalItems } = useCart()
  const { count: wishlistCount } = useWishlist()
  const { theme } = useTheme()
  const pathname = usePathname()

  /* Scroll-driven background */
  useEffect(() => {
    const onScroll = () => {
      if (!headerRef.current) return
      const light = document.documentElement.classList.contains('light')
      gsap.to(headerRef.current, {
        backgroundColor: headerBg(window.scrollY > 60, light),
        borderBottomColor: window.scrollY > 60 ? 'rgba(201,168,76,0.15)' : 'transparent',
        duration: 0.35,
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Immediately update header when theme changes */
  useEffect(() => {
    if (!headerRef.current) return
    gsap.to(headerRef.current, {
      backgroundColor: headerBg(window.scrollY > 60, theme === 'light'),
      duration: 0.3,
    })
  }, [theme])

  /* Close menu on route change */
  useEffect(() => { setMenuOpen(false) }, [pathname])

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 border-b border-transparent backdrop-blur-md bg-[rgba(10,10,10,0.55)]"
      >
        {/* ── Main bar ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 md:h-24 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="block shrink-0">
            <Image
              src="/logo.png"
              alt="Caballeros Parfum"
              width={260}
              height={174}
              className="h-14 md:h-[76px] w-auto object-contain drop-shadow-[0_2px_20px_rgba(0,0,0,0.9)]"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map(link => {
              const active = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs font-sans tracking-widest uppercase transition-colors duration-200
                    ${active ? 'text-gold' : 'text-ash hover:text-gold'}`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Right side: theme toggle + wishlist + cart + hamburger */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <ThemeToggle />

            {/* Wishlist */}
            <Link
              href="/conta"
              className="relative p-2 text-white hover:text-gold transition-colors"
              aria-label="Favoritos"
            >
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-noir text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlistCount > 9 ? '9+' : wishlistCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="relative p-2 text-white hover:text-gold transition-colors"
              aria-label="Carrinho"
            >
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

            {/* Hamburger — mobile/tablet only */}
            <button
              type="button"
              onClick={() => setMenuOpen(v => !v)}
              className="md:hidden p-2 text-white"
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              <div className="w-5 flex flex-col gap-[5px]">
                <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
                <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
                <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* ── Mobile/tablet menu ── */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out
          ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-noir/97 backdrop-blur-md border-t border-gold/10 px-6 py-6">
            <nav className="flex flex-col gap-1">
              {navLinks.map(link => {
                const active = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`py-3 border-b border-white/5 text-sm font-sans tracking-widest uppercase transition-colors
                      ${active ? 'text-gold' : 'text-ash hover:text-gold'}`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>

            <button
              type="button"
              onClick={() => { setMenuOpen(false); setDrawerOpen(true) }}
              className="mt-5 w-full flex items-center justify-center gap-2 border border-gold/30 text-gold text-xs tracking-widest uppercase py-3 rounded-lg hover:bg-gold/10 transition-colors"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round"/>
                <path d="M16 10a4 4 0 01-8 0" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Ver carrinho {totalItems > 0 && `(${totalItems})`}
            </button>
          </div>
        </div>
      </header>

      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
