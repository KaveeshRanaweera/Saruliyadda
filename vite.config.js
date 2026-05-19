import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// On GitHub Actions the GITHUB_ACTIONS env var is 'true'.
// On Vercel (and local dev) it is undefined, so we use '/'
const base = process.env.GITHUB_ACTIONS ? '/Saruliyadda/' : '/'

export default defineConfig({
  plugins: [react()],
  base,
})
