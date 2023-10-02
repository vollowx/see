import { defineConfig } from 'vite';
import babel from '@rollup/plugin-babel';

export default defineConfig({
  base: '/mixed-components/', // For GitHub pages
  build: {
    minify: true,
    cssMinify: 'lightningcss',
  },
  plugins: [
    babel({
      babelrc: false,
      configFile: './.babelrc',
      extensions: ['.js'],
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
    }),
  ],
});
