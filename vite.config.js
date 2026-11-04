import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// Future: proxy '/api' to the Express server -> server: { proxy: { '/api': 'http://localhost:5000' } }
export default defineConfig({ plugins: [react()] })
