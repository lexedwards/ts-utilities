import { cwd } from 'node:process'
import { getPkgJson } from '../configs'
import { inspectPackageConfigs } from './inspectPackage'
import { inspectPackConfigs } from './inspectConfig'

export async function doctor() {
  const currentDirectory = cwd()
  const pkgJson = await getPkgJson(currentDirectory)
  inspectPackageConfigs(pkgJson)
  console.log('')
  inspectPackConfigs(pkgJson)
}
