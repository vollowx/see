import { terser } from 'rollup-plugin-terser';

export default {
  input: 'demos/shared.js',
  plugins: [
    terser(),
  ],
  output: {
    file: 'demos/shared.min.js',
    format: 'iife',
  }
}
