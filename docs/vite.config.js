import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  base: '/see/', // For GitHub pages
  css: { transformer: 'lightningcss' },
  build: {
    minify: true,
    cssMinify: 'lightningcss',
  },
  plugins: [createHtmlPlugin({ minify: true })],
});
