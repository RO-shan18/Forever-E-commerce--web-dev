/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {loadEnv} from 'vite' //load all env variables from .env files

// https://vite.dev/config/
export default defineConfig(({mode}) => ({
  plugins: [react()],
  server : {port : 5174},
   test: {
      environment: 'happy-dom',
      env: loadEnv(mode, process.cwd(), ''),
  },
}))
