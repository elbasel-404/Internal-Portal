import fs from "fs"
import path from "path"

const iconsDir = path.join(__dirname, "../")

const iconFiles = fs.readdirSync(iconsDir).filter((file) => {
  return file.endsWith(".tsx")
})

const exports = iconFiles
  .map((file) => {
    const name = path.basename(file, path.extname(file)).replace(".icon", "")
    return `export { ${name}Icon } from './${name}.icon';`
  })
  .join("\n")

fs.writeFileSync(path.join(iconsDir, "index.ts"), exports)

console.log("Export statements generated in index.ts")
console.log(exports)
