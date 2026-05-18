import type { Metadata } from 'next'
import Link from 'next/link'
import ScrollScene from '@/components/ScrollScene'

export const metadata: Metadata = {
  title: 'Nossa História',
  description: 'Conheça a Caballeros Parfum — curadoria exclusiva de perfumes árabes autênticos com importação direta das melhores casas do Oriente Médio. Nossa missão é levar o melhor da perfumaria árabe ao Brasil.',
  openGraph: {
    title: 'Nossa História — Caballeros Parfum',
    description: 'Importação direta das melhores casas de perfumaria do Oriente Médio.',
    type: 'website',
  },
}

export default function SobrePage() {
  return (
    <div className="min-h-screen pt-28 pb-16">

      {/* Hero — CSS puro, sem imagem externa */}
      <section data-surface="dark" className="relative h-[60vh] flex items-end overflow-hidden bg-gradient-to-br from-[#110a00] via-noir to-smoke">
        {/* Ornamento circular dourado */}
        <span aria-hidden className="absolute -right-24 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-gold/10" />
        <span aria-hidden className="absolute -right-12 top-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border border-gold/8" />
        <span aria-hidden className="absolute right-24  top-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-gold/10" />
        {/* Letra decorativa */}
        <span aria-hidden className="absolute right-20 top-1/2 -translate-y-1/2 font-serif text-[22rem] leading-none text-gold/[0.04] select-none pointer-events-none">
          C
        </span>
        {/* Linha dourada no topo */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/40 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3">Nossa História</p>
          <h1 className="font-serif text-5xl md:text-7xl text-white leading-tight">
            Caballeros<br />
            <em className="text-gradient-gold">Parfum</em>
          </h1>
        </div>
      </section>

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
          <div className="grid grid-cols-3 gap-8 py-8 border-y border-gold/10">
            {[
              { numero: '6', label: 'Casas Árabes' },
              { numero: '20+', label: 'Fragrâncias' },
              { numero: '100%', label: 'Autênticos' },
            ].map(({ numero, label }) => (
              <div key={label} className="text-center">
                <p className="font-serif text-4xl text-gold mb-1">{numero}</p>
                <p className="text-ash text-xs tracking-widest uppercase">{label}</p>
              </div>
            ))}
          </div>
        </ScrollScene>

        <ScrollScene>
          <h2 className="font-serif text-3xl text-white mb-6">Compromisso</h2>
          <p className="text-ash leading-relaxed text-lg">
            Acreditamos que um bom perfume é mais do que uma fragrância — é uma experiência sensorial completa. Por isso, levamos a sério cada detalhe, desde a autenticidade dos produtos até o atendimento pelo WhatsApp.
          </p>
        </ScrollScene>

        <ScrollScene className="text-center">
          <Link
            href="/explorar"
            className="inline-flex items-center gap-2 bg-gold text-noir font-sans font-semibold px-8 py-4 rounded-full hover:bg-yellow-400 transition-colors"
          >
            Explorar a Coleção →
          </Link>
        </ScrollScene>
      </section>
    </div>
  )
}
