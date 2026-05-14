/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'fimgs.net' },
    ],
    // Fragrantica source images are 375×500 — keep closest breakpoints
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [96, 128, 192, 256, 384],
    minimumCacheTTL: 86400,
  },
}

module.exports = nextConfig
