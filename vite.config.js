import { defineConfig } from 'vite';
import babel from '@rollup/plugin-babel';

export default defineConfig({
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
