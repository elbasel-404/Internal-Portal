import fs from 'fs';
import path from 'path';

const iconsDir = path.join(__dirname, '../');
const iconFiles = fs.readdirSync(iconsDir);
type InvalidFile = { file: string; reason: string };
const invalidFiles: InvalidFile[] = [];

iconFiles.forEach((file) => {
  const fileExtension = path.extname(file);
  const fileName = path.basename(file, fileExtension);
  const fileContainsIcon = fileName.includes('Icon');
  if (fileContainsIcon) {
    invalidFiles.push({ file, reason: 'File name contains `Icon`' });
  }

  const fileEndsWithDotIcon = fileName.endsWith('.icon');
  if (!fileEndsWithDotIcon) {
    invalidFiles.push({ file, reason: 'File name does not end with `.icon`' });
  }
});
console.table(iconFiles);
console.table(invalidFiles);
