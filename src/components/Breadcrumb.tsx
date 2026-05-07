import Link from 'next/link'

interface Crumb { label: string; href?: string }

interface Props { crumbs: Crumb[] }

export default function Breadcrumb({ crumbs }: Props) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[11px] font-sans tracking-wider text-ash/60 mb-8">
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-gold/30">›</span>}
          {crumb.href ? (
            <Link href={crumb.href} className="hover:text-gold transition-colors duration-150">
              {crumb.label}
            </Link>
          ) : (
            <span className="text-ash/40">{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
