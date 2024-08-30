import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['react-icons', 'swiper', 'react-modal', 'react-router-dom', 'styled-components'],
    }
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
