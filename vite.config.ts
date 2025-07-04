import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Only load vue-devtools in development
const devPlugins = []
if (process.env.NODE_ENV !== 'production') {
  const vueDevTools = require('vite-plugin-vue-devtools').default
  devPlugins.push(vueDevTools())
}

// https://vite.dev/config/
export default defineConfig({
  base: '/SAQAYA-Internship-main/',
  plugins: [vue(), ...devPlugins],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
