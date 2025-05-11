import fs from 'fs';
import path from 'path';

const iconsDir = path.join(__dirname, '../../icons');
const allIconsFilePath = path.join(__dirname, 'allIcons.ts');

const iconFiles = fs.readdirSync(iconsDir);
const allIconsFile = fs.readFileSync(allIconsFilePath, 'utf-8');

const iconNames = iconFiles.map((file) => {
  const iconName = file.split('.')[0] + 'Icon';
  return iconName;
});

const importString = `import { ${iconNames.join(', ')} } from '@icons';`;
const iconsArray = iconNames.map((iconName) => {
  return {
    icon: iconName,
    title: iconName.replace('Icon', ''),
  };
});
let iconJsonString = '{';
for (const name in iconsArray) {
  if (name === 'scripts') continue;
  if (name === 'index') continue;
  iconJsonString += `\n ${iconsArray[name].icon},`;
}
iconJsonString += '}';

fs.writeFileSync(
  allIconsFilePath,
  `${importString}\n\n${allIconsFile}\n\nexport const icons = ${iconJsonString};`
);
