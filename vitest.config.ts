import { defineConfig } from 'vitest/config';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/__tests__/setup.ts'],
    transformMode: { web: [/\.[jt]sx?$/] },
    environmentOptions: {
      jsdom: {
        url: 'http://localhost/',
      },
    },
    css: {
      modules: {
        classNameStrategy: 'non-scoped',
      },
    },
  },
});
