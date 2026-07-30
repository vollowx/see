import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { minifyHTMLLiterals } from 'minify-html-literals';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const workingDir = path.resolve(__dirname, '../src');

console.log('minifying HTML literals...');

const entries = await readdir(workingDir, { recursive: true });

for (const filePath of entries) {
  if (!filePath.endsWith('.js') || filePath.endsWith('.css.js')) continue;

  const fullPath = path.join(workingDir, filePath);
  const code = await readFile(fullPath, 'utf-8');

  const minified = minifyHTMLLiterals(code, {
    shouldMinifyCSS: () => false,
  });

  if (minified?.code && minified.code !== code) {
    await writeFile(fullPath, minified.code, 'utf-8');
    console.log(`minified: ${filePath}`);
  }
}

console.log(`done`);
