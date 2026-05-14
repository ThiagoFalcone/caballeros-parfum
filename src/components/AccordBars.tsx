'use client'

import { useEffect, useRef } from 'react'

export type Accord = { label: string; percent: number; color: string }

export default function AccordBars({ accords }: { accords: Accord[] }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bars = ref.current?.querySelectorAll<HTMLElement>('.accord-bar')
    if (!bars) return
    const timer = setTimeout(() => {
      bars.forEach(bar => { bar.style.width = bar.dataset.target ?? '0%' })
    }, 120)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div ref={ref} className="space-y-2.5">
      {accords.map((accord, i) => (
        <div key={accord.label} className="flex items-center gap-3">
          <span className="text-white/45 text-[10px] tracking-wide font-sans w-[6.5rem] text-right shrink-0 capitalize">
            {accord.label}
          </span>
          <div className="flex-1 h-[18px] bg-white/[0.04] rounded-full overflow-hidden">
            <div
              className="accord-bar h-full rounded-full transition-[width] duration-700 ease-out"
              style={{
                width: '0%',
                backgroundColor: accord.color,
                transitionDelay: `${i * 70}ms`,
                opacity: 0.85,
              }}
              data-target={`${accord.percent}%`}
            />
          </div>
          <span className="text-white/25 text-[9px] font-mono w-6 shrink-0 text-right">
            {accord.percent}
          </span>
        </div>
      ))}
    </div>
  )
}
