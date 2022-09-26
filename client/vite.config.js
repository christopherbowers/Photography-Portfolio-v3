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

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    return {
      // dev specific config
      ...defaultConfig
    }
  } else {
    // command === 'build'
    return {
      // build specific config
      ...defaultConfig,
      server: {
        proxy: {
          '/api': {
            target: 'http://bowers-portfolio.herokuapp.com/api/',
            changeOrigin: true,
            secure: false,
           },
          '/images': {
            target: 'http://bowers-portfolio.herokuapp.com/api/images/',
            changeOrigin: true,
            secure: false,
            rewrite: (path) => path.replace(/^\/images/, '')
           },
        }
      }
    }
  }
})
