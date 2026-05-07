import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import { ToastProvider } from '@/context/ToastContext'
import { WishlistProvider } from '@/context/WishlistContext'
import { ThemeProvider } from '@/components/ThemeProvider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ToastStack from '@/components/Toast'

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
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {/* Prevent flash of dark mode on initial light-mode load */}
        <script dangerouslySetInnerHTML={{ __html: `try{if(localStorage.getItem('cp-theme')==='light')document.documentElement.classList.add('light')}catch(e){}` }} />
      </head>
      <body>
        <ThemeProvider>
          <CartProvider>
            <WishlistProvider>
              <ToastProvider>
                <Header />
                <main>{children}</main>
                <Footer />
                <ToastStack />
              </ToastProvider>
            </WishlistProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
