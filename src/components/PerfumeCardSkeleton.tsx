export default function PerfumeCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/[0.05] bg-gradient-to-b from-[#131313] to-noir animate-pulse">
      {/* Image area */}
      <div className="aspect-[3/4] bg-white/[0.04]" />

      {/* Separator */}
      <div className="h-px bg-white/[0.04]" />

      {/* Info */}
      <div className="px-4 pt-3.5 pb-2 flex flex-col gap-2">
        <div className="h-2 w-16 rounded bg-gold/10" />
        <div className="h-4 w-3/4 rounded bg-white/[0.08]" />
        <div className="h-2 w-1/2 rounded bg-white/[0.05]" />
      </div>

      {/* Footer */}
      <div className="px-4 pb-4 pt-1 flex items-end justify-between gap-2">
        <div className="flex flex-col gap-1.5">
          <div className="h-2 w-14 rounded bg-gold/10" />
          <div className="h-6 w-20 rounded bg-gold/15" />
        </div>
        <div className="h-8 w-24 rounded-lg bg-white/[0.05]" />
      </div>
    </div>
  )
}
