import { notFound } from 'next/navigation'
import Image from 'next/image'
import { perfumesBySlug, perfumes } from '@/data/perfumes'
import NotesPyramid from '@/components/NotesPyramid'
import ScrollScene from '@/components/ScrollScene'
import AddToCartButton from '@/components/AddToCartButton'
import StickyCartBar from '@/components/StickyCartBar'
import PerfumeCard from '@/components/PerfumeCard'
import Breadcrumb from '@/components/Breadcrumb'
import AccordBars from '@/components/AccordBars'
import type { Accord } from '@/components/AccordBars'
import type { Metadata } from 'next'
import type { Perfume } from '@/types'

const brandSlug = (marca: string) => marca.toLowerCase().replace(/\s+/g, '-')

const BRAND_META: Record<string, { css: string; label: string; origin: string }> = {
  'Lattafa':                    { css: 'brand-lattafa',          label: 'L',   origin: 'Dubai, EAU'      },
  'Al Haramain':                { css: 'brand-al-haramain',      label: 'AH',  origin: 'Arábia Saudita'  },
  'Ajmal':                      { css: 'brand-ajmal',            label: 'A',   origin: 'Dubai, EAU'      },
  'Swiss Arabian':              { css: 'brand-swiss-arabian',    label: 'SA',  origin: 'Dubai, EAU'      },
  'Rasasi':                     { css: 'brand-rasasi',           label: 'R',   origin: 'Dubai, EAU'      },
  'Armaf':                      { css: 'brand-armaf',            label: 'AR',  origin: 'Dubai, EAU'      },
  'Maison Alhambra':            { css: 'brand-maison-alhambra',  label: 'MA',  origin: 'Emirados Árabes' },
  'Afnan':                      { css: 'brand-afnan',            label: 'AF',  origin: 'Dubai, EAU'      },
  'Ard Al Zaafaran':            { css: 'brand-ard-al-zaafaran',  label: 'AZ',  origin: 'Dubai, EAU'      },
  'Zimaya':                     { css: 'brand-zimaya',           label: 'Z',   origin: 'Emirados Árabes' },
  'Xerjoff':                    { css: 'brand-xerjoff',          label: 'XJ',  origin: 'Itália'          },
  'Nishane':                    { css: 'brand-nishane',          label: 'N',   origin: 'Turquia'         },
  'Parfums de Marly':           { css: 'brand-parfums-de-marly', label: 'PM',  origin: 'França'          },
  'Maison Francis Kurkdjian':   { css: 'brand-mfk',              label: 'MFK', origin: 'França'          },
  'Creed':                      { css: 'brand-creed',            label: 'C',   origin: 'Londres'         },
  'Initio':                     { css: 'brand-initio',           label: 'I',   origin: 'França'          },
  'Kilian':                     { css: 'brand-kilian',           label: 'K',   origin: 'Paris'           },
  'Amouage':                    { css: 'brand-amouage',          label: 'AM',  origin: 'Omã'             },
}

