import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const defaultConfig = {
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
       },
      '/images': {
          target: 'http://localhost:3001/images',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/images/, '')
       },
    }
  }
}

export default defineConfig(() => {
  return {
    // dev specific config
    ...defaultConfig
  }
})
