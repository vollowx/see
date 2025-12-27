import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const srcDir = path.join(projectRoot, 'src');

function skipDir(name) {
  return (
    ['.git', 'node_modules', 'dist', '.github'].includes(name) ||
    name.startsWith('.')
  );
}

function cleanup(dir, count = 0) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (!skipDir(entry.name)) count = cleanup(full, count);
      continue;
    }

    if (!entry.isFile()) continue;

    const isJS = entry.name.endsWith('.js');
    const isMap = entry.name.endsWith('.js.map');
    if (!isJS && !isMap) continue;

    const ts = full.replace(/\.js(\.map)?$/, '.ts');
    const mjs = full.replace(/\.js(\.map)?$/, '.mjs');
    const shouldDelete =
      (isJS && (fs.existsSync(ts) || fs.existsSync(mjs))) || isMap;

    if (shouldDelete) {
      try {
        fs.unlinkSync(full);
        console.log(`deleted ${entry.name}`);
        count++;
      } catch {
        console.log(`failed to delete ${entry.name}`);
      }
    }
  }
  return count;
}

console.log(`deleting compiled files`);

const total = cleanup(srcDir);

console.log(`${total} compiled files deleted`);
