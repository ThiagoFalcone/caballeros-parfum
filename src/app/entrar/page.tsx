'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { supabase, supabaseConfigured } from '@/lib/supabase'

export default function EntrarPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = searchParams.get('next') ?? '/conta'

  const [email,   setEmail]   = useState('')
  const [senha,   setSenha]   = useState('')
  const [loading, setLoading] = useState(false)
  const [erro,    setErro]    = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErro('')

    if (!supabaseConfigured) {
      setErro('Backend não configurado. Adicione NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY no .env.local.')
      return
    }

    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha })
    setLoading(false)

    if (error) {
      setErro(error.message === 'Invalid login credentials'
        ? 'E-mail ou senha incorretos.'
        : error.message)
      return
    }

    router.push(next)
    router.refresh()
  }

  return (
    <div className="min-h-screen pt-28 pb-16 flex items-center justify-center px-6">
      <div className="w-full max-w-sm">

        <div className="mb-8 text-center">
          <p className="text-gold text-[10px] tracking-[0.35em] uppercase mb-3 font-sans">Caballeros Parfum</p>
          <h1 className="font-serif text-4xl text-white">Entrar</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-smoke border border-white/[0.06] rounded-2xl p-8 flex flex-col gap-5">

          {erro && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 text-red-400 text-xs leading-relaxed">
              {erro}
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-ash/60 text-[10px] tracking-[0.2em] uppercase font-sans">
              E-mail
            </label>
            <input
              id="email" type="email" required autoComplete="email"
              value={email} onChange={e => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="bg-noir border border-white/[0.08] rounded-lg px-4 py-3 text-white text-sm
                placeholder:text-ash/25 focus:outline-none focus:border-gold/40 transition-colors duration-200"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="senha" className="text-ash/60 text-[10px] tracking-[0.2em] uppercase font-sans">
                Senha
              </label>
              <button type="button" className="text-gold/45 text-[10px] hover:text-gold/70 transition-colors">
                Esqueceu?
              </button>
            </div>
            <input
              id="senha" type="password" required autoComplete="current-password"
              value={senha} onChange={e => setSenha(e.target.value)}
              placeholder="••••••••"
              className="bg-noir border border-white/[0.08] rounded-lg px-4 py-3 text-white text-sm
                placeholder:text-ash/25 focus:outline-none focus:border-gold/40 transition-colors duration-200"
            />
          </div>

          <button
            type="submit" disabled={loading}
            className="mt-1 bg-gold text-noir font-sans font-semibold text-sm py-3 rounded-lg
              hover:bg-yellow-400 disabled:opacity-60 transition-all duration-300"
          >
            {loading ? 'Entrando…' : 'Entrar'}
          </button>
        </form>

        <p className="text-center mt-5 text-ash/40 text-xs">
          Ainda não tem conta?{' '}
          <Link href="/cadastrar" className="text-gold/65 hover:text-gold transition-colors">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  )
}
