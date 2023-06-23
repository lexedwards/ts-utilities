import { dirname } from 'node:path'
import { InputPluginOption, OutputOptions, RollupBuild, rollup } from 'rollup'
import { ScopedPackageJson, TsPackConfig } from '../configs'

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
interface ListExternals {
  pkgJson: ScopedPackageJson
  packConfig: TsPackConfig
}
export function listExternals({
  pkgJson,
  packConfig,
}: ListExternals): Array<string | RegExp> {
  if (packConfig.bundle)
    return packConfig.external.map((stringValue) => new RegExp(stringValue))
  return [
    ...Object.keys(pkgJson.dependencies || {}),
    ...Object.keys(pkgJson.peerDependencies || {}),
  ]
}

export function createOutputOptions(overrides: OutputOptions): OutputOptions {
  return {
    preserveModules: false,
    ...overrides,
  }
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
