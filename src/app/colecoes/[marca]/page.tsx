import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { perfumes } from '@/data/perfumes'
import PerfumeCard from '@/components/PerfumeCard'
import Breadcrumb from '@/components/Breadcrumb'

const brandSlug = (marca: string) => marca.toLowerCase().replace(/\s+/g, '-')

const marcaAccent: Record<string, { cssClass: string; label: string; desc: string }> = {
  'Lattafa':         { cssClass: 'brand-lattafa',         label: 'L',  desc: 'A maior casa de perfumaria árabe contemporânea, com fragrâncias que dominam os rankings mundiais.' },
  'Al Haramain':     { cssClass: 'brand-al-haramain',     label: 'AH', desc: 'Fundada em Meca, Al Haramain é sinônimo de luxo árabe puro — oud, rosas e âmbar em estado sublime.' },
  'Ajmal':           { cssClass: 'brand-ajmal',           label: 'A',  desc: 'Tradição de décadas na perfumaria do Golfo Pérsico. Composições equilibradas que unem Oriente e Ocidente.' },
  'Swiss Arabian':   { cssClass: 'brand-swiss-arabian',   label: 'SA', desc: 'A fusão entre a precisão suíça e a riqueza da perfumaria árabe. Qualidade europeia com alma oriental.' },
  'Rasasi':          { cssClass: 'brand-rasasi',          label: 'R',  desc: 'Uma das casas mais inovadoras dos Emirados. Fragrâncias ousadas que desafiam e surpreendem.' },
  'Armaf':           { cssClass: 'brand-armaf',           label: 'AR', desc: 'Perfumaria de luxo acessível. Composições inspiradas nas melhores casas europeias com identidade própria.' },
  'Maison Alhambra': { cssClass: 'brand-maison-alhambra', label: 'MA', desc: 'O glamour de Al Ándalus reinterpretado. Fragrâncias que evocam a grandiosidade do palácio espanhol.' },
  'Afnan':           { cssClass: 'brand-afnan',           label: 'AF', desc: 'Qualidade de nicho a preços democráticos. Cada frasco da Afnan é uma obra-prima de perfumaria.' },
  'Ard Al Zaafaran': { cssClass: 'brand-ard-al-zaafaran', label: 'AZ', desc: 'O campo de açafrão em árabe. Fragrâncias exuberantes que capturam a riqueza das especiarias orientais.' },
}

export async function generateStaticParams() {
  const marcas = Array.from(new Set(perfumes.map(p => p.marca)))
  return marcas.map(marca => ({ marca: brandSlug(marca) }))
}

export async function generateMetadata({ params }: { params: { marca: string } }): Promise<Metadata> {
  const marcaName = perfumes.find(p => brandSlug(p.marca) === params.marca)?.marca
  if (!marcaName) return { title: 'Marca não encontrada — Caballeros Parfum' }
  return {
    title: `${marcaName} — Caballeros Parfum`,
    description: marcaAccent[marcaName]?.desc ?? `Explore a coleção completa de perfumes ${marcaName}.`,
  }
}

export default function MarcaPage({ params }: { params: { marca: string } }) {
  const marcaName = perfumes.find(p => brandSlug(p.marca) === params.marca)?.marca
  if (!marcaName) notFound()

  const accent = marcaAccent[marcaName] ?? { cssClass: 'bg-smoke', label: marcaName[0], desc: '' }
  const produtos = perfumes.filter(p => p.marca === marcaName && p.ativo)

  return (
    <div className="min-h-screen pb-20">

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <div className={`${accent.cssClass} relative pt-36 pb-20 overflow-hidden`} data-surface="dark">
        <span aria-hidden className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full border border-gold/[0.07]" />
        <span aria-hidden className="absolute -bottom-12 -right-12 w-56 h-56 rounded-full border border-gold/[0.10]" />
        <span aria-hidden className="absolute top-16 -left-16 w-64 h-64 rounded-full border border-gold/[0.06]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <Breadcrumb crumbs={[
            { label: 'Coleções', href: '/colecoes' },
            { label: marcaName },
          ]} />

          <span aria-hidden className="font-serif text-gold/[0.08] text-[9rem] absolute top-0 right-6 select-none leading-none hidden md:block">
            {accent.label}
          </span>

          <p className="text-gold text-[10px] tracking-[0.35em] uppercase mb-3 font-sans">Coleção</p>
          <h1 className="font-serif text-5xl md:text-6xl text-white mb-4">{marcaName}</h1>
          <p className="text-white/50 text-sm max-w-md leading-relaxed mb-6">{accent.desc}</p>
          <p className="text-gold/60 text-xs tracking-widest font-sans">
            {produtos.length} {produtos.length === 1 ? 'perfume disponível' : 'perfumes disponíveis'}
          </p>
        </div>
      </div>

      {/* ── Grid de produtos ─────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16">
        {produtos.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {produtos.map(p => (
              <div key={p.id} className="animate-card-in">
                <PerfumeCard perfume={p} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-ash/40 text-sm">Nenhum produto disponível no momento.</p>
          </div>
        )}
      </div>
    </div>
  )
}