function deriveAccords(perfume: Perfume): Accord[] {
  const notes = [...perfume.notasTopo, ...perfume.notasCorpo, ...perfume.notasFundo].map(n => n.toLowerCase())
  const result: Accord[] = []

  const familyPrimary: Record<string, Accord> = {
    'Oriental':   { label: 'oriental',   percent: 95, color: '#C9A84C' },
    'Floral':     { label: 'floral',     percent: 95, color: '#E879AA' },
    'Amadeirado': { label: 'amadeirado', percent: 95, color: '#A0714A' },
    'Especiado':  { label: 'especiado',  percent: 90, color: '#C44A00' },
    'Cítrico':    { label: 'cítrico',    percent: 95, color: '#9AB822' },
    'Frutal':     { label: 'frutal',     percent: 95, color: '#D06010' },
  }
  if (familyPrimary[perfume.familia]) result.push(familyPrimary[perfume.familia])

  const noteMap: Array<{ test: RegExp; label: string; percent: number; color: string }> = [
    { test: /oud/,                                                  label: 'oud',          percent: 88, color: '#6B3A1A' },
    { test: /âmbar/,                                                label: 'âmbar',        percent: 82, color: '#C9A84C' },
    { test: /almíscar/,                                             label: 'almíscarado',  percent: 75, color: '#8888AA' },
    { test: /baunilha/,                                             label: 'doce',         percent: 70, color: '#D4822A' },
    { test: /incenso/,                                              label: 'incenso',      percent: 65, color: '#888855' },
    { test: /rosa|jasmim|íris|peônia|flor/,                         label: 'floral',       percent: 78, color: '#E879AA' },
    { test: /açafrão|cardamomo|pimenta|canela|noz-moscada/,         label: 'especiado',    percent: 72, color: '#C44A00' },
    { test: /cedro|sândalo|patchouli|vetiver|madeira|bétula|guaiacol/, label: 'amadeirado', percent: 68, color: '#A0714A' },
    { test: /bergamota|limão|mandarina|laranja|toranja/,             label: 'cítrico',      percent: 62, color: '#9AB822' },
    { test: /couro/,                                                label: 'couro',        percent: 60, color: '#7A4A28' },
    { test: /tabaco|café/,                                          label: 'fumado',       percent: 55, color: '#7A6840' },
    { test: /abacaxi|pêssego|maçã|groselha|frutas|litchi|cassis/,   label: 'frutal',       percent: 65, color: '#D06010' },
    { test: /resinas|benjoim/,                                      label: 'balsâmico',    percent: 58, color: '#8B6820' },
    { test: /menta|hortelã|alecrim|lavanda|sálvia/,                 label: 'aromático',    percent: 58, color: '#5A8A5A' },
  ]

  for (const { test, label, percent, color } of noteMap) {
    if (notes.some(n => test.test(n)) && !result.some(a => a.label === label)) {
      result.push({ label, percent, color })
    }
  }

  return result.sort((a, b) => b.percent - a.percent).slice(0, 8)
}

