import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import { ToastProvider } from '@/context/ToastContext'
import { WishlistProvider } from '@/context/WishlistContext'
import { EstoqueProvider } from '@/context/EstoqueContext'
import { ThemeProvider } from '@/components/ThemeProvider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ToastStack from '@/components/Toast'

const BASE = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://caballerosparfum.com.br'

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: 'Caballeros Parfum — Perfumes Árabes Premium',
    template: '%s | Caballeros Parfum',
  },
  description: 'Curadoria exclusiva de perfumes árabes autênticos. Lattafa, Al Haramain, Ajmal, Xerjoff, Creed e mais de 70 fragrâncias. Importação direta, 100% originais, entrega para todo o Brasil.',
  keywords: ['perfumes árabes', 'perfumes orientais', 'oud', 'perfumaria árabe', 'Lattafa', 'Al Haramain', 'Ajmal', 'perfumes nicho', 'comprar perfume importado'],
  authors: [{ name: 'Caballeros Parfum', url: BASE }],
  creator: 'Caballeros Parfum',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: BASE,
    siteName: 'Caballeros Parfum',
    title: 'Caballeros Parfum — Perfumes Árabes Premium',
    description: 'Curadoria exclusiva de perfumes árabes autênticos. Importação direta, 100% originais.',
    images: [{ url: '/logo.png', width: 512, height: 512, alt: 'Caballeros Parfum' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Caballeros Parfum — Perfumes Árabes Premium',
    description: 'Curadoria exclusiva de perfumes árabes autênticos.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {/* Prevent flash of dark mode on initial light-mode load */}
        <script dangerouslySetInnerHTML={{ __html: `try{if(localStorage.getItem('cp-theme')==='light')document.documentElement.classList.add('light')}catch(e){}` }} />
      </head>
      <body>
        <ThemeProvider>
          <CartProvider>
            <WishlistProvider>
              <EstoqueProvider>
              <ToastProvider>
                <Header />
                <main>{children}</main>
                <Footer />
                <ToastStack />
              </ToastProvider>
              </EstoqueProvider>
            </WishlistProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
