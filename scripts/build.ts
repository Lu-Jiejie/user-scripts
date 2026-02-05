import { execSync } from 'node:child_process'
import path from 'node:path'
import fs from 'fs-extra'

const packagesPath = path.join(__dirname, '../packages')
const packages = fs.readdirSync(packagesPath).map(dir => path.join(packagesPath, dir))
const distPath = path.join(__dirname, '../dist')

fs.ensureDirSync(distPath)

packages.forEach((pkg) => {
  console.log(`Building ${pkg}...`)
  execSync(`pnpm run build`, { stdio: 'inherit', cwd: pkg })

  // copy to root dist
  const distSrc = path.join(pkg, 'dist')
  if (fs.existsSync(distSrc)) {
    console.log(`Copying ${path.basename(pkg)} dist to root...`)
    fs.copySync(distSrc, distPath, { overwrite: true })
  }
})
