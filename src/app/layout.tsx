import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Caballeros Parfum — Perfumes Árabes',
  description: 'Curadoria exclusiva de perfumes árabes. Lattafa, Al Haramain, Ajmal, Swiss Arabian e mais.',
  openGraph: {
    title: 'Caballeros Parfum',
    description: 'Curadoria exclusiva de perfumes árabes.',
    images: ['/logo.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
