import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Krishna Bhagavad Gita',
    short_name: 'Gita Telugu',
    description: 'Learn Bhagavad Gita in simple Telugu language with transliteration, word meanings, and modern life examples.',
    start_url: '/',
    display: 'standalone',
    background_color: '#020617',
    theme_color: '#FFB800',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
