'use client'

import { useToast } from '@/context/ToastContext'

export default function ToastStack() {
  const { toasts } = useToast()

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map(t => (
        <div
          key={t.id}
          className="flex items-center gap-3 bg-[#1a1a1a] border border-gold/25
            px-4 py-3 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]
            animate-[slideInRight_0.3s_ease-out]
            min-w-[220px] max-w-[320px]"
        >
          <span className="w-7 h-7 rounded-full bg-gold/15 border border-gold/30
            flex items-center justify-center shrink-0 text-gold text-sm">
            ✓
          </span>
          <div className="min-w-0">
            <p className="text-white text-sm font-sans font-medium leading-snug truncate">
              {t.message}
            </p>
            {t.sub && (
              <p className="text-ash text-[11px] leading-none mt-0.5">{t.sub}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
