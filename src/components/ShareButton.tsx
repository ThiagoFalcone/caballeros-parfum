'use client'

import { useState } from 'react'
import { useToast } from '@/context/ToastContext'

interface Props { nome: string; marca: string; preco: number }

export default function ShareButton({ nome, marca, preco }: Props) {
  const { showToast } = useToast()
  const [copied, setCopied] = useState(false)

  async function handleShare() {
    const url  = window.location.href
    const text = `${nome} da ${marca} — R$${preco.toFixed(2).replace('.', ',')} 🧴`

    if (navigator.share) {
      try {
        await navigator.share({ title: nome, text, url })
      } catch {
        // user cancelled — ignore
      }
      return
    }

    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      showToast('Link copiado!', 'Cole no WhatsApp ou onde quiser.')
      setTimeout(() => setCopied(false), 2500)
    })
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="flex items-center justify-center gap-2 border border-white/[0.08] text-ash/60
        font-sans text-sm px-5 py-3 rounded-lg hover:border-gold/30 hover:text-gold transition-colors duration-200"
    >
      {copied ? (
        <>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Copiado
        </>
      ) : (
        <>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Compartilhar
        </>
      )}
    </button>
  )
}
