import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'The Wellness London - Private Blood Tests',
    short_name: 'Blood Tests',
    description: 'Book private blood tests in London with results in 4-24 hours. Lifestyle, Hormone & Executive panels from £400.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
