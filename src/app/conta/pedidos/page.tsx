import Link from 'next/link'

export default function PedidosPage() {
  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        <div className="mb-10">
          <p className="text-gold text-[10px] tracking-[0.35em] uppercase mb-2 font-sans">Área do Cliente</p>
          <h1 className="font-serif text-4xl text-white">Meus Pedidos</h1>
        </div>

        {/* Empty state */}
        <div className="flex flex-col items-center gap-5 py-20 text-center">
          <span className="w-16 h-16 rounded-full border border-white/[0.06] flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-ash/25">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" strokeLinecap="round" />
            </svg>
          </span>
          <div>
            <p className="text-white/70 text-sm mb-1">Nenhum pedido registrado ainda.</p>
            <p className="text-ash/40 text-xs max-w-xs mx-auto leading-relaxed">
              Seus pedidos aparecerão aqui após a integração com o sistema de pagamentos.
            </p>
          </div>
          <Link href="/explorar"
            className="text-gold/55 text-[10px] tracking-[0.2em] uppercase hover:text-gold transition-colors mt-2">
            Explorar catálogo →
          </Link>
        </div>

        {/* Como funciona */}
        <div className="border border-white/[0.05] rounded-2xl p-6 bg-smoke">
          <p className="text-gold text-[9px] tracking-[0.3em] uppercase mb-4 font-sans">Como funciona hoje</p>
          <div className="flex flex-col gap-4">
            {[
              { step: '01', text: 'Adicione perfumes ao carrinho e finalize pelo WhatsApp.' },
              { step: '02', text: 'Nossa equipe confirma o pedido e envia o link de pagamento.' },
              { step: '03', text: 'Após confirmação, o perfume é despachado em até 2 dias úteis.' },
            ].map(({ step, text }) => (
              <div key={step} className="flex items-start gap-4">
                <span className="font-mono text-gold/30 text-xs shrink-0 mt-0.5">{step}</span>
                <p className="text-ash/60 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
