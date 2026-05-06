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
