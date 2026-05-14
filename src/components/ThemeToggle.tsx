'use client'

import { useEffect, useState } from 'react'
import { useTheme } from './ThemeProvider'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const [tip, setTip] = useState<'hint' | 'confirm' | null>(null)

  // Mostrar dica na primeira visita após 2s
  useEffect(() => {
    const seen = localStorage.getItem('cp-theme-tip')
    if (!seen) {
      const t = setTimeout(() => setTip('hint'), 2000)
      return () => clearTimeout(t)
    }
  }, [])

  // Auto-fechar dica após 5s
  useEffect(() => {
    if (!tip) return
    const t = setTimeout(() => setTip(null), tip === 'hint' ? 5000 : 2000)
    return () => clearTimeout(t)
  }, [tip])

  function handleClick() {
    localStorage.setItem('cp-theme-tip', '1')
    toggle()
    // Mostrar confirmação brevemente
    setTip('confirm')
  }

  const label = tip === 'confirm'
    ? (theme === 'dark' ? '☀️ Modo claro ativado' : '🌙 Modo escuro ativado')
    : (theme === 'dark' ? '☀️ Ativar modo claro' : '🌙 Ativar modo escuro')

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleClick}
        aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
        className="p-2 text-white hover:text-gold transition-colors"
      >
        {theme === 'dark' ? (
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5"
            strokeLinecap="round" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </svg>
        ) : (
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
          </svg>
        )}
      </button>

      {tip && (
        <div className="absolute top-full right-0 mt-2 z-50 pointer-events-none
          animate-[fadeInDown_0.25s_ease-out]">
          <div className="relative bg-noir/95 border border-gold/25 rounded-xl px-3.5 py-2.5
            shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-sm whitespace-nowrap">
            <span className="absolute -top-1.5 right-3 w-3 h-3 bg-noir/95 border-t border-l
              border-gold/25 rotate-45" />
            <p className="text-gold/90 text-[11px] tracking-wide font-sans">{label}</p>
          </div>
        </div>
      )}
    </div>
  )
}
