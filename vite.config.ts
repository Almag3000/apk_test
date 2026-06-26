import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon-192.png', 'icon-512.png'],
      manifest: {
        name: 'Dota 2 Draft Assistant',
        short_name: 'DotaDraft',
        description: 'Ассистент для пика в Dota 2',
        theme_color: '#0f1115',
        background_color: '#0f1115',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.opendota\.com\//,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'opendota-api', expiration: { maxAgeSeconds: 86400 } }
          },
          {
            urlPattern: /^https:\/\/cdn\.cloudflare\.steamstatic\.com\//,
            handler: 'CacheFirst',
            options: { cacheName: 'dota-cdn', expiration: { maxEntries: 500, maxAgeSeconds: 604800 } }
          }
        ]
      }
    })
  ]
})
