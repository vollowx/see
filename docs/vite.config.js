import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  base: '/see/',
  build: { minify: true },
  plugins: [createHtmlPlugin({ minify: true })],
});
