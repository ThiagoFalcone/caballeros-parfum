'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useWishlist } from '@/context/WishlistContext'
import { perfumes } from '@/data/perfumes'
import PerfumeCard from '@/components/PerfumeCard'
import { supabase, supabaseConfigured } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

type Tab = 'Favoritos' | 'Pedidos'

export default function ContaPage() {
  const router = useRouter()
  const [tab, setTab]   = useState<Tab>('Favoritos')
  const [user, setUser] = useState<User | null>(null)
  const { wishlist } = useWishlist()
  const favoritos = perfumes.filter(p => wishlist.includes(p.id))

  useEffect(() => {
    if (!supabaseConfigured) return
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
  }, [])

  async function handleLogout() {
    if (!supabaseConfigured) return
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header com info do usuário */}
        <div className="flex items-start justify-between mb-10 flex-wrap gap-4">
          <div>
            <p className="text-gold text-[10px] tracking-[0.35em] uppercase mb-2 font-sans">Área do Cliente</p>
            <h1 className="font-serif text-4xl text-white">Minha Conta</h1>
            {user && (
              <p className="text-ash/50 text-xs mt-1">{user.email}</p>
            )}
          </div>
          {user && (
            <button
              type="button"
              onClick={handleLogout}
              className="text-ash/40 text-[10px] tracking-[0.2em] uppercase font-sans hover:text-gold transition-colors border border-white/[0.06] px-4 py-2 rounded-lg"
            >
              Sair
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-white/[0.06] mb-10">
          {(['Favoritos', 'Pedidos'] as Tab[]).map(t => (
            <button
              key={t} type="button" onClick={() => setTab(t)}
              className={`pb-3 text-sm font-sans tracking-wide transition-colors duration-200 border-b-2 -mb-px ${
                tab === t ? 'text-gold border-gold' : 'text-ash/50 border-transparent hover:text-ash/70'
              }`}
            >
              {t}
              {t === 'Favoritos' && wishlist.length > 0 && (
                <span className="ml-2 text-[9px] bg-gold/15 text-gold px-1.5 py-0.5 rounded-full">
                  {wishlist.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Favoritos */}
        {tab === 'Favoritos' && (
          favoritos.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {favoritos.map(p => (
                <div key={p.id} className="animate-card-in">
                  <PerfumeCard perfume={p} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 flex flex-col items-center gap-5">
              <span className="w-14 h-14 rounded-full border border-white/[0.06] flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-ash/25">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" />
                </svg>
              </span>
              <p className="text-ash/35 text-sm">Nenhum perfume favoritado ainda.</p>
              <Link href="/explorar" className="text-gold/55 text-[10px] tracking-[0.2em] uppercase hover:text-gold transition-colors">
                Explorar coleção →
              </Link>
            </div>
          )
        )}

        {/* Pedidos */}
        {tab === 'Pedidos' && (
          <div className="text-center py-24 flex flex-col items-center gap-5">
            <span className="w-14 h-14 rounded-full border border-white/[0.06] flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-ash/25">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" strokeLinecap="round" />
              </svg>
            </span>
            <p className="text-ash/35 text-sm">Seus pedidos aparecerão aqui.</p>
            <Link href="/conta/pedidos" className="text-gold/55 text-[10px] tracking-[0.2em] uppercase hover:text-gold transition-colors">
              Ver página de pedidos →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
