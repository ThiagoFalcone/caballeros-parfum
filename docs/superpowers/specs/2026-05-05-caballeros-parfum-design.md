# Caballeros Parfum — Design Spec

**Data:** 2026-05-05
**Status:** Aprovado

---

## Visão Geral

Loja de perfumes árabes com experiência imersiva mobile-first. Checkout via WhatsApp. Layout cinematográfico com scroll GSAP e frasco Spline no hero. Build em fases: frontend com mock data primeiro, refinamento, depois integração Supabase.

---

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Framework | Next.js 14 (App Router) |
| Linguagem | TypeScript |
| Estilo | Tailwind CSS (mobile-first) |
| Animação | GSAP + ScrollTrigger |
| 3D Hero | Spline (template da comunidade) |
| 3D Produtos | CSS 3D + imagens reais dos frascos |
| Banco | Supabase (PostgreSQL) — fase 3 |
| Deploy | Vercel |

---

## Identidade Visual

- **Paleta:** Noir & Gold
  - `noir: #0a0a0a` — fundo principal
  - `gold: #C9A84C` — destaque, botões, bordas
  - `smoke: #1a1a1a` — cards, superfícies
  - `ash: #888888` — texto secundário
- **Tipografia:** DM Serif Display (headings) + Inter (body/UI)
- **Logo:** `Logo-Caballeros.png` — monograma CP com coroa, fundo preto/dourado

---

## Fases de Implementação

### Fase 1 — Frontend + Mock Data *(prioridade)*
- Next.js 14 configurado com TypeScript e Tailwind
- `src/data/perfumes.ts` com ~30 perfumes tipados (mock)
- Todas as páginas principais com UI completa
- Animações GSAP + ScrollTrigger funcionando
- Spline hero na homepage (desktop)
- CartContext com localStorage (`caballerosCart`)
- Checkout WhatsApp funcional desde o início

### Fase 2 — Refinamento
- Usuário testa e decide o que manter/remover
- Ajustes de layout, animações, UX

### Fase 3 — Supabase + Seed
- Configuração Supabase (DB + Storage)
- Seed script: `scripts/data/perfumes.json` com 50+ perfumes reais
- Substituição do mock data pelas queries Supabase
- Merge de carrinho localStorage → Supabase ao fazer login

### Fase 4 — Auth + Conta
- Login/cadastro via Supabase Auth
- Middleware Next.js protege `/conta/*` e `/admin/*`
- Página de perfil e histórico de pedidos
- Carrinho persistido na tabela `carrinhos`

### Fase 5 — Admin
- Dashboard: total pedidos, receita, produtos ativos
- CRUD produtos: ativar/desativar, editar preço
- Gestão de pedidos com filtro por status
- Role admin atribuída via Supabase metadata: `user_metadata.role = 'admin'`
- Middleware verifica role antes de permitir acesso a `/admin/*`

---

## Arquitetura de Pastas

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                # Homepage
│   ├── explorar/page.tsx       # Catálogo + filtros
│   ├── perfume/[slug]/page.tsx # Detalhe
│   ├── colecoes/page.tsx       # Por marca
│   ├── sobre/page.tsx
│   ├── contato/page.tsx
│   ├── entrar/page.tsx         # Auth (fase 4)
│   ├── cadastrar/page.tsx      # Auth (fase 4)
│   ├── conta/
│   │   ├── page.tsx
│   │   └── pedidos/page.tsx
│   └── admin/
│       ├── page.tsx
│       ├── perfumes/page.tsx
│       └── pedidos/page.tsx
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── CartDrawer.tsx
│   ├── PerfumeCard.tsx
│   ├── NotesPyramid.tsx
│   ├── ScrollScene.tsx
│   └── WhatsAppButton.tsx
├── context/
│   └── CartContext.tsx
├── data/
│   └── perfumes.ts             # Mock data (fase 1)
├── lib/
│   ├── supabase.ts             # (fase 3)
│   └── whatsapp.ts
└── types/
    └── index.ts
```

---

## Banco de Dados (Supabase — Fase 3)

```sql
perfumes (
  id          uuid primary key,
  slug        text unique,
  nome        text,
  marca       text,
  familia     text,
  preco       decimal,
  descricao   text,
  notas_topo  text[],
  notas_corpo text[],
  notas_fundo text[],
  imagem_url  text,
  ativo       boolean default true,
  created_at  timestamptz
)

pedidos (
  id          uuid primary key,
  usuario_id  uuid references auth.users,
  itens       jsonb,
  total       decimal,
  whatsapp_msg text,
  status      text default 'pendente',
  created_at  timestamptz
)

