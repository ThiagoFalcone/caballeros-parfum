'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type EstoqueMap = Record<string, number>

const EstoqueContext = createContext<EstoqueMap>({})

export function EstoqueProvider({ children }: { children: React.ReactNode }) {
  const [estoque, setEstoque] = useState<EstoqueMap>({})

  useEffect(() => {
    supabase
      .from('estoque')
      .select('perfume_id, quantidade')
      .then(({ data }) => {
        if (!data) return
        const map: EstoqueMap = {}
        data.forEach(({ perfume_id, quantidade }: { perfume_id: string; quantidade: number }) => {
          map[perfume_id] = quantidade
        })
        setEstoque(map)
      })
  }, [])

  return <EstoqueContext.Provider value={estoque}>{children}</EstoqueContext.Provider>
}

export const useEstoque = () => useContext(EstoqueContext)
