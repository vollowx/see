import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { transform } from 'lightningcss';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

function findFiles(dir, pattern, fileList = []) {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    const full = path.join(dir, file.name);

    if (file.isDirectory() && !file.name.startsWith('.')) {
      findFiles(full, pattern, fileList);
    } else if (file.isFile() && file.name.match(pattern)) {
      fileList.push(full);
    }
  }

  return fileList;
}

function cssToTypeScript(cssContent, filePath, minify = false) {
  let content = cssContent;

  if (minify) {
    const result = transform({
      code: Buffer.from(cssContent),
      minify: true,
      sourceMap: false,
    });
    content = result.code.toString();
  }

  const escaped = content.replace(/`/g, '\\`');
  const exportName = getExportName(filePath);

  if (minify) {
    return `import { css } from 'lit';\n\nexport const ${exportName} = css\`${escaped}\`;\n`;
  }

  return `import { css } from 'lit';\n\nexport const ${exportName} = css\`\n${escaped}\n\`;\n`;
}

function getExportName(filePath) {
  const base = path.basename(filePath, '.css');
  const parts = base.split('-');
  const camel = parts
    .map((p, i) => (i === 0 ? p : p[0].toUpperCase() + p.slice(1)))
    .join('');
  return camel.replace(/Styles$/, 'Styles');
}

function processFile(cssFilePath, minify = false) {
  try {
    const css = fs.readFileSync(cssFilePath, 'utf-8');
    const ts = cssToTypeScript(css, cssFilePath, minify);
    const out = cssFilePath.replace(/\.css$/, '.css.ts');

    fs.writeFileSync(out, ts, 'utf-8');
    console.log(`converted ${path.basename(cssFilePath)}`);

    return out;
  } catch (err) {
    console.log(
      `failed to convert ${path.basename(cssFilePath)}: ${err.message}`
    );
    throw err;
  }
}

function convertAllStyles(minify = false) {
  const srcDir = path.join(projectRoot, 'src');
  const cssFiles = findFiles(srcDir, /-styles\.css$/);

  if (cssFiles.length === 0) {
    console.log(`no CSS files found`);
    return;
  }

  const mode = minify ? 'build' : 'dev';
  console.log(`converting ${cssFiles.length} files (${mode})`);

  const converted = [];

  for (const cssFile of cssFiles) {
    try {
      const tsFile = processFile(cssFile, minify);
      converted.push(tsFile);
    } catch {
      process.exit(1);
    }
  }

  console.log(`${converted.length} files converted`);
}

async function watchStyles() {
  const { default: chokidar } = await import('chokidar');

  const srcDir = path.join(projectRoot, 'src');
  const cssFiles = findFiles(srcDir, /-styles\.css$/);

  if (cssFiles.length === 0) {
    console.log(`no CSS files found`);
    return;
  }

  console.log(`watching ${cssFiles.length} files`);
  const watcher = chokidar.watch(cssFiles, {
    persistent: true,
    ignoreInitial: true,
  });

  watcher.on('add', (file) => processFile(file, false));
  watcher.on('change', (file) => processFile(file, false));

  watcher.on('unlink', (file) => {
    const ts = file.replace(/\.css$/, '.css.ts');
    if (fs.existsSync(ts)) {
      fs.unlinkSync(ts);
      console.log(`deleted ${path.basename(ts)}`);
    }
  });

  watcher.on('error', (err) => {
    console.log(`watcher error: ${err}`);
  });

  return new Promise(() => {});
}

const command = process.argv[2];

if (command === 'watch') {
  await watchStyles();
} else if (command === 'build') {
  convertAllStyles(true);
} else {
  convertAllStyles(false);
}
