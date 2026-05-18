'use client'

import { useEstoque } from '@/context/EstoqueContext'
import AviseMe from './AviseMe'

interface Props { perfumeId: string; nomePerfume: string }

export default function AviseMeWrapper({ perfumeId, nomePerfume }: Props) {
  const estoqueMap = useEstoque()
  const estoque = estoqueMap[perfumeId] ?? null
  const esgotado = estoque !== null && estoque === 0

  if (!esgotado) return null

  return <AviseMe perfumeId={perfumeId} nomePerfume={nomePerfume} />
}
