import { execSync } from 'node:child_process'
import path from 'node:path'
import process from 'node:process'
import fs from 'fs-extra'
import pc from 'picocolors'
import prompts from 'prompts'

const packagesPath = path.join(__dirname, '../packages')
const packages = fs.readdirSync(packagesPath).filter((dir) => {
  const pkgPath = path.join(packagesPath, dir)
  return fs.statSync(pkgPath).isDirectory()
})

async function main() {
  const response = await prompts({
    type: 'select',
    name: 'packageName',
    message: pc.cyan('Choose a package to release:'),
    choices: packages.map(pkg => ({ title: pkg, value: pkg })),
  })

  const packageName = response.packageName
  if (!packageName) {
    console.error(pc.red('No package selected'))
    process.exit(1)
  }

  const confirm = await prompts({
    type: 'confirm',
    name: 'value',
    message: pc.yellow(`Are you sure you want to release the package: ${packageName}?`),
    initial: false,
  })

  if (!confirm.value) {
    console.log(pc.blue('Release canceled'))
    process.exit(0)
  }

  const packagePath = path.join(packagesPath, packageName)
  const commitMessage = `"chore(${packageName}): release v%s"`
  const tagName = `"${packageName.toLocaleLowerCase()}-v%s"`

  try {
    execSync(`npx bumpp --commit ${commitMessage} --tag ${tagName}`, {
      stdio: 'inherit',
      cwd: packagePath,
    })
    console.log(pc.green('Release successful'))
  }
  catch {
    console.error('Release failed')
  }
}

main().catch((error) => {
  console.error('Error occurred:', error)
  process.exit(1)
})
