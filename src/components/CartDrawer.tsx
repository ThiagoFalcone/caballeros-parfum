'use client'

import Image from 'next/image'
import { useCart } from '@/context/CartContext'

interface Props { open: boolean; onClose: () => void }

export default function CartDrawer({ open, onClose }: Props) {
  const { items, updateQuantity, removeFromCart, totalPrice, checkout } = useCart()

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      )}
      <div className={`fixed z-50 bg-smoke transition-transform duration-300
        bottom-0 left-0 right-0 rounded-t-2xl border-t border-gold/20
        md:top-0 md:right-0 md:left-auto md:bottom-0 md:w-96 md:rounded-none md:border-l md:border-t-0
        ${open ? 'translate-y-0 md:translate-x-0' : 'translate-y-full md:translate-x-full'}`}
      >
        <div className="flex flex-col h-full max-h-[90vh] md:max-h-screen">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gold/10">
            <h2 className="font-serif text-lg text-white">Meu Carrinho</h2>
            <button onClick={onClose} className="text-ash hover:text-white transition-colors p-1">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
            {items.length === 0 ? (
              <p className="text-ash text-sm text-center mt-8">Seu carrinho está vazio.</p>
            ) : (
              items.map(({ perfume, quantidade }) => (
                <div key={perfume.id} className="flex gap-3 items-start">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-[#111]">
                    <Image
                      src={perfume.imagemUrl}
                      alt={perfume.nome}
                      fill
                      sizes="64px"
                      className="object-contain scale-90"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gold text-xs tracking-wider uppercase">{perfume.marca}</p>
                    <p className="text-sm text-white font-medium truncate">{perfume.nome}</p>
                    <p className="text-xs text-ash">R${perfume.preco.toFixed(2).replace('.', ',')}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => updateQuantity(perfume.id, quantidade - 1)} className="w-6 h-6 rounded border border-gold/30 text-gold text-sm hover:bg-gold/10 transition-colors">−</button>
                      <span className="text-sm text-white w-4 text-center">{quantidade}</span>
                      <button onClick={() => updateQuantity(perfume.id, quantidade + 1)} className="w-6 h-6 rounded border border-gold/30 text-gold text-sm hover:bg-gold/10 transition-colors">+</button>
                      <button onClick={() => removeFromCart(perfume.id)} className="ml-auto text-ash hover:text-red-400 transition-colors text-xs">remover</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="px-5 py-4 border-t border-gold/10 flex flex-col gap-3">
              <div className="flex justify-between text-sm">
                <span className="text-ash">Total</span>
                <span className="text-white font-medium">R${totalPrice.toFixed(2).replace('.', ',')}</span>
              </div>
              <button
                onClick={() => { checkout(); onClose() }}
                className="w-full bg-gold text-noir font-sans font-semibold py-3 rounded-lg hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2"
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.553 4.116 1.523 5.845L.057 23.882l6.197-1.438A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.66-.499-5.193-1.371l-.371-.218-3.878.9.947-3.766-.24-.387A10 10 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                Pedir via WhatsApp
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
