import { CartItem } from '@/types'

export function formatWhatsAppMessage(items: CartItem[]): string {
  const lines = items.map(
    ({ perfume, quantidade }) =>
      `🧴 ${perfume.marca} ${perfume.nome} × ${quantidade} — R$${(perfume.preco * quantidade)
        .toFixed(2).replace('.', ',')}`
  )
  const total = items.reduce((sum, { perfume, quantidade }) => sum + perfume.preco * quantidade, 0)
  return [
    'Olá! Gostaria de fazer um pedido:',
    '',
    ...lines,
    '',
    `💰 Total: R$${total.toFixed(2).replace('.', ',')}`,
  ].join('\n')
}

export function buildWhatsAppUrl(message: string): string {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}
