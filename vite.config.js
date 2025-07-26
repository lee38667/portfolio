import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Enable gzip compression
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          animation: ['motion', 'react-type-animation'],
          spline: ['@splinetool/react-spline']
        }
      }
    },
    // Enable source maps for debugging
    sourcemap: false,
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  // Optimize dev server
  server: {
    port: 3000,
    host: true
  },
  // Enable preload for critical resources
  optimizeDeps: {
    include: ['react', 'react-dom', 'three', 'motion']
  }
})
