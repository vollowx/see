import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

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

      // Skip node_modules, .git, and other build directories
      if (
        file.isDirectory() &&
        !['.git', 'node_modules', 'dist', '.github'].includes(file.name) &&
        !file.name.startsWith('.')
      ) {
        count = cleanupCompiledFiles(fullPath, count);
      } else if (file.isFile()) {
        // Remove .js and .js.map files that have corresponding .ts files
        if (file.name.endsWith('.js') || file.name.endsWith('.js.map')) {
          const tsFile = fullPath.replace(/\.js(\.map)?$/, '.ts');
          const mjsFile = fullPath.replace(/\.js(\.map)?$/, '.mjs');

          // Only delete if source TypeScript file exists
          if (
            (file.name.endsWith('.js') &&
              (fs.existsSync(tsFile) || fs.existsSync(mjsFile))) ||
            file.name.endsWith('.js.map')
          ) {
            try {
              fs.unlinkSync(fullPath);
              console.log(`✓ Removed: ${path.relative(projectRoot, fullPath)}`);
              count++;
            } catch (error) {
              console.error(
                `✗ Failed to remove ${path.relative(projectRoot, fullPath)}: ${error.message}`
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
        console.log(`✓ Removed directory: ${path.relative(projectRoot, dir)}`);
        count++;
      } catch (error) {
        console.error(
          `✗ Failed to remove ${path.relative(projectRoot, dir)}: ${error.message}`
        );
      }
    }
  }

  return count;
}

// Main entry point
console.log('Cleaning up compiled JavaScript files...\n');

const srcDir = path.join(projectRoot, 'src');
const scriptsDir = path.join(projectRoot, 'scripts');
const docsDir = path.join(projectRoot, 'docs');

let totalDeleted = 0;

totalDeleted += cleanupCompiledFiles(srcDir);
totalDeleted += cleanupCompiledFiles(scriptsDir);
totalDeleted += cleanupCompiledFiles(docsDir);
totalDeleted += cleanupBuildDirs();

console.log(`\n✓ Cleanup complete: ${totalDeleted} file(s)/director(ies) removed.`);
