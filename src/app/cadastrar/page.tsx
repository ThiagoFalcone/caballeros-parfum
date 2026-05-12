'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

const inputClass = `bg-noir border border-white/[0.08] rounded-lg px-4 py-3 text-white text-sm
  placeholder:text-ash/25 focus:outline-none focus:border-gold/40 transition-colors duration-200`

const labelClass = 'text-ash/60 text-[10px] tracking-[0.2em] uppercase font-sans'

export default function CadastrarPage() {
  const router = useRouter()

  const [nome,      setNome]      = useState('')
  const [email,     setEmail]     = useState('')
  const [senha,     setSenha]     = useState('')
  const [confirmar, setConfirmar] = useState('')
  const [loading,   setLoading]   = useState(false)
  const [erro,      setErro]      = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErro('')

    if (senha !== confirmar) {
      setErro('As senhas não coincidem.')
      return
    }

    if (senha.length < 6) {
      setErro('A senha deve ter pelo menos 6 caracteres.')
      return
    }

    setLoading(true)

    // Cria usuário já confirmado via API route (server-side com service role)
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, password: senha }),
    })

    const json = await res.json()

    if (!res.ok) {
      setErro(json.error ?? 'Erro ao criar conta.')
      setLoading(false)
      return
    }

    // Login automático após cadastro
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    })

    setLoading(false)

    if (loginError) {
      setErro('Conta criada! Faça login para continuar.')
      router.push('/entrar')
      return
    }

    router.push('/conta')
    router.refresh()
  }

  return (
    <div className="min-h-screen pt-28 pb-16 flex items-center justify-center px-6">
      <div className="w-full max-w-sm">

        <div className="mb-8 text-center">
          <p className="text-gold text-[10px] tracking-[0.35em] uppercase mb-3 font-sans">Caballeros Parfum</p>
          <h1 className="font-serif text-4xl text-white">Criar Conta</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-smoke border border-white/[0.06] rounded-2xl p-8 flex flex-col gap-5">

          {erro && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 text-red-400 text-xs leading-relaxed">
              {erro}
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label htmlFor="nome" className={labelClass}>Nome completo</label>
            <input id="nome" type="text" required autoComplete="name"
              value={nome} onChange={e => setNome(e.target.value)}
              placeholder="Seu nome" className={inputClass} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className={labelClass}>E-mail</label>
            <input id="email" type="email" required autoComplete="email"
              value={email} onChange={e => setEmail(e.target.value)}
              placeholder="seu@email.com" className={inputClass} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="senha" className={labelClass}>Senha</label>
            <input id="senha" type="password" required autoComplete="new-password"
              value={senha} onChange={e => setSenha(e.target.value)}
              placeholder="••••••••" className={inputClass} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="confirmar" className={labelClass}>Confirmar senha</label>
            <input id="confirmar" type="password" required autoComplete="new-password"
              value={confirmar} onChange={e => setConfirmar(e.target.value)}
              placeholder="••••••••" className={inputClass} />
          </div>

          <button
            type="submit" disabled={loading}
            className="mt-1 bg-gold text-noir font-sans font-semibold text-sm py-3 rounded-lg
              hover:bg-yellow-400 disabled:opacity-60 transition-all duration-300"
          >
            {loading ? 'Criando conta…' : 'Criar conta'}
          </button>
        </form>

        <p className="text-center mt-5 text-ash/40 text-xs">
          Já tem conta?{' '}
          <Link href="/entrar" className="text-gold/65 hover:text-gold transition-colors">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  )
}
