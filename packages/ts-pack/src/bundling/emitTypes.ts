import { cwd } from 'node:process'
import { dirname } from 'node:path'

import { getAggregatedConfig, getPkgJson } from '../configs'

import dts from 'rollup-plugin-dts'

import { createOutputOptions, buildBundle, listExternals } from './utils'

export async function emitTypes() {
  const currentDirectory = cwd()
  const pkgJson = await getPkgJson(currentDirectory)
  const packConfig = await getAggregatedConfig(pkgJson)

  const external = listExternals({ pkgJson, packConfig })

  const plugins = [
    dts({
      tsconfig: packConfig.tsConfig,
      compilerOptions: {
        outDir: dirname(pkgJson.types),
        emitDeclarationOnly: true,
      },
    }),
  ]

  const outputOptions = [
    createOutputOptions({
      dir: dirname(pkgJson.types),
      entryFileNames: `[name].d.ts`,
      format: `esm`,
    }),
  ]

  await buildBundle({
    input: packConfig.inputFile,
    name: 'Type declarations',
    outputOptions,
    plugins,
    external,
  })
}
