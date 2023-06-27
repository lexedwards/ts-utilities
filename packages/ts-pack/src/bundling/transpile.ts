import { cwd } from 'node:process'

import { getAggregatedConfig, getPkgJson } from '../configs'

import {
  buildBundle,
  createModuleOutputOptions,
  listExternals,
  transpilePlugins,
} from './utils'

export async function transpile() {
  const currentDirectory = cwd()
  const pkgJson = await getPkgJson(currentDirectory)
  const packConfig = await getAggregatedConfig(pkgJson)

  const external = listExternals({ pkgJson, packConfig })

  const plugins = transpilePlugins(packConfig)

  const outputOptions = createModuleOutputOptions(pkgJson)

  await buildBundle({
    input: packConfig.inputFile,
    name: 'Module bundles',
    outputOptions,
    plugins,
    external,
  })
}
