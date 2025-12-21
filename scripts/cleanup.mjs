import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

const colors = {
  reset: '\x1b[0m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
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
 * Recursively find and remove compiled JavaScript files
 * @param {string} dir - Directory to search
 * @param {number} count - Counter for deleted files
 * @returns {number} Number of files deleted
 */
function cleanupCompiledFiles(dir, count = 0) {
  try {
    const files = fs.readdirSync(dir, { withFileTypes: true });

    for (const file of files) {
      const fullPath = path.join(dir, file.name);

      if (
        file.isDirectory() &&
        !['.git', 'node_modules', 'dist', '.github'].includes(file.name) &&
        !file.name.startsWith('.')
      ) {
        count = cleanupCompiledFiles(fullPath, count);
      } else if (file.isFile()) {
        if (file.name.endsWith('.js') || file.name.endsWith('.js.map')) {
          const tsFile = fullPath.replace(/\.js(\.map)?$/, '.ts');
          const mjsFile = fullPath.replace(/\.js(\.map)?$/, '.mjs');

          if (
            (file.name.endsWith('.js') &&
              (fs.existsSync(tsFile) || fs.existsSync(mjsFile))) ||
            file.name.endsWith('.js.map')
          ) {
            try {
              fs.unlinkSync(fullPath);
              console.log(
                `${timestamp()} ${colors.red}✗${colors.reset} ${colors.dim}${path.basename(fullPath)}${colors.reset}`
              );
              count++;
            } catch (error) {
              console.error(
                `${timestamp()} ${colors.red}Failed: ${path.basename(fullPath)}${colors.reset}`
              );
            }
          }
        }
      }
    }

    return count;
  } catch (error) {
    console.error(`Error scanning directory ${dir}: ${error.message}`);
    return count;
  }
}

/**
 * Clean up generated files in specific output directories
 * @returns {number} Number of files deleted
 */
function cleanupBuildDirs() {
  let count = 0;
  const buildDirs = [
    path.join(projectRoot, 'docs/dist'),
  ];

  for (const dir of buildDirs) {
    if (fs.existsSync(dir)) {
      try {
        fs.rmSync(dir, { recursive: true, force: true });
        console.log(
          `${timestamp()} ${colors.red}✗${colors.reset} ${colors.dim}${path.basename(dir)}/${colors.reset}`
        );
        count++;
      } catch (error) {
        console.error(
          `${timestamp()} ${colors.red}Failed: ${path.basename(dir)}${colors.reset}`
        );
      }
    }
  }

  return count;
}

console.log(
  `${timestamp()} ${colors.blue}Cleaning up compiled files${colors.reset}`
);

const srcDir = path.join(projectRoot, 'src');
const scriptsDir = path.join(projectRoot, 'scripts');
const docsDir = path.join(projectRoot, 'docs');

let totalDeleted = 0;

totalDeleted += cleanupCompiledFiles(srcDir);
totalDeleted += cleanupCompiledFiles(scriptsDir);
totalDeleted += cleanupCompiledFiles(docsDir);
totalDeleted += cleanupBuildDirs();

console.log(
  `${timestamp()} ${colors.green}✓ Done${colors.reset} ${colors.dim}(${totalDeleted} files)${colors.reset}`
);
