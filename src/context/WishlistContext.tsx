'use client'

import { createContext, useContext, useEffect, useState } from 'react'

interface WishlistCtxType {
  wishlist: string[]
  toggle: (id: string) => void
  isWishlisted: (id: string) => boolean
  count: number
}

const Ctx = createContext<WishlistCtxType>({
  wishlist: [], toggle: () => {}, isWishlisted: () => false, count: 0,
})

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem('cp-wishlist')
      if (stored) setWishlist(JSON.parse(stored))
    } catch {}
  }, [])

  function toggle(id: string) {
    setWishlist(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
      localStorage.setItem('cp-wishlist', JSON.stringify(next))
      return next
    })
  }

  const isWishlisted = (id: string) => wishlist.includes(id)

  return (
    <Ctx.Provider value={{ wishlist, toggle, isWishlisted, count: wishlist.length }}>
      {children}
    </Ctx.Provider>
  )
}

export const useWishlist = () => useContext(Ctx)
