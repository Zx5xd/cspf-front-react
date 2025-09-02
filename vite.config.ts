import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // proxy: {
    //   '/searchNews': {
    //     target: 'http://x.x.x.x:3500',
    //     changeOrigin: false,
    //     rewrite: (path) => path.replace(/^\/searchNews/, '/searchNews')
    //   },
    // },

    host:'0.0.0.0',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
