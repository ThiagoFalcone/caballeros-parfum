'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import { useToast } from '@/context/ToastContext'
import { supabase } from '@/lib/supabase'
import { buildWhatsAppUrl, formatWhatsAppMessage } from '@/lib/whatsapp'

interface Props { open: boolean; onClose: () => void }

const PIX_KEY = process.env.NEXT_PUBLIC_PIX_KEY ?? ''

export default function CartDrawer({ open, onClose }: Props) {
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart()
  const { showToast } = useToast()

  const [step,   setStep]   = useState<'cart' | 'form' | 'pix'>('cart')
  const [origem, setOrigem] = useState<'whatsapp' | 'pix'>('whatsapp')
  const [nome,   setNome]   = useState('')
  const [email,  setEmail]  = useState('')
  const [saving, setSaving] = useState(false)
  const [copied, setCopied] = useState(false)

  const [cep,          setCep]          = useState('')
  const [frete,        setFrete]        = useState<number | null>(null)
  const [freteUf,      setFreteUf]      = useState('')
  const [freteLoading, setFreteLoading] = useState(false)
  const [freteErro,    setFreteErro]    = useState('')

  const FRETE_UF: Record<string, number> = {
    SP: 18.90, RJ: 22.90, MG: 22.90, ES: 22.90,
    PR: 24.90, SC: 24.90, RS: 24.90,
    GO: 28.90, DF: 28.90, MT: 28.90, MS: 28.90,
    BA: 32.90, SE: 32.90, AL: 32.90, PE: 32.90,
    PB: 32.90, RN: 32.90, CE: 32.90, PI: 34.90, MA: 34.90,
    PA: 38.90, AM: 42.90, AC: 44.90, RR: 44.90, AP: 42.90, RO: 40.90, TO: 36.90,
  }

  async function calcularFrete(cepLimpo: string) {
    setFreteLoading(true)
    setFreteErro('')
    setFrete(null)
    setFreteUf('')
    try {
      const res  = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
      const data = await res.json()
      if (data.erro) { setFreteErro('CEP não encontrado'); return }
      const uf   = data.uf as string
      setFreteUf(uf)
      setFrete(FRETE_UF[uf] ?? 38.90)
    } catch {
      setFreteErro('Erro ao consultar CEP')
    } finally {
      setFreteLoading(false)
    }
  }

  function handleCepChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 8)
    setCep(raw.length > 5 ? `${raw.slice(0, 5)}-${raw.slice(5)}` : raw)
    if (raw.length === 8) calcularFrete(raw)
    if (raw.length < 8)  { setFrete(null); setFreteErro(''); setFreteUf('') }
  }

  const totalComFrete = totalPrice + (frete ?? 0)
  const freteObj = frete !== null ? { valor: frete, uf: freteUf, cep } : null

  function copyPix() {
    navigator.clipboard.writeText(PIX_KEY).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  function pixWhatsAppUrl() {
    const linhas = items.map(({ perfume, quantidade }) =>
      `• ${perfume.nome} (${perfume.marca}) × ${quantidade} — R$${(perfume.preco * quantidade).toFixed(2).replace('.', ',')}`
    ).join('\n')
    const freteStr = frete !== null
      ? `\n📦 Frete PAC (${freteUf} · CEP ${cep}): R$${frete.toFixed(2).replace('.', ',')}`
      : ''
    const msg = `Olá! Acabei de pagar via Pix.\n\nPedido:\n${linhas}${freteStr}\n\nTotal: R$${totalComFrete.toFixed(2).replace('.', ',')}\n\nSegue o comprovante em anexo.`
    return `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
  }

  async function handleCheckoutClick(via: 'whatsapp' | 'pix' = 'whatsapp') {
    setOrigem(via)
    const { data: { session } } = await supabase.auth.getSession()
    if (session?.user) {
      setNome(session.user.user_metadata?.nome ?? session.user.email ?? '')
      setEmail(session.user.email ?? '')
    }
    setStep('form')
  }

  async function handleConfirm(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    const { data: { session } } = await supabase.auth.getSession()

    const itens = items.map(({ perfume, quantidade }) => ({
      id: perfume.id,
      nome: perfume.nome,
      marca: perfume.marca,
      preco: perfume.preco,
      quantidade,
    }))

    await fetch('/api/pedidos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome_cliente: nome,
        email_cliente: email,
        itens,
        total: totalComFrete,
        user_id: session?.user?.id ?? null,
      }),
    })

    setSaving(false)

    if (origem === 'pix') {
      setStep('pix')
    } else {
      const url = buildWhatsAppUrl(formatWhatsAppMessage(items, freteObj))
      window.open(url, '_blank')
      showToast('Pedido registrado!', 'Abrindo WhatsApp…')
      clearCart()
      setStep('cart')
      setNome('')
      setEmail('')
      onClose()
    }
  }

  function handleClose() {
    setStep('cart')
    setCep(''); setFrete(null); setFreteUf(''); setFreteErro('')
    onClose()
  }

  return (
    <>
      {open && <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" onClick={handleClose} />}

      <div className={`fixed z-50 bg-smoke transition-transform duration-300
        bottom-0 left-0 right-0 rounded-t-2xl border-t border-gold/20
        h-[88vh] md:h-auto
        md:top-0 md:right-0 md:left-auto md:bottom-0 md:w-96 md:rounded-none md:border-l md:border-t-0
        ${open ? 'translate-y-0 md:translate-x-0' : 'translate-y-full md:translate-x-full'}`}
      >
        <div className="flex flex-col h-full md:max-h-screen">

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gold/10">
            {(step === 'form' || step === 'pix') && (
              <button type="button" aria-label="Voltar ao carrinho" onClick={() => setStep('cart')} className="text-ash hover:text-white transition-colors mr-2">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}
            <h2 className="font-serif text-lg text-white flex-1">
              {step === 'cart' ? 'Meu Carrinho' : step === 'pix' ? 'Pagamento via Pix' : 'Finalizar Pedido'}
            </h2>
            <button type="button" aria-label="Fechar carrinho" onClick={handleClose} className="text-ash hover:text-white transition-colors p-1">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* ── STEP: CART ── */}
          {step === 'cart' && (
            <>
              <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
                {items.length === 0 ? (
                  <p className="text-ash text-sm text-center mt-8">Seu carrinho está vazio.</p>
                ) : (
                  items.map(({ perfume, quantidade }) => (
                    <div key={perfume.id} className="flex gap-3 items-start">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-[#111]">
                        <Image src={perfume.imagemUrl} alt={perfume.nome} fill sizes="64px" className="object-contain scale-90" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-gold text-xs tracking-wider uppercase">{perfume.marca}</p>
                        <p className="text-sm text-white font-medium truncate">{perfume.nome}</p>
                        <p className="text-xs text-ash">R${perfume.preco.toFixed(2).replace('.', ',')}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button type="button" aria-label="Diminuir quantidade" onClick={() => updateQuantity(perfume.id, quantidade - 1)} className="w-6 h-6 rounded border border-gold/30 text-gold text-sm hover:bg-gold/10 transition-colors">−</button>
                          <span className="text-sm text-white w-4 text-center">{quantidade}</span>
                          <button type="button" aria-label="Aumentar quantidade" onClick={() => updateQuantity(perfume.id, quantidade + 1)} className="w-6 h-6 rounded border border-gold/30 text-gold text-sm hover:bg-gold/10 transition-colors">+</button>
                          <button type="button" onClick={() => removeFromCart(perfume.id)} className="ml-auto text-ash hover:text-red-400 transition-colors text-xs">remover</button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {items.length > 0 && (
                <div className="px-5 py-4 border-t border-gold/10 flex flex-col gap-3">
                  {/* Totais */}
                  {frete !== null ? (
                    <>
                      <div className="flex justify-between text-xs text-ash/60">
                        <span>Subtotal</span>
                        <span>R${totalPrice.toFixed(2).replace('.', ',')}</span>
                      </div>
                      <div className="flex justify-between text-xs text-ash/60">
                        <span>Frete PAC · {freteUf}</span>
                        <span>R${frete.toFixed(2).replace('.', ',')}</span>
                      </div>
                      <div className="flex justify-between text-sm border-t border-white/[0.06] pt-2">
                        <span className="text-white font-medium">Total</span>
                        <span className="text-gold font-semibold">R${totalComFrete.toFixed(2).replace('.', ',')}</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex justify-between text-sm">
                      <span className="text-ash">Total</span>
                      <span className="text-white font-medium">R${totalPrice.toFixed(2).replace('.', ',')}</span>
                    </div>
                  )}

                  {/* Calculadora de frete */}
                  <div className="bg-noir/60 rounded-xl p-3 border border-white/[0.05]">
                    <p className="text-ash/45 text-[9px] tracking-[0.25em] uppercase mb-2">Calcular frete</p>
                    <div className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={cep}
                        onChange={handleCepChange}
                        placeholder="00000-000"
                        maxLength={9}
                        className="flex-1 bg-noir border border-white/[0.08] rounded-lg px-3 py-2 text-white text-sm placeholder:text-ash/25 focus:outline-none focus:border-gold/40 transition-colors font-mono"
                      />
                      {freteLoading && (
                        <div className="w-5 h-5 rounded-full border-2 border-gold/30 border-t-gold animate-spin shrink-0" />
                      )}
                    </div>
                    {freteErro && <p className="text-red-400/80 text-[10px] mt-1.5">{freteErro}</p>}
                    {frete !== null && (
                      <p className="text-ash/35 text-[9px] mt-1.5">Estimativa PAC · valor final confirmado no WhatsApp</p>
                    )}
                  </div>

                  {/* Pagar com Pix */}
                  <button
                    type="button"
                    onClick={() => handleCheckoutClick('pix')}
                    className="w-full bg-gold text-noir font-sans font-semibold py-3 rounded-lg hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.997 2a10 10 0 100 20 10 10 0 000-20zm0 1.5a8.5 8.5 0 110 17 8.5 8.5 0 010-17zm-.75 3.75v3h-3a.75.75 0 000 1.5h3v3a.75.75 0 001.5 0v-3h3a.75.75 0 000-1.5h-3v-3a.75.75 0 00-1.5 0z"/>
                    </svg>
                    Pagar com Pix
                  </button>

                  {/* Pedir via WhatsApp */}
                  <button
                    type="button"
                    onClick={() => handleCheckoutClick('whatsapp')}
                    className="w-full border border-gold/30 text-gold font-sans text-sm py-2.5 rounded-lg hover:bg-gold/10 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.553 4.116 1.523 5.845L.057 23.882l6.197-1.438A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.66-.499-5.193-1.371l-.371-.218-3.878.9.947-3.766-.24-.387A10 10 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                    </svg>
                    Pedir via WhatsApp
                  </button>
                </div>
              )}
            </>
          )}

          {/* ── STEP: FORM ── */}
          {step === 'form' && (
            <form onSubmit={handleConfirm} className="flex-1 flex flex-col justify-between px-5 py-6 gap-4">
              <div className="flex flex-col gap-4">
                <p className="text-ash/60 text-xs leading-relaxed">
                  {origem === 'pix'
                    ? 'Informe seus dados para registrar o pedido. Em seguida mostraremos a chave Pix.'
                    : 'Informe seus dados para registrar o pedido. Em seguida abriremos o WhatsApp.'}
                </p>

                <div className="flex flex-col gap-1.5">
                  <label className="text-ash/60 text-[10px] tracking-[0.2em] uppercase font-sans">Nome</label>
                  <input
                    type="text" required value={nome} onChange={e => setNome(e.target.value)}
                    placeholder="Seu nome"
                    className="bg-noir border border-white/[0.08] rounded-lg px-4 py-3 text-white text-sm placeholder:text-ash/25 focus:outline-none focus:border-gold/40 transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-ash/60 text-[10px] tracking-[0.2em] uppercase font-sans">E-mail</label>
                  <input
                    type="email" required value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="bg-noir border border-white/[0.08] rounded-lg px-4 py-3 text-white text-sm placeholder:text-ash/25 focus:outline-none focus:border-gold/40 transition-colors"
                  />
                </div>

                {/* Resumo */}
                <div className="bg-noir/60 rounded-xl p-4 border border-white/[0.05]">
                  <p className="text-ash/50 text-[10px] tracking-widest uppercase mb-3">Resumo</p>
                  {items.map(({ perfume, quantidade }) => (
                    <div key={perfume.id} className="flex justify-between text-xs text-ash/70 mb-1.5">
                      <span className="truncate mr-2">{perfume.nome} × {quantidade}</span>
                      <span className="shrink-0">R${(perfume.preco * quantidade).toFixed(2).replace('.', ',')}</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-sm text-white font-medium mt-3 pt-3 border-t border-white/[0.05]">
                    <span>Total</span>
                    <span>R${totalPrice.toFixed(2).replace('.', ',')}</span>
                  </div>
                </div>
              </div>

              <button
                type="submit" disabled={saving}
                className="w-full bg-gold text-noir font-sans font-semibold py-3 rounded-lg hover:bg-yellow-400 disabled:opacity-60 transition-colors flex items-center justify-center gap-2"
              >
                {saving ? 'Salvando…' : origem === 'pix' ? 'Continuar para Pix' : 'Confirmar e abrir WhatsApp'}
              </button>
            </form>
          )}
          {/* ── STEP: PIX ── */}
          {step === 'pix' && (
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-5">

                {/* Chave Pix */}
                <div className="bg-noir rounded-xl border border-gold/20 p-5">
                  <p className="text-ash/50 text-[10px] tracking-[0.2em] uppercase mb-3">Chave Pix</p>
                  <div className="flex items-center gap-3">
                    <span className="flex-1 font-mono text-sm text-white break-all">{PIX_KEY}</span>
                    <button
                      type="button"
                      onClick={copyPix}
                      className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-sans font-semibold transition-all duration-200
                        ${copied ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-gold/10 text-gold border border-gold/20 hover:bg-gold/20'}`}
                    >
                      {copied ? 'Copiado!' : 'Copiar'}
                    </button>
                  </div>
                </div>

                {/* Resumo do pedido */}
                <div className="bg-noir/60 rounded-xl p-4 border border-white/[0.05]">
                  <p className="text-ash/50 text-[10px] tracking-widest uppercase mb-3">Resumo do pedido</p>
                  {items.map(({ perfume, quantidade }) => (
                    <div key={perfume.id} className="flex justify-between text-xs text-ash/70 mb-1.5">
                      <span className="truncate mr-2">{perfume.nome} × {quantidade}</span>
                      <span className="shrink-0">R${(perfume.preco * quantidade).toFixed(2).replace('.', ',')}</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-sm text-white font-medium mt-3 pt-3 border-t border-white/[0.05]">
                    <span>Total</span>
                    <span>R${totalPrice.toFixed(2).replace('.', ',')}</span>
                  </div>
                </div>

                {/* Instruções */}
                <div className="flex flex-col gap-3">
                  {[
                    { n: '1', txt: 'Copie a chave Pix acima' },
                    { n: '2', txt: 'Abra o app do seu banco e faça o pagamento' },
                    { n: '3', txt: 'Envie o comprovante pelo WhatsApp' },
                  ].map(({ n, txt }) => (
                    <div key={n} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full border border-gold/40 text-gold text-[10px] font-semibold flex items-center justify-center shrink-0 mt-0.5">{n}</span>
                      <p className="text-ash/70 text-sm leading-relaxed">{txt}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botão WhatsApp */}
              <div className="px-5 py-4 border-t border-gold/10">
                <a
                  href={pixWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => { showToast('Pedido registrado!', 'Envie o comprovante no WhatsApp.'); clearCart(); setStep('cart'); setNome(''); setEmail(''); onClose() }}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-sans font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.553 4.116 1.523 5.845L.057 23.882l6.197-1.438A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.66-.499-5.193-1.371l-.371-.218-3.878.9.947-3.766-.24-.387A10 10 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                  </svg>
                  Enviar comprovante no WhatsApp
                </a>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  )
}
