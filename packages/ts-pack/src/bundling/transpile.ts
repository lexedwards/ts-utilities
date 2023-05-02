import { cwd } from 'node:process'
import { dirname, extname } from 'node:path'
import { OutputOptions } from 'rollup'

import { nodeResolve } from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import { swc, defineRollupSwcOption, minify } from 'rollup-plugin-swc3'

import { ScopedPackageJson, getAggregatedConfig, getPkgJson } from '../configs'

import { createOutputOptions, buildBundle, listExternals } from './utils'

function createModuleOutputOptions(pkg: ScopedPackageJson): OutputOptions[] {
  const options: OutputOptions[] = []
  if (pkg.main) {
    options.push(
      createOutputOptions({
        dir: dirname(pkg.main),
        entryFileNames: `[name]${extname(pkg.main)}`,
        format: 'cjs',
      }),
    )
  }
  if (pkg.module) {
    options.push(
      createOutputOptions({
        dir: dirname(pkg.module),
        entryFileNames: `[name]${extname(pkg.module)}`,
        format: `esm`,
      }),
    )
  }
  return options
}

export async function transpile() {
  const currentDirectory = cwd()
  const pkgJson = await getPkgJson(currentDirectory)
  const packConfig = await getAggregatedConfig(pkgJson)

  const external = listExternals({ pkgJson, packConfig })

  const plugins = [
    nodeResolve(),
    json(),
    swc(
      defineRollupSwcOption({
        tsconfig: packConfig.tsConfig,
        minify: false,
      }),
    ),
    minify(),
  ]

  const outputOptions = createModuleOutputOptions(pkgJson)

  await buildBundle({
    input: packConfig.inputFile,
    name: 'Module bundles',
    outputOptions,
    plugins,
    external,
  })
}
