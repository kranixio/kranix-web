import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Kranix IO — AI-native Control Plane',
    short_name: 'Kranix IO',
    description: 'Open-source infrastructure runtime for containers and clusters. MCP-compatible. GitOps-native.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f5f2eb',
    theme_color: '#f5f2eb',
    icons: [
      {
        src: '/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
