const fs = require('fs/promises');
const path = require('path');

async function main() {
  const rootDir = path.resolve(__dirname, '..');
  const outputDir = path.join(rootDir, 'dist', 'obsidian-csv-tables');
  const filesToCopy = ['main.js', 'manifest.json', 'styles.css'];

  await fs.rm(outputDir, { recursive: true, force: true });
  await fs.mkdir(outputDir, { recursive: true });

  for (const fileName of filesToCopy) {
    const sourcePath = path.join(rootDir, fileName);
    const destinationPath = path.join(outputDir, fileName);
    await fs.copyFile(sourcePath, destinationPath);
  }

  console.log(`Copied ${filesToCopy.length} files to ${outputDir}`);
}

main().catch((error) => {
  console.error('Failed to package plugin files:', error);
  process.exit(1);
});
