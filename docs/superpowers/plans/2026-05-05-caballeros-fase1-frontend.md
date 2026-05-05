# Caballeros Parfum — Fase 1: Frontend com Mock Data

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir o frontend completo da Caballeros Parfum com mock data — todas as páginas, componentes, animações GSAP e checkout WhatsApp funcional, sem backend.

**Architecture:** Next.js 14 App Router com TypeScript e Tailwind. Dados vêm de `src/data/perfumes.ts` (estático). CartContext persiste em localStorage. Sem Supabase nesta fase.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, GSAP + ScrollTrigger, @splinetool/react-spline, DM Serif Display + Inter (Google Fonts)

---

## Mapa de Arquivos

| Arquivo | Responsabilidade |
|---------|-----------------|
| `tailwind.config.ts` | Paleta Noir & Gold, fontes |
| `src/app/globals.css` | Base styles, Google Fonts |
| `src/app/layout.tsx` | Root layout com CartProvider |
| `src/types/index.ts` | Tipos: Perfume, CartItem, CartContextType |
| `src/data/perfumes.ts` | 20 perfumes árabes mock |
| `src/lib/whatsapp.ts` | Formata mensagem WhatsApp |
| `src/context/CartContext.tsx` | Estado global do carrinho |
| `src/components/Header.tsx` | Header fixo com GSAP scroll |
| `src/components/Footer.tsx` | Footer com links e WhatsApp |
| `src/components/CartDrawer.tsx` | Sheet mobile / sidebar desktop |
| `src/components/PerfumeCard.tsx` | Card com hover CSS 3D |
| `src/components/WhatsAppButton.tsx` | Botão fixo mobile |
| `src/components/ScrollScene.tsx` | Wrapper GSAP ScrollTrigger |
| `src/components/NotesPyramid.tsx` | Pirâmide olfativa SVG animada |
| `src/components/SplineHero.tsx` | Spline embed (lazy, desktop) |
| `src/app/page.tsx` | Homepage com hero e Em Destaque |
| `src/app/explorar/page.tsx` | Catálogo com filtros |
| `src/app/perfume/[slug]/page.tsx` | Detalhe do perfume |
| `src/app/colecoes/page.tsx` | Coleções por marca |
| `src/app/sobre/page.tsx` | Sobre a marca |
| `src/app/contato/page.tsx` | Contato |
| `src/app/entrar/page.tsx` | Shell login (fase 4) |
| `src/app/cadastrar/page.tsx` | Shell cadastro (fase 4) |
| `src/app/conta/page.tsx` | Shell conta (fase 4) |
| `src/app/conta/pedidos/page.tsx` | Shell pedidos (fase 4) |
| `src/app/admin/page.tsx` | Shell admin (fase 5) |

---

## Task 1: Project Scaffold

**Files:**
- Create: `package.json` (via create-next-app)
- Create: `.env.local`
- Create: `public/logo.png`

- [ ] **Step 1: Scaffold Next.js 14**

No diretório `C:/Users/Corleone/Desktop/Perfumes-novo`, execute:

```bash
npx create-next-app@14 . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-git
```

Quando perguntar "Ok to proceed?": `y`. Aceitar todos os defaults.

- [ ] **Step 2: Instalar dependências**

```bash
npm install gsap @splinetool/react-spline
```

- [ ] **Step 3: Copiar logo para public**

```powershell
Copy-Item "Logo-Caballeros.png" "public/logo.png"
```

- [ ] **Step 4: Criar .env.local**

