import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Parfumerie de Nicho',
  description: 'Seleção exclusiva de alta perfumaria: Xerjoff, Nishane, Parfums de Marly, Maison Francis Kurkdjian, Creed, Initio, Kilian e Amouage. Fragrâncias raras com ingredientes premium.',
  keywords: ['perfume nicho', 'alta perfumaria', 'Xerjoff', 'Creed Aventus', 'Parfums de Marly', 'Kilian', 'Amouage', 'perfume luxo'],
  openGraph: {
    title: 'Parfumerie de Nicho — Caballeros Parfum',
    description: 'Xerjoff, Creed, Parfums de Marly, Kilian e mais. Alta perfumaria para colecionadores.',
    type: 'website',
  },
}

export default function NichoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
