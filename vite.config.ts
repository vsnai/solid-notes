/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['node_modules/@testing-library/jest-dom/vitest'],
    // isolate: false,
  },
  resolve: {
    conditions: ['development', 'browser'],
  },
})
