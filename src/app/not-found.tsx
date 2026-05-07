import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-noir flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <p className="text-gold text-xs tracking-[0.4em] uppercase mb-6">Página não encontrada</p>
        <h1 className="font-serif text-[10rem] leading-none text-white/5 select-none mb-0">404</h1>
        <p className="font-serif text-3xl text-white -mt-8 mb-4">
          Esta página não existe
        </p>
        <p className="text-ash text-sm leading-relaxed mb-10 max-w-sm mx-auto">
          O perfume que você procura pode ter sido descontinuado ou o link está incorreto.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/explorar"
            className="inline-flex items-center justify-center gap-2 bg-gold text-noir font-sans font-semibold px-8 py-3 rounded-full hover:bg-yellow-400 transition-colors"
          >
            Ver catálogo
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 border border-gold/30 text-gold font-sans px-8 py-3 rounded-full hover:bg-gold/10 transition-colors"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  )
}
