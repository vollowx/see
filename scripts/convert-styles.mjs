import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { transform } from 'lightningcss';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
};

/**
 * Get formatted timestamp
 * @returns {string} Formatted time string
 */
function timestamp() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${colors.dim}[${hours}:${minutes}:${seconds}]${colors.reset}`;
}

/**
 * Recursively find all files matching a pattern
 * @param {string} dir - Directory to search
 * @param {string} pattern - Pattern to match (e.g., *-styles.css)
 * @param {string[]} fileList - Accumulator for results
 * @returns {string[]} Array of matching file paths
 */
function findFiles(dir, pattern, fileList = []) {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(dir, file.name);

    if (file.isDirectory() && !file.name.startsWith('.')) {
      findFiles(fullPath, pattern, fileList);
    } else if (file.isFile() && file.name.match(pattern)) {
      fileList.push(fullPath);
    }
  }

  return fileList;
}

/**
 * Convert a CSS file content to TypeScript format with minification option
 * @param {string} cssContent - Raw CSS content
 * @param {string} filePath - Path to the CSS file (for export name generation)
 * @param {boolean} minify - Whether to minify the CSS
 * @returns {string} TypeScript module exporting the CSS
 */
function cssToTypeScript(cssContent, filePath, minify = false) {
  let content = cssContent;

  if (minify) {
    const result = transform({
      code: Buffer.from(cssContent),
      minify: true,
      sourceMap: false,
      targets: {},
    });
    content = result.code.toString();
  }

  const escapedCss = content.replace(/`/g, '\\`');

  if (minify) {
    return `import { css } from 'lit';\n\nexport const ${getExportName(filePath)} = css\`${escapedCss}\`;\n`;
  } else {
    return `import { css } from 'lit';\n\nexport const ${getExportName(filePath)} = css\`\n${escapedCss}\n\`;\n`;
  }
}

/**
 * Extract export name from file path (e.g., button-styles.css -> buttonStyles)
 * @param {string} filePath - Path to the CSS file
 * @returns {string} Export name in camelCase
 */
function getExportName(filePath) {
  const basename = path.basename(filePath, '.css');
  const parts = basename.split('-');
  const camelCase = parts
    .map((part, idx) =>
      idx === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)
    )
    .join('');
  return camelCase.replace(/Styles$/, 'Styles');
}

/**
 * Process a single CSS file and generate TypeScript file
 * @param {string} cssFilePath - Path to CSS file
 * @param {boolean} minify - Whether to minify
 */
function processFile(cssFilePath, minify = false) {
  try {
    const cssContent = fs.readFileSync(cssFilePath, 'utf-8');
    const tsContent = cssToTypeScript(cssContent, cssFilePath, minify);
    const outputPath = cssFilePath.replace(/\.css$/, '.css.ts');

    fs.writeFileSync(outputPath, tsContent, 'utf-8');
    const fileName = path.basename(cssFilePath);
    console.log(
      `${timestamp()} ${colors.green}✓${colors.reset} ${colors.cyan}${fileName}${colors.reset}`
    );

    return outputPath;
  } catch (error) {
    console.error(
      `${timestamp()} ${colors.red}✗${colors.reset} ${path.basename(cssFilePath)}: ${error.message}`
    );
    throw error;
  }
}

/**
 * Find all CSS style files and convert them
 * @param {boolean} minify - Whether to minify
 */
function convertAllStyles(minify = false) {
  const srcDir = path.join(projectRoot, 'src');
  const cssFiles = findFiles(srcDir, /-styles\.css$/);

  if (cssFiles.length === 0) {
    console.log(`${timestamp()} ${colors.yellow}No CSS files found${colors.reset}`);
    return;
  }

  const mode = minify ? 'build' : 'dev';
  console.log(
    `${timestamp()} ${colors.blue}Converting ${cssFiles.length} file(s)${colors.reset} ${colors.dim}(${mode})${colors.reset}`
  );

  const converted = [];
  for (const cssFile of cssFiles) {
    try {
      const tsFile = processFile(cssFile, minify);
      converted.push(tsFile);
    } catch (error) {
      process.exit(1);
    }
  }

  console.log(
    `${timestamp()} ${colors.green}✓ Done${colors.reset} ${colors.dim}(${converted.length} files)${colors.reset}`
  );
}

/**
 * Watch CSS files for changes and convert them on save
 */
async function watchStyles() {
  const { default: chokidar } = await import('chokidar');

  const srcDir = path.join(projectRoot, 'src');
  const cssFiles = findFiles(srcDir, /-styles\.css$/);

  if (cssFiles.length === 0) {
    console.log(`${timestamp()} ${colors.yellow}No CSS files found${colors.reset}`);
    return;
  }

  console.log(
    `${timestamp()} ${colors.magenta}Watching ${cssFiles.length} file(s)${colors.reset} ${colors.dim}(press Ctrl+C to stop)${colors.reset}`
  );

  const watcher = chokidar.watch(cssFiles, {
    persistent: true,
    ignoreInitial: true,
  });

  watcher.on('add', (filePath) => {
    processFile(filePath, false);
  });

  watcher.on('change', (filePath) => {
    processFile(filePath, false);
  });

  watcher.on('unlink', (filePath) => {
    const tsPath = filePath.replace(/\.css$/, '.css.ts');
    if (fs.existsSync(tsPath)) {
      fs.unlinkSync(tsPath);
      const fileName = path.basename(tsPath);
      console.log(
        `${timestamp()} ${colors.red}✗${colors.reset} ${colors.dim}${fileName} removed${colors.reset}`
      );
    }
  });

  watcher.on('error', (error) => {
    console.error('Watcher error:', error);
  });

  // Keep the process alive
  return new Promise(() => {});
}

const command = process.argv[2];

if (command === 'watch') {
  await watchStyles();
} else if (command === 'build') {
  convertAllStyles(true); // minify for build
} else {
  convertAllStyles(false); // no minify for default
}
