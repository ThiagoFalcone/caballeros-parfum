import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Explorar Perfumes',
  description: 'Catálogo completo com mais de 70 perfumes árabes autênticos. Filtre por família olfativa (Oriental, Floral, Amadeirado, Especiado, Cítrico, Frutal) e faixa de preço.',
  keywords: ['catálogo perfumes árabes', 'perfumes orientais', 'floral', 'amadeirado', 'especiado', 'oud', 'filtre perfumes'],
  openGraph: {
    title: 'Explorar Perfumes — Caballeros Parfum',
    description: 'Mais de 70 perfumes árabes. Filtre por família e preço.',
    type: 'website',
  },
}

export default function ExplorarLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