carrinhos (
  id          uuid primary key,
  usuario_id  uuid references auth.users unique,
  itens       jsonb,
  updated_at  timestamptz
)
```

---

## Seed Script (Fase 3)

- **Arquivo:** `scripts/data/perfumes.json` — 50+ perfumes árabes reais escritos como parte do código (Lattafa, Al Haramain, Ajmal, Swiss Arabian, Rasasi, Armaf)
- **Execução:** `npm run seed`
- Insere registros no Supabase + faz upload de imagens para Storage
- Zero cadastro manual pelo usuário

---

## Páginas Detalhadas

### `/` Homepage
- Hero fullscreen: Spline (desktop) / logo animado CSS (mobile)
- Header transparente → `#0a0a0a` com borda gold ao scrollar (GSAP)
- Seção "Em Destaque": 4 perfumes com ScrollScene GSAP
- CTA fixo mobile "Ver Coleção →"

### `/explorar`
- Mobile: carrossel horizontal swipeable
- Desktop: grid masonry com hover CSS 3D
- Pills de filtro: Oriental · Floral · Amadeirado · Cítrico · Especiado
- Card: imagem + nome + nota principal + preço

### `/perfume/[slug]`
- Imagem grande com parallax CSS
- NotesPyramid animada (SVG + GSAP ScrollTrigger)
- Descrição storytelling
- Perfumes relacionados
- Botão "Comprar via WhatsApp" fixo no rodapé mobile

### `/colecoes`
- Grid por marca com foto editorial
- Filtro por família olfativa

---

## Componentes Críticos

### Header.tsx
- Logo `Logo-Caballeros.png` à esquerda
- Transparente → sólido ao scrollar (GSAP)
- Hamburger no mobile, nav horizontal no desktop
- Ícone carrinho com badge de quantidade

### NotesPyramid.tsx
- SVG de triângulo dividido em 3 camadas
- Topo / Corpo / Fundo revelados via GSAP ScrollTrigger
- Notas aparecem com fade + translateY

### ScrollScene.tsx
- Wrapper GSAP reutilizável
- Perfumes entram em cena com scale + opacidade ao scrollar

### CartDrawer.tsx
- Bottom sheet mobile / sidebar desktop
- Lista de itens com quantidade editável
- Subtotal + botão "Finalizar via WhatsApp"

### WhatsAppButton.tsx
- `fixed bottom-4 right-4` no mobile
- Abre link WhatsApp com carrinho formatado

---

## CartContext

```typescript
// src/context/CartContext.tsx
interface CartContextType {
  items: CartItem[]
  addToCart: (perfume: Perfume, quantity?: number) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  checkout: () => void  // gera link WhatsApp e abre nova aba
}
```

Persiste em `localStorage` com chave `caballerosCart`. Fase 1 e fase 3 usam a mesma interface — só muda a fonte de dados por baixo.

---

## Checkout WhatsApp

```
Olá! Gostaria de fazer um pedido:

🧴 Lattafa Oud For Glory × 1 — R$189,00
🧴 Al Haramain Amber Oud × 2 — R$298,00

💰 Total: R$487,00
```

Link: `https://wa.me/{NEXT_PUBLIC_WHATSAPP_NUMBER}?text=...`

---

## Tipos TypeScript

```typescript
// src/types/index.ts
interface Perfume {
  id: string
  slug: string
  nome: string
  marca: string
  familia: 'Oriental' | 'Floral' | 'Amadeirado' | 'Cítrico' | 'Especiado'
  preco: number
  descricao: string
  notasTopo: string[]
  notasCorpo: string[]
  notasFundo: string[]
  imagemUrl: string
  ativo: boolean
}

interface CartItem {
  perfume: Perfume
  quantidade: number
}
```

---

## Variáveis de Ambiente

```env
# WhatsApp (necessário desde fase 1)
NEXT_PUBLIC_WHATSAPP_NUMBER=5511999999999

# Supabase (fase 3)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

---

## Mobile-First

| Elemento | Mobile | Desktop |
|----------|--------|---------|
| Hero 3D | Logo animado CSS | Spline embed |
| Catálogo | Scroll horizontal swipe | Grid masonry |
| CartDrawer | Bottom sheet | Sidebar lateral |
| Header | Hamburger | Nav horizontal |
| WhatsApp btn | Fixed bottom-right | Integrado no layout |
| Tailwind | Base styles | `md:` e `lg:` overrides |

---

## Fora do Escopo

- Pagamento online (Stripe/MercadoPago)
- Blog/conteúdo editorial
- App mobile nativo
- Analytics
- Internacionalização
