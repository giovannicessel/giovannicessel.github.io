import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/** Nome do repositório no GitHub (GitHub Pages em /usuario.github.io/NOME/) */
const repoName = 'Grimorio-do-Giovanni'

// https://vite.dev/config/
export default defineConfig({
  // Em produção, assets apontam para /Repo/... no GitHub Pages
  base: process.env.NODE_ENV === 'production' ? `/${repoName}/` : '/',
  plugins: [react(), tailwindcss()],
})
