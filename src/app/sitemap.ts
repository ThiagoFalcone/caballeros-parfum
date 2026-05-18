import { MetadataRoute } from 'next'
import { perfumes } from '@/data/perfumes'

const BASE = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://caballerosparfum.com.br'
const slug = (s: string) => s.toLowerCase().replace(/\s+/g, '-')

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                changeFrequency: 'daily',   priority: 1.0, lastModified: now },
    { url: `${BASE}/explorar`,  changeFrequency: 'daily',   priority: 0.9, lastModified: now },
    { url: `${BASE}/nicho`,     changeFrequency: 'weekly',  priority: 0.8, lastModified: now },
    { url: `${BASE}/colecoes`,  changeFrequency: 'weekly',  priority: 0.8, lastModified: now },
    { url: `${BASE}/sobre`,     changeFrequency: 'monthly', priority: 0.5, lastModified: now },
    { url: `${BASE}/contato`,   changeFrequency: 'monthly', priority: 0.5, lastModified: now },
  ]

  const brandRoutes: MetadataRoute.Sitemap = Array.from(new Set(perfumes.map(p => p.marca)))
    .map(marca => ({
      url: `${BASE}/colecoes/${slug(marca)}`,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
      lastModified: now,
    }))

  const productRoutes: MetadataRoute.Sitemap = perfumes
    .filter(p => p.ativo)
    .map(p => ({
      url: `${BASE}/perfume/${p.slug}`,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      lastModified: now,
    }))

  return [...staticRoutes, ...brandRoutes, ...productRoutes]
}
