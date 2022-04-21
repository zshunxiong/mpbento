import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { VitePWA } from "vite-plugin-pwa"

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // const base = command === 'build' && mode === 'production' ? '/dist/' : '/';
  const base = '/';

  return {
    base: base,
    root: './app/vue',
    build: {
      outDir: '../html',
      emptyOutDir: true
    },
    plugins: [
      vue(),
      VitePWA({
        mode: "development",
        base: base,
        srcDir: "src",
        filename: "sw.js",
        includeAssets: ["/favicon.ico"],
        strategies: "injectManifest",
        injectManifest: {
          globPatterns: ['**/*.{js,css,html,png}'],
        },
        manifest: {
          name: "PWA_Vite_Tailwind",
          short_name: "PWA模板",
          theme_color: "#ffffff",
          start_url: base,
          display: "standalone",
          background_color: "#ffffff",
          icons: [
            {
              "src": "./icon/manifest-icon-192.maskable.png",
              "sizes": "192x192",
              "type": "image/png",
              "purpose": "any"
            },
            {
              "src": "./icon/manifest-icon-192.maskable.png",
              "sizes": "192x192",
              "type": "image/png",
              "purpose": "maskable"
            },
            {
              "src": "./icon/manifest-icon-512.maskable.png",
              "sizes": "512x512",
              "type": "image/png",
              "purpose": "any"
            },
            {
              "src": "./icon/manifest-icon-512.maskable.png",
              "sizes": "512x512",
              "type": "image/png",
              "purpose": "maskable"
            }
          ],
        },
      }),
    ],
  }
})