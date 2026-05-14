'use client'

import { useState } from 'react'
import { Perfume } from '@/types'
import { useCart } from '@/context/CartContext'
import { useToast } from '@/context/ToastContext'

interface Props { perfume: Perfume }

export default function StickyCartBar({ perfume }: Props) {
  const { addToCart, totalItems, checkout } = useCart()
  const { showToast } = useToast()
  const [added, setAdded] = useState(false)

  function handleAdd() {
    addToCart(perfume)
    showToast(perfume.nome, 'Adicionado ao carrinho')
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-30
      bg-noir/97 backdrop-blur-md border-t border-gold/15
      flex gap-2 px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">

      <button
        type="button"
        onClick={handleAdd}
        className={`flex-1 font-sans font-semibold text-sm py-3 rounded-xl transition-all duration-300
          ${added
            ? 'bg-gold/20 text-gold border border-gold/40'
            : 'bg-gold text-noir hover:bg-yellow-400'
          }`}
      >
        {added ? '✓ Adicionado' : 'Adicionar ao Carrinho'}
      </button>

      {totalItems > 0 && (
        <button
          type="button"
          onClick={checkout}
          className="flex items-center justify-center gap-1.5
            border border-gold/35 text-gold font-sans font-semibold text-sm
            px-4 py-3 rounded-xl hover:bg-gold/10 transition-colors shrink-0"
          aria-label="Finalizar pedido via WhatsApp"
        >
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.553 4.116 1.523 5.845L.057 23.882l6.197-1.438A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.66-.499-5.193-1.371l-.371-.218-3.878.9.947-3.766-.24-.387A10 10 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
          </svg>
          <span>({totalItems})</span>
        </button>
      )}
    </div>
  )
}
