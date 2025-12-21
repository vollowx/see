import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { transform } from 'lightningcss';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

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
    // Use lightningcss for minification without compatibility transforms
    const result = transform({
      code: Buffer.from(cssContent),
      minify: true,
      sourceMap: false,
      targets: {}, // Empty targets disables auto-prefixing and transforms
    });
    content = result.code.toString();
  }

  // Escape backticks in the CSS content
  const escapedCss = content.replace(/`/g, '\\`');

  // Use minified or formatted output
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

    // Replace .css with .css.ts
    const outputPath = cssFilePath.replace(/\.css$/, '.css.ts');

    fs.writeFileSync(outputPath, tsContent, 'utf-8');
    console.log(
      `✓ Converted: ${path.relative(projectRoot, cssFilePath)} → ${path.relative(projectRoot, outputPath)}`
    );

    return outputPath;
  } catch (error) {
    console.error(`✗ Error processing ${cssFilePath}:`, error.message);
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
    console.log('No CSS style files found to convert.');
    return;
  }

  console.log(
    `Found ${cssFiles.length} CSS style file(s). Converting${minify ? ' and minifying' : ''}...`
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
    `\n✓ Conversion complete: ${converted.length} file(s) processed.`
  );
}

/**
 * Watch CSS files for changes and convert them on save
 */
async function watchStyles() {
  try {
    const chokidar = await import('chokidar');

    const watcher = chokidar.watch(
      path.join(projectRoot, 'src/**/*-styles.css'),
      {
        persistent: true,
        ignoreInitial: true,
      }
    );

    console.log('Watching for CSS style file changes...');

    watcher.on('add', (filePath) => {
      console.log(
        `\nNew file detected: ${path.relative(projectRoot, filePath)}`
      );
      processFile(filePath, false);
    });

    watcher.on('change', (filePath) => {
      console.log(`\nFile changed: ${path.relative(projectRoot, filePath)}`);
      processFile(filePath, false);
    });

    watcher.on('unlink', (filePath) => {
      const tsPath = filePath.replace(/\.css$/, '-styles.ts');
      if (fs.existsSync(tsPath)) {
        fs.unlinkSync(tsPath);
        console.log(`Removed: ${path.relative(projectRoot, tsPath)}`);
      }
    });

    process.on('SIGINT', () => {
      console.log('\nStopping watcher...');
      watcher.close();
      process.exit(0);
    });
  } catch (error) {
    console.error('Error starting watcher:', error.message);
    console.error(
      'Make sure chokidar is installed: npm install --save-dev chokidar'
    );
    process.exit(1);
  }
}

// Main entry point
const command = process.argv[2];

if (command === 'watch') {
  await watchStyles();
} else if (command === 'build') {
  convertAllStyles(true); // minify for build
} else {
  convertAllStyles(false); // no minify for default
}
