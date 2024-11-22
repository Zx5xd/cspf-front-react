import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from "path";
import * as fs from "fs";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // https: {
    //   key: fs.readFileSync("localhost-key.pem"),
    //   cert: fs.readFileSync("localhost.pem")
    // },
    proxy: {
      '/api': {
        target: 'https://cspf.kro.kr:3000/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
    host:'0.0.0.0',
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
