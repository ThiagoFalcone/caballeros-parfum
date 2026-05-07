'use client'

import { useState } from 'react'
import { Perfume } from '@/types'
import { useCart } from '@/context/CartContext'
import { useToast } from '@/context/ToastContext'

interface Props { perfume: Perfume; fullWidth?: boolean }

export default function AddToCartButton({ perfume, fullWidth }: Props) {
  const { addToCart } = useCart()
  const { showToast } = useToast()
  const [added, setAdded] = useState(false)

  function handleAdd() {
    addToCart(perfume)
    showToast(perfume.nome, 'Adicionado ao carrinho')
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      className={`bg-gold text-noir font-sans font-semibold py-3 px-6 rounded-lg hover:bg-yellow-400 transition-all ${fullWidth ? 'w-full' : ''}`}
    >
      {added ? '✓ Adicionado!' : 'Adicionar ao Carrinho'}
    </button>
  )
}
