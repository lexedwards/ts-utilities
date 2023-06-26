import { dirname, extname } from 'node:path'
import { InputPluginOption, OutputOptions, RollupBuild, rollup } from 'rollup'
import { ScopedPackageJson, TsPackConfig } from '../configs'

import nodeResolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import { swc, defineRollupSwcOption, minify } from 'rollup-plugin-swc3'
import commonjs from '@rollup/plugin-commonjs'

export async function writeToBundle(
  bundle: RollupBuild,
  ...options: OutputOptions[]
) {
  await Promise.all(
    options.map(async (opt) => {
      await bundle.write(opt)
    }),
  )
}

interface TranspileProps {
  tsConfig?: string
}
export function transpilePlugins({ tsConfig }: TranspileProps) {
  return [
    nodeResolve({
      preferBuiltins: true,
    }),
    json(),
    commonjs(),
    swc(
      defineRollupSwcOption({
        tsconfig: tsConfig,
        minify: false,
      }),
    ),
    minify(),
  ]
}

function mapToRegex(stringValue: string): RegExp {
  return new RegExp(stringValue)
}

interface ListExternals {
  pkgJson: ScopedPackageJson
  packConfig: TsPackConfig
}
export function listExternals({
  pkgJson,
  packConfig,
}: ListExternals): Array<string | RegExp> {
  const alwaysExclude = [
    ...Object.keys(pkgJson.devDependencies || {}),
    ...Object.keys(pkgJson.peerDependencies || {}),
  ]

  if (packConfig.bundle)
    return [...alwaysExclude, ...packConfig.external].map(mapToRegex)
  return [...alwaysExclude, ...Object.keys(pkgJson.dependencies || {})].map(
    mapToRegex,
  )
}

export function createOutputOptions(overrides: OutputOptions): OutputOptions {
  return {
    preserveModules: false,
    ...overrides,
  }
}

export function createModuleOutputOptions(
  pkg: ScopedPackageJson,
): OutputOptions[] {
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

interface BuildOptions {
  input: string
  external?: Array<string | RegExp>
  name: string
  outputOptions: Array<OutputOptions>
  plugins?: InputPluginOption
}

export async function buildBundle({
  input,
  external,
  name,
  outputOptions,
  plugins,
}: BuildOptions) {
  const bundle = await rollup({
    input,
    plugins,
    external,
    perf: true,
    watch: {
      clearScreen: true,
      include: dirname(input),
    },
    onwarn(warning, warn) {
      warn(warning)
    },
  })
  let buildFailed = false
  try {
    await writeToBundle(bundle, ...outputOptions)

    const bundleTimings = bundle.getTimings?.()

    console.info(
      `${name} generated in ${bundleTimings['# GENERATE'][0].toFixed(2)} ms`,
    )
  } catch (error) {
    buildFailed = true
    console.error(`TS-Pack Error:`, error)
  }

  await bundle.close()

  if (buildFailed) {
    return Promise.reject()
  }
  return Promise.resolve()
}