Crie `.env.local` com o conteúdo abaixo. Substitua o número pelo WhatsApp real (código do país + DDD + número, sem espaços):

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=5511999999999
```

- [ ] **Step 5: Verificar que sobe**

```bash
npm run dev
```

Esperado: página padrão Next.js em http://localhost:3000 sem erros.

- [ ] **Step 6: Commit**

```bash
git init
git add .
git commit -m "chore: scaffold Next.js 14 com TypeScript e Tailwind"
```

---

## Task 2: Tailwind Config & Estilos Globais

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Configurar paleta e fontes no Tailwind**

Substitua `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        noir: '#0a0a0a',
        gold: '#C9A84C',
        smoke: '#1a1a1a',
        ash: '#888888',
      },
      fontFamily: {
        serif: ['DM Serif Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 2: Definir estilos globais**

Substitua `src/app/globals.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html { scroll-behavior: smooth; }
  body { @apply bg-noir text-white font-sans antialiased; }
  h1, h2, h3 { @apply font-serif; }
}

@layer utilities {
  .text-gradient-gold {
    background: linear-gradient(135deg, #C9A84C, #e8d08a, #C9A84C);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}
```

- [ ] **Step 3: Configurar next.config.ts para imagens externas**

Substitua `next.config.ts`:

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
}

export default nextConfig
```

- [ ] **Step 4: Verificar**

```bash
npm run dev
```

Esperado: fundo `#0a0a0a` visível na página. Sem erros no console.

- [ ] **Step 5: Commit**

```bash
git add tailwind.config.ts src/app/globals.css next.config.ts
git commit -m "chore: Tailwind com paleta Noir & Gold, DM Serif Display e imagens externas"
```

---

## Task 3: Tipos TypeScript

**Files:**
- Create: `src/types/index.ts`

- [ ] **Step 1: Criar tipos**

Crie `src/types/index.ts`:

```typescript
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
```

- [ ] **Step 2: Verificar TypeScript**

```bash
npx tsc --noEmit
```

Esperado: sem erros.

- [ ] **Step 3: Commit**

```bash
git add src/types/index.ts
git commit -m "feat: tipos TypeScript Perfume, CartItem, CartContextType"
```

---

## Task 4: Mock Data

**Files:**
- Create: `src/data/perfumes.ts`

- [ ] **Step 1: Criar mock data com 20 perfumes árabes**

Crie `src/data/perfumes.ts`:

```typescript
import { Perfume } from '@/types'

export const perfumes: Perfume[] = [
  {
    id: '1', slug: 'lattafa-oud-for-glory', nome: 'Oud For Glory', marca: 'Lattafa',
    familia: 'Oriental', preco: 189.90,
    descricao: 'Uma jornada olfativa pelos souks do Oriente Médio. Oud defumado encontra âmbar dourado e especiarias quentes numa composição que perdura horas na pele.',
    notasTopo: ['Oud', 'Especiarias'], notasCorpo: ['Rosa', 'Âmbar', 'Incenso'], notasFundo: ['Sândalo', 'Almíscar', 'Baunilha'],
    imagemUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=80',
    destaque: true, ativo: true,
  },
  {
    id: '2', slug: 'al-haramain-amber-oud', nome: 'Amber Oud', marca: 'Al Haramain',
    familia: 'Oriental', preco: 219.90,
    descricao: 'O encontro perfeito entre o oud árabe e o âmbar dourado. Quente, sensual e envolvente, deixa um rastro inconfundível onde passa.',
    notasTopo: ['Oud', 'Açafrão'], notasCorpo: ['Âmbar', 'Rosa'], notasFundo: ['Sândalo', 'Almíscar Branco'],
    imagemUrl: 'https://images.unsplash.com/photo-1588514912908-e8bc2cf6c6c7?w=600&q=80',
    destaque: true, ativo: true,
  },
  {
    id: '3', slug: 'ajmal-dhan-al-oudh', nome: 'Dhan Al Oudh', marca: 'Ajmal',
    familia: 'Amadeirado', preco: 259.90,
    descricao: 'A essência pura do oud hindi envolto em madeiras nobres. Uma fragrância de prestígio para os momentos mais especiais.',
    notasTopo: ['Oud Hindi', 'Cedro'], notasCorpo: ['Sândalo', 'Patchouli'], notasFundo: ['Âmbar', 'Almíscar'],
    imagemUrl: 'https://images.unsplash.com/photo-1594913656049-5b6d779b9b4e?w=600&q=80',
    destaque: true, ativo: true,
  },
  {
    id: '4', slug: 'swiss-arabian-shaghaf-oud', nome: 'Shaghaf Oud', marca: 'Swiss Arabian',
    familia: 'Oriental', preco: 179.90,
    descricao: 'Apaixonante e profundo. O oud se funde com especiarias exóticas criando uma sinfonia olfativa digna da realeza árabe.',
    notasTopo: ['Bergamota', 'Açafrão'], notasCorpo: ['Oud', 'Rosa', 'Incenso'], notasFundo: ['Âmbar', 'Baunilha', 'Almíscar'],
    imagemUrl: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&q=80',
    destaque: true, ativo: true,
  },
  {
    id: '5', slug: 'rasasi-la-yuqawam', nome: 'La Yuqawam', marca: 'Rasasi',
    familia: 'Floral', preco: 169.90,
    descricao: 'Irresistível e eterno — seu nome significa "aquele que não pode ser resistido". Flores exóticas abraçadas por madeiras orientais.',
    notasTopo: ['Bergamota', 'Limão'], notasCorpo: ['Jasmim', 'Rosa', 'Íris'], notasFundo: ['Sândalo', 'Âmbar', 'Almíscar'],
    imagemUrl: 'https://images.unsplash.com/photo-1548695607-9c73430547ac?w=600&q=80',
    ativo: true,
  },
  {
    id: '6', slug: 'armaf-club-de-nuit-intense', nome: 'Club de Nuit Intense Man', marca: 'Armaf',
    familia: 'Amadeirado', preco: 149.90,
    descricao: 'Moderno e vibrante, com a sofisticação das noites árabes. Frescor cítrico que evolui para um coração amadeirado e um fundo envolvente.',
    notasTopo: ['Limão', 'Maçã', 'Abacaxi'], notasCorpo: ['Gerânio', 'Jasmim', 'Rosa'], notasFundo: ['Bétula', 'Âmbar', 'Almíscar'],
    imagemUrl: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&q=80',
    ativo: true,
  },
  {
    id: '7', slug: 'lattafa-khamrah', nome: 'Khamrah', marca: 'Lattafa',
    familia: 'Especiado', preco: 199.90,
    descricao: 'Rico e embriagante como o vinho das noites orientais. Especiarias e madeiras defumadas criam uma experiência única.',
    notasTopo: ['Especiarias', 'Açafrão'], notasCorpo: ['Oud', 'Rosa'], notasFundo: ['Âmbar', 'Baunilha', 'Sândalo'],
    imagemUrl: 'https://images.unsplash.com/photo-1566958769312-82cef41d19ef?w=600&q=80',
    ativo: true,
  },
  {
    id: '8', slug: 'al-haramain-laventure', nome: "L'Aventure", marca: 'Al Haramain',
    familia: 'Amadeirado', preco: 159.90,
    descricao: 'Uma aventura pelos desertos e oásis do Oriente. Frescor inicial que mergulha em profundas madeiras aromáticas.',
    notasTopo: ['Bergamota', 'Pimenta', 'Cardamomo'], notasCorpo: ['Patchouli', 'Vetiver', 'Cedro'], notasFundo: ['Âmbar', 'Almíscar', 'Sândalo'],
    imagemUrl: 'https://images.unsplash.com/photo-1608528577891-eb055944f2e7?w=600&q=80',
    ativo: true,
  },
  {
    id: '9', slug: 'ajmal-amber-wood', nome: 'Amber Wood', marca: 'Ajmal',
    familia: 'Amadeirado', preco: 189.90,
    descricao: 'A nobreza do âmbar encontra as madeiras sagradas do Oriente. Uma fragrância que aquece e seduz.',
    notasTopo: ['Sálvia', 'Bergamota'], notasCorpo: ['Âmbar', 'Sândalo', 'Cedro'], notasFundo: ['Almíscar', 'Baunilha', 'Benjoim'],
    imagemUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80',
    ativo: true,
  },
  {
    id: '10', slug: 'swiss-arabian-oud-maattar', nome: 'Oud Maattar', marca: 'Swiss Arabian',
    familia: 'Amadeirado', preco: 239.90,
    descricao: 'A fumaça sagrada do oud defumado envolve o corpo como um véu de mistério. Autêntico, intenso, memorável.',
    notasTopo: ['Oud Defumado'], notasCorpo: ['Sândalo', 'Patchouli'], notasFundo: ['Âmbar', 'Almíscar'],
    imagemUrl: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&q=80',
    ativo: true,
  },
  {
    id: '11', slug: 'lattafa-asad', nome: 'Asad', marca: 'Lattafa',
    familia: 'Oriental', preco: 174.90,
    descricao: 'O leão do Oriente. Majestoso e poderoso, com especiarias que dominam e madeiras que conquistam.',
    notasTopo: ['Cardamomo', 'Pimenta Rosa'], notasCorpo: ['Oud', 'Âmbar', 'Incenso'], notasFundo: ['Almíscar', 'Civet', 'Sândalo'],
    imagemUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=80',
    ativo: true,
  },
  {
    id: '12', slug: 'rasasi-hawas', nome: 'Hawas', marca: 'Rasasi',
    familia: 'Cítrico', preco: 154.90,
    descricao: 'Fresco como a brisa do Mediterrâneo com profundidade oriental. Perfeito na transição do dia para a noite.',
    notasTopo: ['Menta', 'Bergamota', 'Maçã'], notasCorpo: ['Jasmim', 'Frésia', 'Cedro'], notasFundo: ['Âmbar', 'Almíscar Branco', 'Sândalo'],
    imagemUrl: 'https://images.unsplash.com/photo-1548695607-9c73430547ac?w=600&q=80',
    ativo: true,
  },
  {
    id: '13', slug: 'armaf-venetian-musk', nome: 'Venetian Musk', marca: 'Armaf',
    familia: 'Floral', preco: 139.90,
    descricao: 'O almíscar mais puro envolvido em flores delicadas. Suave, sensual e duradouro.',
    notasTopo: ['Bergamota', 'Pera'], notasCorpo: ['Rosa', 'Peônia', 'Jasmim'], notasFundo: ['Almíscar Branco', 'Âmbar', 'Cedro'],
    imagemUrl: 'https://images.unsplash.com/photo-1588514912908-e8bc2cf6c6c7?w=600&q=80',
    ativo: true,
  },
  {
    id: '14', slug: 'al-haramain-midnight-oud', nome: 'Midnight Oud', marca: 'Al Haramain',
    familia: 'Oriental', preco: 229.90,
    descricao: 'A escuridão perfumada da meia-noite árabe. Oud intenso e rosa exótica numa composição que hipnotiza.',
    notasTopo: ['Rosa', 'Açafrão'], notasCorpo: ['Oud', 'Incenso', 'Baunilha'], notasFundo: ['Âmbar', 'Almíscar', 'Benjoim'],
    imagemUrl: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&q=80',
    ativo: true,
  },
  {
    id: '15', slug: 'lattafa-raghba', nome: 'Raghba', marca: 'Lattafa',
    familia: 'Oriental', preco: 144.90,
    descricao: 'Doce e acolhedor como uma noite de inverno em Dubai. Baunilha e especiarias criam uma fragrância que abraça a alma.',
    notasTopo: ['Especiarias', 'Bergamota'], notasCorpo: ['Oud', 'Rosa'], notasFundo: ['Baunilha', 'Âmbar', 'Almíscar'],
    imagemUrl: 'https://images.unsplash.com/photo-1566958769312-82cef41d19ef?w=600&q=80',
    ativo: true,
  },
  {
    id: '16', slug: 'swiss-arabian-warda', nome: 'Warda', marca: 'Swiss Arabian',
    familia: 'Floral', preco: 164.90,
    descricao: 'Warda significa "rosa" em árabe. Uma ode à rainha das flores com sofisticação oriental.',
    notasTopo: ['Rosa de Taif', 'Bergamota'], notasCorpo: ['Rosa Búlgara', 'Íris', 'Violeta'], notasFundo: ['Âmbar', 'Almíscar', 'Sândalo'],
    imagemUrl: 'https://images.unsplash.com/photo-1548695607-9c73430547ac?w=600&q=80',
    ativo: true,
  },
  {
    id: '17', slug: 'rasasi-faqat-lahu', nome: 'Faqat Lahu', marca: 'Rasasi',
    familia: 'Floral', preco: 194.90,
    descricao: 'Exclusivo para ele. Uma composição floral-amadeirada que define o homem moderno do Oriente Médio.',
    notasTopo: ['Bergamota', 'Limão'], notasCorpo: ['Gerânio', 'Jasmim'], notasFundo: ['Vetiver', 'Cedro', 'Almíscar'],
    imagemUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80',
    ativo: true,
  },
  {
    id: '18', slug: 'armaf-tres-nuit', nome: 'Tres Nuit', marca: 'Armaf',
    familia: 'Amadeirado', preco: 134.90,
    descricao: 'Três noites de luxo condensadas numa única fragrância. Elegante, sofisticado e surpreendentemente duradouro.',
    notasTopo: ['Bergamota', 'Limão', 'Pimenta Preta'], notasCorpo: ['Couro', 'Âmbar'], notasFundo: ['Âmbar Cinza', 'Almíscar', 'Madeira'],
    imagemUrl: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&q=80',
    ativo: true,
  },
  {
    id: '19', slug: 'ajmal-evoke-silver', nome: 'Evoke Silver', marca: 'Ajmal',
    familia: 'Cítrico', preco: 169.90,
    descricao: 'Cítrico, nítido e energizante. Para quem quer leveza sem abrir mão da sofisticação oriental.',
    notasTopo: ['Bergamota', 'Limão Siciliano', 'Toranja'], notasCorpo: ['Lavanda', 'Gerânio'], notasFundo: ['Cedro', 'Almíscar', 'Âmbar'],
    imagemUrl: 'https://images.unsplash.com/photo-1608528577891-eb055944f2e7?w=600&q=80',
    ativo: true,
  },
  {
    id: '20', slug: 'lattafa-yara', nome: 'Yara', marca: 'Lattafa',
    familia: 'Floral', preco: 154.90,
    descricao: 'Feminino, frutado e florido. Yara é a fragrância das flores que desabrocham ao amanhecer no deserto.',
    notasTopo: ['Morango', 'Pera', 'Bergamota'], notasCorpo: ['Rosa', 'Jasmim', 'Íris'], notasFundo: ['Almíscar', 'Baunilha', 'Cedro'],
    imagemUrl: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&q=80',
    ativo: true,
  },
]

export const perfumesBySlug = Object.fromEntries(perfumes.map(p => [p.slug, p]))
export const perfumesDestaque = perfumes.filter(p => p.destaque)
export const familias: string[] = [...new Set(perfumes.map(p => p.familia))]
```

- [ ] **Step 2: Verificar TypeScript**

```bash
npx tsc --noEmit
```

Esperado: sem erros.

- [ ] **Step 3: Commit**

```bash
git add src/data/perfumes.ts
git commit -m "feat: mock data com 20 perfumes árabes"
```

---

## Task 5: WhatsApp Lib

**Files:**
- Create: `src/lib/whatsapp.ts`

- [ ] **Step 1: Criar helper**

Crie `src/lib/whatsapp.ts`:

```typescript
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
```

- [ ] **Step 2: Verificar TypeScript**

```bash
npx tsc --noEmit
```

Esperado: sem erros.

- [ ] **Step 3: Commit**

```bash
git add src/lib/whatsapp.ts
git commit -m "feat: helper formatWhatsAppMessage e buildWhatsAppUrl"
```

---

## Task 6: CartContext

**Files:**
- Create: `src/context/CartContext.tsx`

- [ ] **Step 1: Criar CartContext**

Crie `src/context/CartContext.tsx`:

```typescript
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { CartContextType, CartItem, Perfume } from '@/types'
import { buildWhatsAppUrl, formatWhatsAppMessage } from '@/lib/whatsapp'

const CART_KEY = 'caballerosCart'
const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_KEY)
      if (stored) setItems(JSON.parse(stored))
    } catch {}
  }, [])

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items))
  }, [items])

  function addToCart(perfume: Perfume, quantidade = 1) {
    setItems(prev => {
      const existing = prev.find(i => i.perfume.id === perfume.id)
      if (existing) {
        return prev.map(i =>
          i.perfume.id === perfume.id ? { ...i, quantidade: i.quantidade + quantidade } : i
        )
      }
      return [...prev, { perfume, quantidade }]
    })
  }

  function removeFromCart(id: string) {
    setItems(prev => prev.filter(i => i.perfume.id !== id))
  }

  function updateQuantity(id: string, quantidade: number) {
    if (quantidade <= 0) return removeFromCart(id)
    setItems(prev => prev.map(i => (i.perfume.id === id ? { ...i, quantidade } : i)))
  }

  function clearCart() { setItems([]) }

  function checkout() {
    if (items.length === 0) return
    window.open(buildWhatsAppUrl(formatWhatsAppMessage(items)), '_blank')
  }

  const totalItems = items.reduce((sum, i) => sum + i.quantidade, 0)
  const totalPrice = items.reduce((sum, i) => sum + i.perfume.preco * i.quantidade, 0)

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice, checkout }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextType {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
```

- [ ] **Step 2: Verificar TypeScript**

```bash
npx tsc --noEmit
```

Esperado: sem erros.

- [ ] **Step 3: Commit**

```bash
git add src/context/CartContext.tsx
git commit -m "feat: CartContext com localStorage e checkout WhatsApp"
```

---

## Task 7: Componentes base — Footer e WhatsAppButton

**Files:**
- Create: `src/components/Footer.tsx`
- Create: `src/components/WhatsAppButton.tsx`

- [ ] **Step 1: Criar Footer**

Crie `src/components/Footer.tsx`:

```typescript
import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-smoke border-t border-gold/10 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="flex flex-col gap-4">
          <Image src="/logo.png" alt="Caballeros Parfum" width={120} height={36} className="object-contain" />
          <p className="text-ash text-sm leading-relaxed">
            Curadoria exclusiva de perfumes árabes. Autenticidade, raridade e o luxo do Oriente Médio.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h4 className="text-gold text-xs tracking-widest uppercase">Navegação</h4>
          {[
            { href: '/explorar', label: 'Explorar Perfumes' },
            { href: '/colecoes', label: 'Coleções' },
            { href: '/sobre', label: 'Nossa História' },
            { href: '/contato', label: 'Contato' },
          ].map(link => (
            <Link key={link.href} href={link.href} className="text-ash text-sm hover:text-gold transition-colors">
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <h4 className="text-gold text-xs tracking-widest uppercase">Atendimento</h4>
          <p className="text-ash text-sm">Pedidos exclusivamente via WhatsApp</p>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gold text-sm hover:underline"
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.553 4.116 1.523 5.845L.057 23.882l6.197-1.438A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.66-.499-5.193-1.371l-.371-.218-3.878.9.947-3.766-.24-.387A10 10 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            Falar no WhatsApp
          </a>
        </div>
      </div>
      <div className="border-t border-gold/10 py-4 text-center text-ash text-xs">
        © {new Date().getFullYear()} Caballeros Parfum. Todos os direitos reservados.
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Criar WhatsAppButton**

Crie `src/components/WhatsAppButton.tsx`:

```typescript
'use client'

import { useCart } from '@/context/CartContext'

export default function WhatsAppButton() {
  const { checkout, totalItems } = useCart()
  if (totalItems === 0) return null
  return (
    <button
      onClick={checkout}
      className="md:hidden fixed bottom-4 right-4 z-40 flex items-center gap-2 bg-gold text-noir font-sans font-semibold text-sm px-4 py-3 rounded-full shadow-lg hover:bg-yellow-400 transition-colors"
      aria-label="Finalizar pedido via WhatsApp"
    >
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.553 4.116 1.523 5.845L.057 23.882l6.197-1.438A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.66-.499-5.193-1.371l-.371-.218-3.878.9.947-3.766-.24-.387A10 10 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
      </svg>
      Finalizar ({totalItems})
    </button>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.tsx src/components/WhatsAppButton.tsx
git commit -m "feat: Footer e WhatsAppButton fixo mobile"
```

---

## Task 8: CartDrawer

**Files:**
- Create: `src/components/CartDrawer.tsx`

- [ ] **Step 1: Criar CartDrawer**

Crie `src/components/CartDrawer.tsx`:

```typescript
'use client'

import Image from 'next/image'
import { useCart } from '@/context/CartContext'

interface Props { open: boolean; onClose: () => void }

export default function CartDrawer({ open, onClose }: Props) {
  const { items, updateQuantity, removeFromCart, totalPrice, checkout } = useCart()

  return (
    <>
      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      )}

      {/* Drawer: bottom sheet mobile, sidebar desktop */}
      <div className={`fixed z-50 bg-smoke border-gold/20 transition-transform duration-300
        bottom-0 left-0 right-0 rounded-t-2xl border-t
        md:top-0 md:right-0 md:left-auto md:bottom-0 md:w-96 md:rounded-none md:border-l md:border-t-0
        ${open ? 'translate-y-0 md:translate-x-0' : 'translate-y-full md:translate-x-full'}`}
      >
        <div className="flex flex-col h-full max-h-[90vh] md:max-h-screen">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gold/10">
            <h2 className="font-serif text-lg text-white">Meu Carrinho</h2>
            <button onClick={onClose} className="text-ash hover:text-white transition-colors p-1">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
            {items.length === 0 ? (
              <p className="text-ash text-sm text-center mt-8">Seu carrinho está vazio.</p>
            ) : (
              items.map(({ perfume, quantidade }) => (
                <div key={perfume.id} className="flex gap-3 items-start">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-noir">
                    <Image src={perfume.imagemUrl} alt={perfume.nome} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gold tracking-wider uppercase">{perfume.marca}</p>
                    <p className="text-sm text-white font-medium truncate">{perfume.nome}</p>
                    <p className="text-xs text-ash">R${perfume.preco.toFixed(2).replace('.', ',')}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => updateQuantity(perfume.id, quantidade - 1)} className="w-6 h-6 rounded border border-gold/30 text-gold text-sm hover:bg-gold/10 transition-colors">−</button>
                      <span className="text-sm text-white w-4 text-center">{quantidade}</span>
                      <button onClick={() => updateQuantity(perfume.id, quantidade + 1)} className="w-6 h-6 rounded border border-gold/30 text-gold text-sm hover:bg-gold/10 transition-colors">+</button>
                      <button onClick={() => removeFromCart(perfume.id)} className="ml-auto text-ash hover:text-red-400 transition-colors text-xs">remover</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="px-5 py-4 border-t border-gold/10 flex flex-col gap-3">
              <div className="flex justify-between text-sm">
                <span className="text-ash">Total</span>
                <span className="text-white font-medium">R${totalPrice.toFixed(2).replace('.', ',')}</span>
              </div>
              <button
                onClick={() => { checkout(); onClose() }}
                className="w-full bg-gold text-noir font-sans font-semibold py-3 rounded-lg hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2"
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.553 4.116 1.523 5.845L.057 23.882l6.197-1.438A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.66-.499-5.193-1.371l-.371-.218-3.878.9.947-3.766-.24-.387A10 10 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                Pedir via WhatsApp
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/CartDrawer.tsx
git commit -m "feat: CartDrawer bottom sheet mobile / sidebar desktop"
```

---

## Task 9: Header

**Files:**
- Create: `src/components/Header.tsx`

- [ ] **Step 1: Criar Header com GSAP scroll**

Crie `src/components/Header.tsx`:

```typescript
'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { useCart } from '@/context/CartContext'
import CartDrawer from './CartDrawer'

const navLinks = [
  { href: '/explorar', label: 'Explorar' },
  { href: '/colecoes', label: 'Coleções' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/contato', label: 'Contato' },
]

export default function Header() {
  const headerRef = useRef<HTMLElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { totalItems } = useCart()

  useEffect(() => {
    const onScroll = () => {
      if (!headerRef.current) return
      gsap.to(headerRef.current, {
        backgroundColor: window.scrollY > 60 ? '#0a0a0a' : 'transparent',
        borderBottomColor: window.scrollY > 60 ? 'rgba(201,168,76,0.15)' : 'transparent',
        duration: 0.3,
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 border-b border-transparent"
        style={{ backgroundColor: 'transparent' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <Image src="/logo.png" alt="Caballeros Parfum" width={140} height={40} className="object-contain" priority />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href}
                className="text-xs font-sans text-ash hover:text-gold transition-colors tracking-widest uppercase">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={() => setDrawerOpen(true)}
              className="relative p-2 text-white hover:text-gold transition-colors" aria-label="Carrinho">
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round"/>
                <path d="M16 10a4 4 0 01-8 0" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-noir text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-white" aria-label="Menu">
              <div className="w-5 flex flex-col gap-[5px]">
                <span className={`block h-px bg-current transition-all ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
                <span className={`block h-px bg-current transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-px bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-noir/95 backdrop-blur border-t border-gold/10 px-6 py-6 flex flex-col gap-5">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                className="text-sm font-sans text-ash hover:text-gold transition-colors tracking-widest uppercase">
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
```

- [ ] **Step 2: Criar Root Layout**

Substitua `src/app/layout.tsx`:

```typescript
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
```

- [ ] **Step 3: Verificar build**

```bash
npm run build
```

Esperado: build sem erros TypeScript. (Pode haver warnings de imagens, ignorar por ora.)

- [ ] **Step 4: Commit**

```bash
git add src/components/Header.tsx src/app/layout.tsx
git commit -m "feat: Header com GSAP scroll + root layout completo"
```

---

## Task 10: PerfumeCard

**Files:**
- Create: `src/components/PerfumeCard.tsx`

- [ ] **Step 1: Criar PerfumeCard**

Crie `src/components/PerfumeCard.tsx`:

```typescript
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Perfume } from '@/types'
import { useCart } from '@/context/CartContext'

interface Props { perfume: Perfume }

export default function PerfumeCard({ perfume }: Props) {
  const { addToCart } = useCart()

  return (
    <div className="group relative bg-smoke rounded-2xl overflow-hidden border border-gold/10 hover:border-gold/30 transition-all duration-300
      md:hover:[transform:perspective(800px)_rotateY(3deg)_rotateX(2deg)] md:hover:shadow-[0_20px_60px_rgba(201,168,76,0.1)]">
      <Link href={`/perfume/${perfume.slug}`}>
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={perfume.imagemUrl}
            alt={perfume.nome}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 80vw, (max-width: 1200px) 33vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-noir/80 via-transparent to-transparent" />
          <span className="absolute top-3 left-3 bg-noir/70 backdrop-blur text-gold text-[10px] tracking-widest uppercase px-2 py-1 rounded-full border border-gold/20">
            {perfume.familia}
          </span>
        </div>
        <div className="p-4">
          <p className="text-gold text-xs tracking-widest uppercase mb-1">{perfume.marca}</p>
          <h3 className="font-serif text-white text-lg leading-tight mb-1">{perfume.nome}</h3>
          <p className="text-ash text-xs">{perfume.notasTopo.slice(0, 2).join(' · ')}</p>
        </div>
      </Link>
      <div className="px-4 pb-4 flex items-center justify-between">
        <span className="text-white font-sans font-medium">
          R${perfume.preco.toFixed(2).replace('.', ',')}
        </span>
        <button
          onClick={() => addToCart(perfume)}
          className="bg-gold/10 border border-gold/30 text-gold text-xs px-3 py-2 rounded-lg hover:bg-gold hover:text-noir transition-all"
        >
          + Carrinho
        </button>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/PerfumeCard.tsx
git commit -m "feat: PerfumeCard com CSS 3D hover e add to cart"
```

---

## Task 11: ScrollScene e NotesPyramid

**Files:**
- Create: `src/components/ScrollScene.tsx`
- Create: `src/components/NotesPyramid.tsx`

- [ ] **Step 1: Criar ScrollScene**

Crie `src/components/ScrollScene.tsx`:

```typescript
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  children: React.ReactNode
  animation?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight'
  delay?: number
  className?: string
}

export default function ScrollScene({ children, animation = 'fadeUp', delay = 0, className }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const fromVars: gsap.TweenVars = {
      opacity: 0,
      y: animation === 'fadeUp' ? 60 : 0,
      x: animation === 'slideLeft' ? -60 : animation === 'slideRight' ? 60 : 0,
    }

    gsap.fromTo(el, fromVars, {
      opacity: 1, y: 0, x: 0, duration: 0.9, delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()) }
  }, [animation, delay])

  return <div ref={ref} className={className} style={{ opacity: 0 }}>{children}</div>
}
```

- [ ] **Step 2: Criar NotesPyramid**

Crie `src/components/NotesPyramid.tsx`:

```typescript
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  notasTopo: string[]
  notasCorpo: string[]
  notasFundo: string[]
}

export default function NotesPyramid({ notasTopo, notasCorpo, notasFundo }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const layers = el.querySelectorAll('.pyramid-layer')
    gsap.fromTo(layers,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, stagger: 0.2, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none none' },
      }
    )
  }, [])

  const layers = [
    { label: 'Notas de Topo', notas: notasTopo, width: 'w-1/3', bg: 'bg-gold/20', border: 'border-gold/40' },
    { label: 'Notas de Corpo', notas: notasCorpo, width: 'w-2/3', bg: 'bg-gold/10', border: 'border-gold/25' },
    { label: 'Notas de Fundo', notas: notasFundo, width: 'w-full', bg: 'bg-gold/5', border: 'border-gold/15' },
  ]

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-2 py-8">
      <h3 className="font-serif text-white text-xl mb-6">Pirâmide Olfativa</h3>
      {layers.map(layer => (
        <div key={layer.label} className={`pyramid-layer ${layer.width} ${layer.bg} border ${layer.border} rounded-lg px-4 py-3 text-center opacity-0`}>
          <p className="text-gold text-[10px] tracking-widest uppercase mb-1">{layer.label}</p>
          <p className="text-white text-sm">{layer.notas.join(' · ')}</p>
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ScrollScene.tsx src/components/NotesPyramid.tsx
git commit -m "feat: ScrollScene GSAP e NotesPyramid animada"
```

---

## Task 12: SplineHero

**Files:**
- Create: `src/components/SplineHero.tsx`

- [ ] **Step 1: Criar SplineHero com dynamic import**

Crie `src/components/SplineHero.tsx`:

```typescript
'use client'

import dynamic from 'next/dynamic'

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-noir animate-pulse rounded-xl" />,
})

// Substitua pela URL da sua cena no Spline Community:
// https://app.spline.design/community — buscar "perfume bottle" ou "luxury bottle"
const SPLINE_SCENE_URL = 'https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode'

export default function SplineHero() {
  return (
    <div className="w-full h-full">
      <Spline scene={SPLINE_SCENE_URL} />
    </div>
  )
}
```

**Nota:** Para trocar a cena Spline: acesse [app.spline.design/community](https://app.spline.design/community), busque "perfume" ou "luxury bottle", abra a cena → Share → Copy scene URL. Cole no lugar de `SPLINE_SCENE_URL`.

- [ ] **Step 2: Commit**

```bash
git add src/components/SplineHero.tsx
git commit -m "feat: SplineHero com dynamic import e fallback"
```

---

## Task 13: Homepage

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Escrever homepage**

Substitua `src/app/page.tsx`:

```typescript
'use client'

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { perfumesDestaque } from '@/data/perfumes'
import PerfumeCard from '@/components/PerfumeCard'
import ScrollScene from '@/components/ScrollScene'

gsap.registerPlugin(ScrollTrigger)

const SplineHero = dynamic(() => import('@/components/SplineHero'), { ssr: false })

export default function HomePage() {
  const heroTextRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = heroTextRef.current
    if (!el) return
    gsap.fromTo(
      el.querySelectorAll('.hero-item'),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 1, ease: 'power3.out', delay: 0.3 }
    )
  }, [])

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Spline background (desktop only) */}
        <div className="hidden md:block absolute inset-0 z-0 opacity-60">
          <SplineHero />
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-noir/95 via-noir/70 to-transparent" />

        {/* Hero text */}
        <div ref={heroTextRef} className="relative z-20 max-w-7xl mx-auto px-6 pt-24 pb-16">
          <p className="hero-item text-gold text-xs tracking-[0.3em] uppercase mb-4 opacity-0">
            Curadoria exclusiva
          </p>
          <h1 className="hero-item font-serif text-5xl md:text-7xl text-white leading-tight max-w-xl mb-6 opacity-0">
            O Oriente<br />
            <em className="text-gradient-gold">em cada gota</em>
          </h1>
          <p className="hero-item text-ash text-lg max-w-md leading-relaxed mb-10 opacity-0">
            Perfumes árabes autênticos das melhores casas: Lattafa, Al Haramain, Ajmal e muito mais.
          </p>
          <div className="hero-item flex flex-col sm:flex-row gap-4 opacity-0">
            <Link href="/explorar"
              className="inline-flex items-center gap-2 bg-gold text-noir font-sans font-semibold px-8 py-4 rounded-full hover:bg-yellow-400 transition-colors">
              Explorar Coleção
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link href="/sobre"
              className="inline-flex items-center gap-2 border border-gold/30 text-gold font-sans px-8 py-4 rounded-full hover:bg-gold/10 transition-colors">
              Nossa História
            </Link>
          </div>
        </div>

        {/* Mobile CTA fixo */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-noir/90 backdrop-blur border-t border-gold/10 p-4">
          <Link href="/explorar"
            className="flex items-center justify-center gap-2 bg-gold text-noir font-sans font-semibold py-3 rounded-full w-full">
            Ver Coleção →
          </Link>
        </div>
      </section>

      {/* Em Destaque */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
        <ScrollScene className="text-center mb-16">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3">Seleção Especial</p>
          <h2 className="font-serif text-4xl md:text-5xl text-white">Em Destaque</h2>
        </ScrollScene>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {perfumesDestaque.map((perfume, i) => (
            <ScrollScene key={perfume.id} animation="fadeUp" delay={i * 0.1}>
              <PerfumeCard perfume={perfume} />
            </ScrollScene>
          ))}
        </div>

        <ScrollScene className="text-center mt-12">
          <Link href="/explorar"
            className="inline-flex items-center gap-2 border border-gold/30 text-gold font-sans text-sm px-8 py-3 rounded-full hover:bg-gold/10 transition-colors">
            Ver todos os perfumes →
          </Link>
        </ScrollScene>
      </section>

      {/* Marcas */}
      <section className="border-t border-gold/10 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollScene className="text-center mb-10">
            <p className="text-ash text-xs tracking-widest uppercase">As melhores casas árabes</p>
          </ScrollScene>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {['Lattafa', 'Al Haramain', 'Ajmal', 'Swiss Arabian', 'Rasasi', 'Armaf'].map((marca, i) => (
              <ScrollScene key={marca} animation="fadeIn" delay={i * 0.05}>
                <Link href={`/colecoes?marca=${marca}`}
                  className="font-serif text-lg text-ash hover:text-gold transition-colors">
                  {marca}
                </Link>
              </ScrollScene>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Verificar no browser**

```bash
npm run dev
```

Abrir http://localhost:3000. Verificar:
- Hero com texto animado aparecendo em sequência
- Seção "Em Destaque" com 4 cards
- Seção de marcas no rodapé da homepage
- Header transparente → escurece ao scrollar

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: homepage com hero GSAP, Em Destaque e marcas"
```

---

## Task 14: Página /explorar

**Files:**
- Create: `src/app/explorar/page.tsx`

- [ ] **Step 1: Criar página explorar**

Crie `src/app/explorar/page.tsx`:

```typescript
'use client'

import { useState } from 'react'
import { perfumes, familias } from '@/data/perfumes'
import PerfumeCard from '@/components/PerfumeCard'
import WhatsAppButton from '@/components/WhatsAppButton'

export default function ExplorarPage() {
  const [familiaAtiva, setFamiliaAtiva] = useState<string | null>(null)

  const filtrados = familiaAtiva
    ? perfumes.filter(p => p.familia === familiaAtiva && p.ativo)
    : perfumes.filter(p => p.ativo)

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-10">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-2">Catálogo Completo</p>
          <h1 className="font-serif text-4xl md:text-5xl text-white">Explorar Perfumes</h1>
        </div>

        {/* Pills de filtro */}
        <div className="flex gap-2 flex-wrap mb-10 overflow-x-auto pb-2">
          <button
            onClick={() => setFamiliaAtiva(null)}
            className={`flex-shrink-0 px-4 py-2 rounded-full border text-xs font-sans tracking-wider uppercase transition-all ${
              !familiaAtiva ? 'bg-gold text-noir border-gold' : 'border-gold/30 text-ash hover:border-gold/60 hover:text-white'
            }`}
          >
            Todos
          </button>
          {familias.map(familia => (
            <button
              key={familia}
              onClick={() => setFamiliaAtiva(familia)}
              className={`flex-shrink-0 px-4 py-2 rounded-full border text-xs font-sans tracking-wider uppercase transition-all ${
                familiaAtiva === familia ? 'bg-gold text-noir border-gold' : 'border-gold/30 text-ash hover:border-gold/60 hover:text-white'
              }`}
            >
              {familia}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filtrados.map(perfume => (
            <PerfumeCard key={perfume.id} perfume={perfume} />
          ))}
        </div>

        {filtrados.length === 0 && (
          <p className="text-ash text-center py-20">Nenhum perfume encontrado.</p>
        )}
      </div>
      <WhatsAppButton />
    </div>
  )
}
```

- [ ] **Step 2: Verificar no browser**

Abrir http://localhost:3000/explorar. Verificar:
- Grid com todos os 20 perfumes
- Filtros por família funcionando
- Card com 3D hover no desktop

- [ ] **Step 3: Commit**

```bash
git add src/app/explorar/page.tsx
git commit -m "feat: página /explorar com grid e filtros por família"
```

---

## Task 15: Página /perfume/[slug]

**Files:**
- Create: `src/app/perfume/[slug]/page.tsx`

- [ ] **Step 1: Criar página de detalhe**

Crie `src/app/perfume/[slug]/page.tsx`:

```typescript
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { perfumesBySlug, perfumes } from '@/data/perfumes'
import NotesPyramid from '@/components/NotesPyramid'
import ScrollScene from '@/components/ScrollScene'
import AddToCartButton from '@/components/AddToCartButton'
import WhatsAppButton from '@/components/WhatsAppButton'
import PerfumeCard from '@/components/PerfumeCard'
import type { Metadata } from 'next'

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return Object.keys(perfumesBySlug).map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const perfume = perfumesBySlug[params.slug]
  if (!perfume) return {}
  return {
    title: `${perfume.nome} — ${perfume.marca} | Caballeros Parfum`,
    description: perfume.descricao,
  }
}

export default function PerfumePage({ params }: Props) {
  const perfume = perfumesBySlug[params.slug]
  if (!perfume) notFound()

  const relacionados = perfumes
    .filter(p => p.familia === perfume.familia && p.id !== perfume.id && p.ativo)
    .slice(0, 4)

  return (
    <div className="min-h-screen pt-16">
      {/* Hero do produto */}
      <section className="grid md:grid-cols-2 min-h-[80vh]">
        {/* Imagem */}
        <div className="relative min-h-[50vh] md:min-h-full">
          <Image
            src={perfume.imagemUrl}
            alt={perfume.nome}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-noir/50 hidden md:block" />
        </div>

        {/* Info */}
        <div className="bg-noir px-6 md:px-12 py-12 flex flex-col justify-center">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-2">{perfume.marca}</p>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">{perfume.nome}</h1>
          <p className="text-ash text-xs tracking-widest uppercase mb-6">{perfume.familia}</p>
          <p className="text-white/80 leading-relaxed mb-8 max-w-md">{perfume.descricao}</p>
          <div className="flex items-center gap-4 mb-8">
            <span className="font-serif text-3xl text-white">
              R${perfume.preco.toFixed(2).replace('.', ',')}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <AddToCartButton perfume={perfume} />
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(`Olá! Tenho interesse no ${perfume.marca} ${perfume.nome} — R$${perfume.preco.toFixed(2).replace('.', ',')}.`)}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border border-gold/30 text-gold font-sans text-sm px-6 py-3 rounded-lg hover:bg-gold/10 transition-colors"
            >
              Perguntar via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Pirâmide olfativa */}
      <section className="max-w-2xl mx-auto px-6 py-16">
        <NotesPyramid
          notasTopo={perfume.notasTopo}
          notasCorpo={perfume.notasCorpo}
          notasFundo={perfume.notasFundo}
        />
      </section>

      {/* Relacionados */}
      {relacionados.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 border-t border-gold/10">
          <ScrollScene className="mb-10">
            <h2 className="font-serif text-3xl text-white">Você também pode gostar</h2>
          </ScrollScene>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relacionados.map(p => (
              <ScrollScene key={p.id} animation="fadeUp">
                <PerfumeCard perfume={p} />
              </ScrollScene>
            ))}
          </div>
        </section>
      )}

      {/* Botão WhatsApp fixo mobile */}
      <WhatsAppButton />

      {/* CTA mobile fixo */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-noir/95 backdrop-blur border-t border-gold/10 p-4">
        <AddToCartButton perfume={perfume} fullWidth />
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Criar AddToCartButton**

Crie `src/components/AddToCartButton.tsx`:

```typescript
'use client'

import { useState } from 'react'
import { Perfume } from '@/types'
import { useCart } from '@/context/CartContext'

interface Props { perfume: Perfume; fullWidth?: boolean }

export default function AddToCartButton({ perfume, fullWidth }: Props) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  function handleAdd() {
    addToCart(perfume)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <button
      onClick={handleAdd}
      className={`bg-gold text-noir font-sans font-semibold py-3 px-6 rounded-lg hover:bg-yellow-400 transition-all ${fullWidth ? 'w-full' : ''}`}
    >
      {added ? '✓ Adicionado!' : 'Adicionar ao Carrinho'}
    </button>
  )
}
```

- [ ] **Step 3: Verificar no browser**

Abrir http://localhost:3000/perfume/lattafa-oud-for-glory. Verificar:
- Imagem do produto
- Pirâmide olfativa animando ao scrollar
- Botão "Adicionar ao Carrinho" com feedback "✓ Adicionado!"
- Perfumes relacionados

- [ ] **Step 4: Commit**

```bash
git add src/app/perfume/[slug]/page.tsx src/components/AddToCartButton.tsx
git commit -m "feat: página de detalhe do perfume com pirâmide olfativa"
```

---

## Task 16: Página /colecoes

**Files:**
- Create: `src/app/colecoes/page.tsx`

- [ ] **Step 1: Criar página coleções**

Crie `src/app/colecoes/page.tsx`:

```typescript
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { perfumes } from '@/data/perfumes'
import PerfumeCard from '@/components/PerfumeCard'
import ScrollScene from '@/components/ScrollScene'

const marcas = [...new Set(perfumes.map(p => p.marca))]

const marcaImages: Record<string, string> = {
  'Lattafa': 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=800&q=80',
  'Al Haramain': 'https://images.unsplash.com/photo-1588514912908-e8bc2cf6c6c7?w=800&q=80',
  'Ajmal': 'https://images.unsplash.com/photo-1594913656049-5b6d779b9b4e?w=800&q=80',
  'Swiss Arabian': 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80',
  'Rasasi': 'https://images.unsplash.com/photo-1548695607-9c73430547ac?w=800&q=80',
  'Armaf': 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&q=80',
}

export default function ColecoesPage() {
  const [marcaAtiva, setMarcaAtiva] = useState<string | null>(null)

  const produtosMarca = marcaAtiva
    ? perfumes.filter(p => p.marca === marcaAtiva && p.ativo)
    : []

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-2">Por Marca</p>
          <h1 className="font-serif text-4xl md:text-5xl text-white">Coleções</h1>
        </div>

        {/* Grid de marcas */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
          {marcas.map((marca, i) => (
            <ScrollScene key={marca} animation="fadeUp" delay={i * 0.08}>
              <button
                onClick={() => setMarcaAtiva(marcaAtiva === marca ? null : marca)}
                className={`relative overflow-hidden rounded-2xl aspect-video border transition-all ${
                  marcaAtiva === marca ? 'border-gold' : 'border-gold/10 hover:border-gold/30'
                }`}
              >
                <Image
                  src={marcaImages[marca] ?? perfumes.find(p => p.marca === marca)?.imagemUrl ?? ''}
                  alt={marca} fill className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-noir/90 to-noir/30 transition-opacity ${
                  marcaAtiva === marca ? 'opacity-90' : 'opacity-70'
                }`} />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <h2 className="font-serif text-xl md:text-2xl text-white">{marca}</h2>
                  <p className="text-gold text-xs tracking-widest mt-1">
                    {perfumes.filter(p => p.marca === marca).length} perfumes
                  </p>
                </div>
              </button>
            </ScrollScene>
          ))}
        </div>

        {/* Produtos da marca selecionada */}
        {marcaAtiva && (
          <div>
            <ScrollScene className="mb-8">
              <h2 className="font-serif text-3xl text-white">{marcaAtiva}</h2>
            </ScrollScene>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {produtosMarca.map(p => (
                <ScrollScene key={p.id} animation="fadeUp">
                  <PerfumeCard perfume={p} />
                </ScrollScene>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/colecoes/page.tsx
git commit -m "feat: página /colecoes por marca com grid expansível"
```

---

## Task 17: Páginas /sobre e /contato

**Files:**
- Create: `src/app/sobre/page.tsx`
- Create: `src/app/contato/page.tsx`

- [ ] **Step 1: Criar /sobre**

Crie `src/app/sobre/page.tsx`:

```typescript
import Image from 'next/image'
import Link from 'next/link'
import ScrollScene from '@/components/ScrollScene'

export default function SobrePage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-end overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1541643600914-78b084683702?w=1600&q=80"
          alt="Caballeros Parfum" fill className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/50 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3">Nossa História</p>
          <h1 className="font-serif text-5xl md:text-6xl text-white">Caballeros Parfum</h1>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="max-w-3xl mx-auto px-6 py-20 flex flex-col gap-16">
        <ScrollScene>
          <h2 className="font-serif text-3xl text-white mb-6">A origem da curadoria</h2>
          <p className="text-ash leading-relaxed text-lg">
            Nascemos da paixão pelos perfumes árabes — aqueles que carregam séculos de cultura, especiarias e tradição do Oriente Médio. Cada frasco que selecionamos conta uma história.
          </p>
        </ScrollScene>

        <ScrollScene animation="slideLeft">
          <div className="border-l-2 border-gold pl-8">
            <h2 className="font-serif text-3xl text-white mb-6">Nossa curadoria</h2>
            <p className="text-ash leading-relaxed text-lg">
              Trabalhamos diretamente com as melhores casas árabes: Lattafa, Al Haramain, Ajmal, Swiss Arabian, Rasasi e Armaf. Cada produto é cuidadosamente selecionado por autenticidade e qualidade.
            </p>
          </div>
        </ScrollScene>

        <ScrollScene>
          <h2 className="font-serif text-3xl text-white mb-6">Compromisso</h2>
          <p className="text-ash leading-relaxed text-lg">
            Acreditamos que um bom perfume é mais do que uma fragrância — é uma experiência sensorial completa. Por isso, levamos a sério cada detalhe, desde a autenticidade dos produtos até o atendimento pelo WhatsApp.
          </p>
        </ScrollScene>

        <ScrollScene className="text-center">
          <Link href="/explorar"
            className="inline-flex items-center gap-2 bg-gold text-noir font-sans font-semibold px-8 py-4 rounded-full hover:bg-yellow-400 transition-colors">
            Explorar a Coleção →
          </Link>
        </ScrollScene>
      </section>
    </div>
  )
}
```

- [ ] **Step 2: Criar /contato**

Crie `src/app/contato/page.tsx`:

```typescript
import ScrollScene from '@/components/ScrollScene'

export default function ContatoPage() {
  const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-6">
        <ScrollScene className="mb-12">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-2">Fale Conosco</p>
          <h1 className="font-serif text-4xl md:text-5xl text-white">Contato</h1>
        </ScrollScene>

        <ScrollScene animation="fadeUp" className="space-y-8">
          <div className="bg-smoke border border-gold/10 rounded-2xl p-8">
            <h2 className="font-serif text-2xl text-white mb-4">Atendimento via WhatsApp</h2>
            <p className="text-ash leading-relaxed mb-6">
              Tire dúvidas sobre produtos, disponibilidade e faça seu pedido diretamente pelo WhatsApp. Respondemos rapidamente!
            </p>
            <a
              href={whatsappUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gold text-noir font-sans font-semibold px-8 py-4 rounded-full hover:bg-yellow-400 transition-colors"
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.553 4.116 1.523 5.845L.057 23.882l6.197-1.438A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.66-.499-5.193-1.371l-.371-.218-3.878.9.947-3.766-.24-.387A10 10 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              Abrir WhatsApp
            </a>
          </div>

          <div className="bg-smoke border border-gold/10 rounded-2xl p-8">
            <h2 className="font-serif text-2xl text-white mb-4">Instagram</h2>
            <p className="text-ash mb-4">Siga-nos para novidades, lançamentos e dicas de fragrâncias.</p>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
              className="text-gold hover:underline font-sans text-sm">
              @caballerosparfum →
            </a>
          </div>
        </ScrollScene>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/sobre/page.tsx src/app/contato/page.tsx
git commit -m "feat: páginas /sobre e /contato"
```

---

## Task 18: Shells de Auth e Admin

**Files:**
- Create: `src/app/entrar/page.tsx`
- Create: `src/app/cadastrar/page.tsx`
- Create: `src/app/conta/page.tsx`
- Create: `src/app/conta/pedidos/page.tsx`
- Create: `src/app/admin/page.tsx`

- [ ] **Step 1: Criar shells**

Crie `src/app/entrar/page.tsx`:

```typescript
export default function EntrarPage() {
  return (
    <div className="min-h-screen pt-24 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-smoke border border-gold/10 rounded-2xl p-8 text-center">
        <h1 className="font-serif text-3xl text-white mb-3">Entrar</h1>
        <p className="text-ash">Login disponível em breve.</p>
      </div>
    </div>
  )
}
```

Crie `src/app/cadastrar/page.tsx`:

```typescript
export default function CadastrarPage() {
  return (
    <div className="min-h-screen pt-24 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-smoke border border-gold/10 rounded-2xl p-8 text-center">
        <h1 className="font-serif text-3xl text-white mb-3">Cadastrar</h1>
        <p className="text-ash">Cadastro disponível em breve.</p>
      </div>
    </div>
  )
}
```

Crie `src/app/conta/page.tsx`:

```typescript
export default function ContaPage() {
  return (
    <div className="min-h-screen pt-24 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-smoke border border-gold/10 rounded-2xl p-8 text-center">
        <h1 className="font-serif text-3xl text-white mb-3">Minha Conta</h1>
        <p className="text-ash">Disponível após login.</p>
      </div>
    </div>
  )
}
```

Crie `src/app/conta/pedidos/page.tsx`:

```typescript
export default function PedidosPage() {
  return (
    <div className="min-h-screen pt-24 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-smoke border border-gold/10 rounded-2xl p-8 text-center">
        <h1 className="font-serif text-3xl text-white mb-3">Meus Pedidos</h1>
        <p className="text-ash">Disponível após login.</p>
      </div>
    </div>
  )
}
```

Crie `src/app/admin/page.tsx`:

```typescript
export default function AdminPage() {
  return (
    <div className="min-h-screen pt-24 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-smoke border border-gold/10 rounded-2xl p-8 text-center">
        <h1 className="font-serif text-3xl text-white mb-3">Admin</h1>
        <p className="text-ash">Disponível na fase 5.</p>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/entrar/page.tsx src/app/cadastrar/page.tsx src/app/conta/page.tsx src/app/conta/pedidos/page.tsx src/app/admin/page.tsx
git commit -m "feat: shells de auth, conta e admin"
```

---

## Task 19: Verificação Final

**Files:** Nenhum arquivo novo — verificação de build e funcionamento.

- [ ] **Step 1: Rodar build de produção**

```bash
npm run build
```

Esperado: zero erros TypeScript. Avisos de `<img>` vs `<Image>` podem aparecer mas são não-bloqueantes.

- [ ] **Step 2: Testar fluxo completo**

```bash
npm run dev
```

Verificar manualmente:
1. http://localhost:3000 — hero animado, destaque, marcas
2. http://localhost:3000/explorar — grid com filtros
3. http://localhost:3000/perfume/lattafa-oud-for-glory — detalhe, pirâmide, relacionados
4. http://localhost:3000/colecoes — marcas com grid expansível
5. http://localhost:3000/sobre — parallax, texto
6. http://localhost:3000/contato — links WhatsApp
7. Adicionar perfume → abrir CartDrawer → finalizar (link WhatsApp deve abrir com mensagem correta)
8. No mobile (DevTools): bottom sheet do cart, botão WhatsApp fixo, CTA fixo na homepage

- [ ] **Step 3: Commit final**

```bash
git add .
git commit -m "feat: fase 1 completa — frontend Caballeros Parfum com mock data"
```

---

## Checklist de Cobertura da Spec

- [x] Paleta Noir & Gold configurada no Tailwind
- [x] Tipografia DM Serif Display + Inter
- [x] Logo integrado no Header
- [x] CartContext com localStorage
- [x] Checkout WhatsApp funcional
- [x] Header transparente → sólido com GSAP
- [x] Homepage com hero Spline (desktop) e ScrollScene
- [x] /explorar com filtros por família e grid masonry
- [x] /perfume/[slug] com NotesPyramid e relacionados
- [x] /colecoes por marca
- [x] /sobre e /contato
- [x] CartDrawer bottom sheet mobile / sidebar desktop
- [x] WhatsAppButton fixo mobile
- [x] Shells de auth e admin para fases futuras
- [x] Build sem erros TypeScript
