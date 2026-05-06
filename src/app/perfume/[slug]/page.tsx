import { notFound } from 'next/navigation'
import Image from 'next/image'
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

  const whatsappMsg = encodeURIComponent(
    `Olá! Tenho interesse no ${perfume.marca} ${perfume.nome} — R$${perfume.preco.toFixed(2).replace('.', ',')}.`
  )

  return (
    <div className="min-h-screen pt-16">
      <section className="grid md:grid-cols-2 min-h-[80vh]">
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
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${whatsappMsg}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border border-gold/30 text-gold font-sans text-sm px-6 py-3 rounded-lg hover:bg-gold/10 transition-colors"
            >
              Perguntar via WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-6 py-16">
        <NotesPyramid
          notasTopo={perfume.notasTopo}
          notasCorpo={perfume.notasCorpo}
          notasFundo={perfume.notasFundo}
        />
      </section>

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

      <WhatsAppButton />

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-noir/95 backdrop-blur border-t border-gold/10 p-4">
        <AddToCartButton perfume={perfume} fullWidth />
      </div>
    </div>
  )
}
