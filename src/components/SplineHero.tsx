'use client'

import dynamic from 'next/dynamic'

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-noir animate-pulse rounded-xl" />,
})

const SPLINE_SCENE_URL = 'https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode'

export default function SplineHero() {
  return (
    <div className="w-full h-full">
      <Spline scene={SPLINE_SCENE_URL} />
    </div>
  )
}
