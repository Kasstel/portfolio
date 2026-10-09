import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Relative base: works both from a subfolder (GitHub Pages) and from the root
  base: './',
  plugins: [react()],
})
