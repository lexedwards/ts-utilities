import { cwd } from 'node:process'
import { transpile, emitTypes, watchMode } from './bundling'
import { getPkgJson, getAggregatedConfig } from './configs'
import { doctor, help } from './doctor'
import { cyan } from './std'
import { assertFile } from './fileSystem/verification'
import { init } from './doctor/init'

async function pack() {
  const currentDirectory = cwd()
  await assertFile(currentDirectory, 'package.json')
  const pkgJson = await getPkgJson(currentDirectory)
  const packConfig = await getAggregatedConfig(pkgJson)
  console.info(
    `\n🚀 ${cyan('Running TS-Pack:')} ${pkgJson.name}@${pkgJson.version}\n`,
  )

  if (packConfig.help) {
    return help()
  }
  if (packConfig.doctor) {
    return doctor()
  }
  if (packConfig.init) {
    return init()
  }

  if (packConfig.watch) {
    return watchMode()
  }

  await assertFile(currentDirectory, 'tsconfig.json')

  const packageTypes = !!pkgJson.types
  await Promise.all(
    [transpile(), packageTypes ? emitTypes() : null].filter(Boolean),
  )
}

pack()
