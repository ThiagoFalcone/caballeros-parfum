export type FamiliaOlfativa = 'Oriental' | 'Floral' | 'Amadeirado' | 'Cítrico' | 'Especiado'

export interface Perfume {
  id: string
  slug: string
  nome: string
  marca: string
  familia: FamiliaOlfativa
  preco: number
  descricao: string
  notasTopo: string[]
  notasCorpo: string[]
  notasFundo: string[]
  imagemUrl: string
  destaque?: boolean
  ativo: boolean
}

export interface CartItem {
  perfume: Perfume
  quantidade: number
}

export interface CartContextType {
  items: CartItem[]
  addToCart: (perfume: Perfume, quantidade?: number) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantidade: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  checkout: () => void
}
