import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contato',
  description: 'Entre em contato com a Caballeros Parfum. Atendimento via WhatsApp para pedidos, dúvidas e consultoria personalizada de fragrâncias árabes.',
  openGraph: {
    title: 'Contato — Caballeros Parfum',
    description: 'Atendimento via WhatsApp para pedidos e consultoria de fragrâncias.',
    type: 'website',
  },
}

export default function ContatoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
