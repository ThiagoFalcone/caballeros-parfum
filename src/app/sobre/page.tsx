import Image from 'next/image'
import Link from 'next/link'
import ScrollScene from '@/components/ScrollScene'

export default function SobrePage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
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
