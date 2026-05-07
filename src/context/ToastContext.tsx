'use client'

import { createContext, useContext, useState, useCallback } from 'react'

interface ToastItem {
  id: string
  message: string
  sub?: string
}

interface ToastCtxType {
  toasts: ToastItem[]
  showToast: (message: string, sub?: string) => void
}

const Ctx = createContext<ToastCtxType>({ toasts: [], showToast: () => {} })

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const showToast = useCallback((message: string, sub?: string) => {
    const id = Math.random().toString(36).slice(2)
    setToasts(prev => [...prev, { id, message, sub }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 2800)
  }, [])

  return (
    <Ctx.Provider value={{ toasts, showToast }}>
      {children}
    </Ctx.Provider>
  )
}

export const useToast = () => useContext(Ctx)
