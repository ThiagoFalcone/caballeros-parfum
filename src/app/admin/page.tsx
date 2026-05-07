import Link from 'next/link'
import { perfumes } from '@/data/perfumes'

export default function AdminPage() {
  const total = perfumes.length
  const marcas = Array.from(new Set(perfumes.map(p => p.marca))).length
  const ativos = perfumes.filter(p => p.ativo).length
  const destaques = perfumes.filter(p => p.destaque).length
  const precos = perfumes.map(p => p.preco)
  const precoMin = Math.min(...precos)
  const precoMax = Math.max(...precos)

  const stats = [
    { label: 'Perfumes',   value: String(total) },
    { label: 'Marcas',     value: String(marcas) },
    { label: 'Ativos',     value: String(ativos) },
    { label: 'Destaques',  value: String(destaques) },
    { label: 'Preço mín.', value: `R$ ${precoMin.toFixed(2)}` },
    { label: 'Preço máx.', value: `R$ ${precoMax.toFixed(2)}` },
  ]

  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="mb-10">
          <p className="text-gold text-[10px] tracking-[0.35em] uppercase mb-2 font-sans">Painel</p>
          <h1 className="font-serif text-4xl text-white">Administração</h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-12">
          {stats.map(s => (
            <div key={s.label} className="bg-smoke border border-white/[0.05] rounded-xl p-4">
              <p className="text-ash/45 text-[9px] tracking-[0.2em] uppercase font-sans mb-2">{s.label}</p>
              <p className="font-serif text-2xl text-white">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-smoke border border-white/[0.05] rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/[0.05] flex items-center justify-between">
            <h2 className="font-serif text-lg text-white">Catálogo</h2>
            <span className="text-ash/35 text-xs">{total} produtos</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.04]">
                  {['ID', 'Nome', 'Marca', 'Família', 'Preço', 'Status'].map(col => (
                    <th key={col} className="text-left text-ash/35 text-[9px] tracking-[0.2em] uppercase font-sans font-normal px-5 py-3">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {perfumes.map((p, i) => (
                  <tr
                    key={p.id}
                    className={`border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors ${i % 2 !== 0 ? 'bg-white/[0.01]' : ''}`}
                  >
                    <td className="px-5 py-3 text-ash/25 font-mono text-xs">{p.id}</td>
                    <td className="px-5 py-3">
                      <Link href={`/perfume/${p.slug}`} className="text-white/75 hover:text-gold transition-colors text-sm">
                        {p.nome}
                      </Link>
                    </td>
                    <td className="px-5 py-3 text-ash/55 text-xs">{p.marca}</td>
                    <td className="px-5 py-3 text-ash/55 text-xs">{p.familia}</td>
                    <td className="px-5 py-3 text-gold/75 font-mono text-xs">R${p.preco.toFixed(2)}</td>
                    <td className="px-5 py-3">
                      <span className={`text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full ${
                        p.ativo ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/5 text-ash/35'
                      }`}>
                        {p.ativo ? 'Ativo' : 'Inativo'}
                      </span>
                      {p.destaque && (
                        <span className="ml-1.5 text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full bg-gold/10 text-gold/80">
                          Destaque
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}
