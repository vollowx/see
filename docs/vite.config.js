import { defineConfig } from 'vite';
import babel from '@rollup/plugin-babel';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  base: '/see/', // For GitHub pages
  // css: { transformer: 'lightningcss' },
  build: {
    minify: true,
    // cssMinify: 'lightningcss',
  },
  plugins: [
    babel({
      babelrc: false,
      configFile: './.babelrc',
      extensions: ['.js'],
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
    }),
    createHtmlPlugin({ minify: true }),
  ],
});
