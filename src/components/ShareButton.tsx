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
        // user cancelled
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
      className={`
        group relative flex items-center gap-2.5
        border font-sans text-xs tracking-[0.15em] uppercase px-5 py-2.5 rounded-full
        transition-all duration-300
        ${copied
          ? 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10'
          : 'border-gold/30 text-gold/70 bg-gold/5 hover:bg-gold/10 hover:text-gold hover:border-gold/50 hover:shadow-[0_0_16px_rgba(201,168,76,0.12)]'
        }
      `}
    >
      {copied ? (
        <>
          <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Link copiado
        </>
      ) : (
        <>
          <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
            <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" strokeLinecap="round"/>
          </svg>
          Compartilhar
        </>
      )}
    </button>
  )
}