function derivePerformance(perfume: Perfume) {
  const notes = [...perfume.notasTopo, ...perfume.notasCorpo, ...perfume.notasFundo].map(n => n.toLowerCase())

  let longevidade = 3
  if (notes.some(n => /oud|civet/.test(n))) longevidade = 5
  else if (notes.some(n => /âmbar|almíscar|baunilha|resinas|patchouli/.test(n))) longevidade = 4

  let sillage = 3
  if (notes.some(n => /oud|incenso/.test(n))) sillage = 5
  else if (notes.some(n => /âmbar|açafrão|pimenta|cardamomo/.test(n))) sillage = 4

  const isDark = ['Oriental', 'Especiado'].includes(perfume.familia) ||
    notes.some(n => /oud|incenso|âmbar|couro|tabaco/.test(n))
  const isLight = ['Cítrico', 'Floral', 'Frutal'].includes(perfume.familia) &&
    !notes.some(n => /oud|incenso/.test(n))
  const ocasiao = isLight ? 'Diurno' : isDark ? 'Noturno' : 'Versátil'

  const isMasc = perfume.nome.toLowerCase().includes('homme') ||
    (notes.some(n => /couro|tabaco|vetiver/.test(n)) && !notes.some(n => /rosa|jasmim|peônia/.test(n)))
  const isFem  = notes.some(n => /rosa|jasmim|peônia|íris/.test(n)) && !notes.some(n => /couro|tabaco/.test(n))
  const genero = isMasc ? 'Masculino' : isFem ? 'Feminino' : 'Unissex'

  const longevidadeLabel = ['', 'Fraca', 'Moderada', 'Boa', 'Excelente', 'Extrema'][longevidade]
  const sillageLabel     = ['', 'Íntima', 'Moderada', 'Boa', 'Forte', 'Explosiva'][sillage]
  const barW = (v: number) => (['w-1/5', 'w-2/5', 'w-3/5', 'w-4/5', 'w-full'] as const)[Math.min(v, 5) - 1]

  return { longevidade, sillage, ocasiao, genero, longevidadeLabel, sillageLabel, barW }
}

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

  const BASE = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://caballerosparfum.com.br'
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: perfume.nome,
    brand: { '@type': 'Brand', name: perfume.marca },
    description: perfume.descricao,
    image: perfume.imagemUrl,
    url: `${BASE}/perfume/${perfume.slug}`,
    category: perfume.familia,
    offers: {
      '@type': 'Offer',
      price: perfume.preco,
      priceCurrency: 'BRL',
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: 'Caballeros Parfum' },
    },
  }

  const porFamilia   = perfumes.filter(p => p.familia === perfume.familia && p.id !== perfume.id && p.ativo)
  const porMarca     = perfumes.filter(p => p.marca === perfume.marca && p.id !== perfume.id && p.ativo && !porFamilia.some(r => r.id === p.id))
  const relacionados = [...porFamilia, ...porMarca].slice(0, 4)

  const whatsappMsg = encodeURIComponent(
    `Olá! Tenho interesse no ${perfume.marca} ${perfume.nome} — R$${perfume.preco.toFixed(2).replace('.', ',')}.`
  )
  const whatsappHref = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${whatsappMsg}`

  const [reais, centavos] = perfume.preco.toFixed(2).split('.')
  const brandMeta  = BRAND_META[perfume.marca]
  const accords    = deriveAccords(perfume)
  const perf       = derivePerformance(perfume)

  return (
    <div className="min-h-screen pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-2">
        <Breadcrumb crumbs={[
          { label: 'Coleções', href: '/colecoes' },
          { label: perfume.marca, href: `/colecoes/${brandSlug(perfume.marca)}` },
          { label: perfume.nome },
        ]} />
      </div>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="grid md:grid-cols-[55%,45%] min-h-[88vh] overflow-hidden">

        {/* Image panel — uses brand gradient */}
        <div
          className={`relative flex items-center justify-center overflow-hidden min-h-[65vw] md:min-h-full py-16
            ${brandMeta?.css ?? 'bg-[#0d0d0d]'}`}
          data-surface="dark"
        >
          {/* Ghost monogram */}
          {brandMeta && (
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              font-serif leading-none text-gold/[0.04] select-none pointer-events-none
              text-[14rem] md:text-[20rem]">
              {brandMeta.label}
            </span>
          )}

          {/* Radial glow */}
          <div className="absolute inset-0
            bg-[radial-gradient(ellipse_65%_65%_at_50%_52%,rgba(201,168,76,0.1),transparent)]" />

          {/* Bottle */}
          <div className="relative w-[270px] sm:w-[320px] md:w-[370px] aspect-[3/4] z-10">
            <Image
              src={perfume.imagemUrl}
              alt={perfume.nome}
              fill
              quality={90}
              className="object-contain drop-shadow-[0_24px_80px_rgba(0,0,0,0.9)]"
              priority
              sizes="(max-width: 768px) 320px, 370px"
            />
          </div>

          {/* Bottom-left family label */}
          <div className="absolute bottom-7 left-7 select-none pointer-events-none">
            <p className="text-gold/20 text-[8px] tracking-[0.4em] uppercase font-mono">Família</p>
            <p className="text-gold/20 text-xs font-serif mt-0.5">{perfume.familia}</p>
          </div>
        </div>

        {/* Info panel */}
        <div className="bg-noir px-6 md:px-10 lg:px-14 py-12 md:py-16 flex flex-col justify-center">

          {/* Brand badge */}
          {brandMeta ? (
            <div className="flex items-center gap-3 mb-7">
              <div
                className={`${brandMeta.css} w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border border-gold/10`}
                data-surface="dark"
              >
                <span className="font-serif text-gold text-[11px] leading-none">{brandMeta.label}</span>
              </div>
              <div>
                <p className="text-gold text-[10px] tracking-[0.35em] uppercase leading-none">{perfume.marca}</p>
                <p className="text-ash/40 text-[9px] tracking-wider mt-1">{brandMeta.origin}</p>
              </div>
            </div>
          ) : (
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-7">{perfume.marca}</p>
          )}

          <h1 className="font-serif text-4xl md:text-5xl text-white leading-[0.93] mb-3">
            {perfume.nome}
          </h1>
          <p className="text-gold/35 text-[10px] tracking-[0.45em] uppercase mb-7">{perfume.familia}</p>

          <p className="text-white/65 leading-relaxed mb-8 max-w-md text-[0.9rem]">
            {perfume.descricao}
          </p>

          {/* Price */}
          <div className="mb-8">
            <span className="text-gold/45 text-[8px] tracking-[0.4em] uppercase block mb-1.5">A partir de</span>
            <span className="font-serif text-4xl text-gold leading-none">R${reais}</span>
            <span className="font-serif text-xl text-gold/55">,{centavos}</span>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <AddToCartButton perfume={perfume} />
            <a
              href={whatsappHref}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border border-gold/30 text-gold
                font-sans text-sm px-6 py-3 rounded-lg hover:bg-gold/10 transition-colors duration-200"
            >
              Perguntar via WhatsApp
            </a>
          </div>

          {/* Quick performance strip */}
          <div className="border-t border-white/[0.06] pt-7 grid grid-cols-3 gap-4">
            <div>
              <p className="text-ash/35 text-[8px] tracking-[0.3em] uppercase mb-2">Longevidade</p>
              <div className="flex gap-1 mb-1">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className={`h-1 flex-1 rounded-full
                    ${i <= perf.longevidade ? 'bg-gold' : 'bg-white/[0.08]'}`} />
                ))}
              </div>
              <p className="text-white/40 text-[9px]">{perf.longevidadeLabel}</p>
            </div>
            <div>
              <p className="text-ash/35 text-[8px] tracking-[0.3em] uppercase mb-2">Projeção</p>
              <div className="flex gap-1 mb-1">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className={`h-1 flex-1 rounded-full
                    ${i <= perf.sillage ? 'bg-gold' : 'bg-white/[0.08]'}`} />
                ))}
              </div>
              <p className="text-white/40 text-[9px]">{perf.sillageLabel}</p>
            </div>
            <div>
              <p className="text-ash/35 text-[8px] tracking-[0.3em] uppercase mb-2">Ocasião</p>
              <p className="font-serif text-white/80 text-sm">{perf.ocasiao}</p>
              <p className="text-white/35 text-[9px] mt-0.5">{perf.genero}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ACORDES + PERFIL ──────────────────────────────────────────────── */}
      <section className="border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid md:grid-cols-2 gap-12 lg:gap-20">

          {/* Acordes principais */}
          <div>
            <div className="flex items-baseline gap-3 mb-2">
              <h2 className="font-serif text-2xl text-white">Acordes Principais</h2>
            </div>
            <p className="text-ash/35 text-[10px] tracking-[0.3em] uppercase mb-7">
              Perfil olfativo percebido
            </p>
            <AccordBars accords={accords} />
          </div>

          {/* Perfil da fragrância */}
          <div>
            <h2 className="font-serif text-2xl text-white mb-2">Perfil da Fragrância</h2>
            <p className="text-ash/35 text-[10px] tracking-[0.3em] uppercase mb-7">
              Características de performance
            </p>

            <div className="space-y-5 mb-8">
              {/* Longevidade bar */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/45 text-[10px] tracking-[0.25em] uppercase">Longevidade</span>
                  <span className="text-gold/55 text-xs">{perf.longevidadeLabel}</span>
                </div>
                <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r from-gold/60 to-gold rounded-full ${perf.barW(perf.longevidade)}`} />
                </div>
              </div>

              {/* Projeção bar */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/45 text-[10px] tracking-[0.25em] uppercase">Projeção / Sillage</span>
                  <span className="text-gold/55 text-xs">{perf.sillageLabel}</span>
                </div>
                <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r from-gold/60 to-gold rounded-full ${perf.barW(perf.sillage)}`} />
                </div>
              </div>
            </div>

            {/* Occasion + Gender pills */}
            <div className="grid grid-cols-2 gap-3">
              <div className="border border-white/[0.07] rounded-2xl p-5 text-center">
                <p className="text-ash/35 text-[8px] tracking-[0.35em] uppercase mb-2">Ocasião</p>
                <p className="font-serif text-white text-xl leading-none">{perf.ocasiao}</p>
              </div>
              <div className="border border-white/[0.07] rounded-2xl p-5 text-center">
                <p className="text-ash/35 text-[8px] tracking-[0.35em] uppercase mb-2">Público</p>
                <p className="font-serif text-white text-xl leading-none">{perf.genero}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PIRÂMIDE OLFATIVA ─────────────────────────────────────────────── */}
      <section className="max-w-2xl mx-auto px-6 py-4">
        <NotesPyramid
          notasTopo={perfume.notasTopo}
          notasCorpo={perfume.notasCorpo}
          notasFundo={perfume.notasFundo}
        />
      </section>

      {/* ── RELACIONADOS ─────────────────────────────────────────────────── */}
      {relacionados.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 border-t border-gold/10">
          <ScrollScene className="mb-10">
            <h2 className="font-serif text-3xl text-white">Você também pode gostar</h2>
          </ScrollScene>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relacionados.map(p => (
              <ScrollScene key={p.id} animation="fadeUp" className="h-full">
                <PerfumeCard perfume={p} />
              </ScrollScene>
            ))}
          </div>
        </section>
      )}

      <StickyCartBar perfume={perfume} />
    </div>
  )
}
