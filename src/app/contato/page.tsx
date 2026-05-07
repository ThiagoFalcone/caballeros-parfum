'use client'

import { useState } from 'react'
import Link from 'next/link'

const faqs = [
  {
    q: 'Os produtos são originais?',
    a: 'Sim, trabalhamos exclusivamente com importadores autorizados das casas Lattafa, Al Haramain, Ajmal, Swiss Arabian, Rasasi e Armaf. Cada frasco acompanha nota fiscal de importação.',
  },
  {
    q: 'Qual o prazo de entrega?',
    a: 'Entregamos para todo o Brasil via Correios e transportadoras. O prazo médio é de 3 a 7 dias úteis. Pedidos confirmados até as 14h são despachados no mesmo dia.',
  },
  {
    q: 'Posso pedir uma amostra antes de comprar?',
    a: 'Sim! Oferecemos decants (amostras de 5ml) das principais fragrâncias. Pergunte sobre disponibilidade pelo WhatsApp antes de fechar o pedido.',
  },
  {
    q: 'Quais formas de pagamento são aceitas?',
    a: 'Aceitamos Pix (com desconto de 5%), cartão de crédito em até 12x sem juros, e transferência bancária. O checkout é feito diretamente pelo WhatsApp.',
  },
]

export default function ContatoPage() {
  const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen">

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section data-surface="dark" className="relative pt-40 pb-24 overflow-hidden bg-gradient-to-br from-[#110a00] via-noir to-smoke">
        <span aria-hidden className="absolute -right-20 top-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full border border-gold/8" />
        <span aria-hidden className="absolute -right-4  top-1/2 -translate-y-1/2 w-[260px] h-[260px] rounded-full border border-gold/10" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

        <div className="max-w-4xl mx-auto px-6">
          <p className="text-gold text-xs tracking-[0.35em] uppercase mb-4">Fale Conosco</p>
          <h1 className="font-serif text-5xl md:text-7xl text-white leading-tight mb-6">
            Estamos aqui<br />
            <em className="text-gradient-gold">para você</em>
          </h1>
          <p className="text-ash text-lg max-w-lg leading-relaxed">
            Atendimento humano, ágil e especializado. Tire dúvidas sobre fragrâncias, faça pedidos ou agende uma consultoria olfativa.
          </p>
        </div>
      </section>

      {/* ── Canais principais ───────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-6">

        {/* WhatsApp */}
        <div data-surface="dark" className="group relative rounded-2xl border border-gold/15 bg-gradient-to-br from-[#111] to-noir p-8 flex flex-col gap-6 overflow-hidden hover:border-gold/30 transition-colors duration-300">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
            bg-[radial-gradient(ellipse_80%_60%_at_20%_80%,rgba(201,168,76,0.04),transparent)]" />

          <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center">
            <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24" className="text-gold">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.553 4.116 1.523 5.845L.057 23.882l6.197-1.438A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.66-.499-5.193-1.371l-.371-.218-3.878.9.947-3.766-.24-.387A10 10 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-white mb-2">WhatsApp</h2>
            <p className="text-ash text-sm leading-relaxed mb-1">
              Pedidos, dúvidas e consultoria olfativa. Respondemos em até 2h.
            </p>
            <p className="text-gold/60 text-xs tracking-wider">Seg – Sáb · 09h às 20h</p>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center gap-2 bg-gold text-noir font-sans font-semibold text-sm px-6 py-3 rounded-xl hover:bg-yellow-400 transition-colors w-fit"
          >
            Iniciar conversa →
          </a>
        </div>

        {/* Instagram */}
        <div data-surface="dark" className="group relative rounded-2xl border border-white/5 bg-gradient-to-br from-[#111] to-noir p-8 flex flex-col gap-6 overflow-hidden hover:border-white/10 transition-colors duration-300">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
            bg-[radial-gradient(ellipse_80%_60%_at_80%_80%,rgba(201,168,76,0.03),transparent)]" />

          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-ash">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
            </svg>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-white mb-2">Instagram</h2>
            <p className="text-ash text-sm leading-relaxed mb-1">
              Lançamentos, reviews, dicas de fragrâncias e bastidores da curadoria.
            </p>
            <p className="text-ash/50 text-xs tracking-wider">@caballerosparfum</p>
          </div>

          <a
            href="https://instagram.com/caballerosparfum"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center gap-2 border border-white/10 text-ash font-sans text-sm px-6 py-3 rounded-xl hover:border-white/20 hover:text-white transition-all w-fit"
          >
            Seguir no Instagram →
          </a>
        </div>
      </section>

      {/* ── Nossa promessa ──────────────────────────────────────── */}
      <section className="border-y border-gold/10 py-16">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { icon: '✦', titulo: 'Originais', desc: '100% autênticos com nota fiscal' },
            { icon: '◎', titulo: 'Entrega rápida', desc: 'Despachamos no mesmo dia' },
            { icon: '◈', titulo: 'Consultoria', desc: 'Ajuda para escolher a fragância certa' },
            { icon: '◇', titulo: 'Decants', desc: 'Amostras antes de comprar' },
          ].map(({ icon, titulo, desc }) => (
            <div key={titulo} className="flex flex-col items-center gap-3">
              <span className="text-gold text-2xl leading-none">{icon}</span>
              <p className="font-serif text-white text-lg">{titulo}</p>
              <p className="text-ash text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3">Dúvidas Frequentes</p>
        <h2 className="font-serif text-4xl text-white mb-12">Perguntas & Respostas</h2>

        <div className="flex flex-col divide-y divide-white/5">
          {faqs.map((faq, i) => (
            <div key={i}>
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 py-5 text-left group"
              >
                <span className="font-serif text-lg text-white group-hover:text-gold transition-colors duration-200">
                  {faq.q}
                </span>
                <span className={`shrink-0 text-gold text-xl leading-none transition-transform duration-300 ${openFaq === i ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
              {openFaq === i && (
                <p className="text-ash leading-relaxed pb-5 text-sm">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA final ───────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div data-surface="dark" className="rounded-2xl border border-gold/15 bg-gradient-to-br from-[#181000] to-noir p-10 md:p-14 text-center relative overflow-hidden">
          <span aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(201,168,76,0.07),transparent)]" />
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4 relative">Pronto para começar?</p>
          <h3 className="font-serif text-3xl md:text-4xl text-white mb-4 relative">
            Encontre sua fragrância perfeita
          </h3>
          <p className="text-ash max-w-md mx-auto mb-8 relative">
            Nossa equipe te ajuda a escolher entre os perfumes árabes mais hypeados do momento.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center relative">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-gold text-noir font-sans font-semibold px-8 py-4 rounded-full hover:bg-yellow-400 transition-colors"
            >
              Falar com especialista →
            </a>
            <Link
              href="/explorar"
              className="inline-flex items-center justify-center gap-2 border border-gold/30 text-gold font-sans px-8 py-4 rounded-full hover:bg-gold/10 transition-colors"
            >
              Ver catálogo
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
