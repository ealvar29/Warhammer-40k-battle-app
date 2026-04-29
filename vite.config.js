import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon-180x180.png', 'icon-512.svg', 'pwa-192x192.png', 'pwa-512x512.png'],
      manifest: {
        name: 'W40K Battle Companion',
        short_name: 'W40K',
        description: 'Free Warhammer 40,000 10th Edition battle companion — stratagems, VP tracking, Crusade roster. Unofficial fan app.',
        theme_color: '#1a1f2e',
        background_color: '#1a1f2e',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          { src: 'pwa-64x64.png', sizes: '64x64', type: 'image/png' },
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: 'maskable-icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5 MiB — bundle grew with 27 factions
        // Cache all app shell assets
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff,woff2}'],
        // Network-first for navigation (always get latest if online)
        navigateFallback: 'index.html',
        navigateFallbackDenylist: [/^\/api/],
        runtimeCaching: [
          {
            // App shell: cache-first, serve instantly offline
            urlPattern: /\.(js|css|svg|png|ico)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'w40k-assets',
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
        ],
      },
      devOptions: {
        // Enable PWA in dev so you can test the install prompt locally
        enabled: true,
        type: 'module',
      },
    }),
  ],
})
