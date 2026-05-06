'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { CartContextType, CartItem, Perfume } from '@/types'
import { buildWhatsAppUrl, formatWhatsAppMessage } from '@/lib/whatsapp'

const CART_KEY = 'caballerosCart'
const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_KEY)
      if (stored) setItems(JSON.parse(stored))
    } catch {}
  }, [])

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items))
  }, [items])

  function addToCart(perfume: Perfume, quantidade = 1) {
    setItems(prev => {
      const existing = prev.find(i => i.perfume.id === perfume.id)
      if (existing) {
        return prev.map(i =>
          i.perfume.id === perfume.id ? { ...i, quantidade: i.quantidade + quantidade } : i
        )
      }
      return [...prev, { perfume, quantidade }]
    })
  }

  function removeFromCart(id: string) {
    setItems(prev => prev.filter(i => i.perfume.id !== id))
  }

  function updateQuantity(id: string, quantidade: number) {
    if (quantidade <= 0) return removeFromCart(id)
    setItems(prev => prev.map(i => (i.perfume.id === id ? { ...i, quantidade } : i)))
  }

  function clearCart() { setItems([]) }

  function checkout() {
    if (items.length === 0) return
    window.open(buildWhatsAppUrl(formatWhatsAppMessage(items)), '_blank')
  }

  const totalItems = items.reduce((sum, i) => sum + i.quantidade, 0)
  const totalPrice = items.reduce((sum, i) => sum + i.perfume.preco * i.quantidade, 0)

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice, checkout }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextType {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
