import { cwd } from 'node:process'
import { dirname } from 'node:path'
import { getAggregatedConfig, getPkgJson } from '../configs'
import {
  createModuleOutputOptions,
  createOutputOptions,
  listExternals,
  transpilePlugins,
} from './utils'

import { WatcherOptions, watch } from 'rollup'

import dts from 'rollup-plugin-dts'

export async function watchMode() {
  const currentDirectory = cwd()
  const pkgJson = await getPkgJson(currentDirectory)
  const packConfig = await getAggregatedConfig(pkgJson)

  const external = listExternals({ pkgJson, packConfig })

  const watchOptions: WatcherOptions = {
    buildDelay: 200,
    include: 'src/**',
    exclude: 'node_modules/**',
  }

  const watcherTranspile = watch({
    input: packConfig.inputFile,
    plugins: transpilePlugins(packConfig),
    output: createModuleOutputOptions(pkgJson),
    external,
    watch: watchOptions,
  })

  watcherTranspile.on('event', (event) => {
    if (event.code === 'START') {
      console.log('Re/Starting in watch mode...')
    }
    if (event.code === 'BUNDLE_END') {
      if (event.result) {
        event.result.close()
      }
    }
    if (event.code === 'ERROR') {
      if (event.result) {
        event.result.close()
      }
    }
  })

  if (pkgJson.types) {
    const watcherTypes = watch({
      input: packConfig.inputFile,
      plugins: [
        dts({
          tsconfig: packConfig.tsConfig,
          compilerOptions: {
            outDir: dirname(pkgJson.types),
            emitDeclarationOnly: true,
          },
        }),
      ],
      output: [
        createOutputOptions({
          dir: dirname(pkgJson.types),
          entryFileNames: `[name].d.ts`,
          format: `esm`,
        }),
      ],
      external,
      watch: watchOptions,
    })
    watcherTypes.on('event', (event) => {
      if (event.code === 'BUNDLE_END') {
        if (event.result) {
          event.result.close()
        }
      }
    })
  }
}
