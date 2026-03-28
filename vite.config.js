import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/** Fallback se build local sem variáveis do GitHub Actions */
const fallbackRepo = 'Grimorio-do-Giovanni'

/**
 * GitHub Pages:
 * - Repositório USERNAME.github.io → site em https://USERNAME.github.io/ (base "/")
 * - Outros repos → https://USERNAME.github.io/NOME-DO-REPO/ (base "/NOME/")
 */
function getProductionBase() {
  const full = process.env.GITHUB_REPOSITORY || ''
  const owner = (process.env.GITHUB_REPOSITORY_OWNER || '').toLowerCase()
  const repo = full.split('/')[1] || ''
  if (repo && owner && repo.toLowerCase() === `${owner}.github.io`) {
    return '/'
  }
  if (repo) return `/${repo}/`
  return `/${fallbackRepo}/`
}

// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? getProductionBase() : '/',
  plugins: [react(), tailwindcss()],
})
