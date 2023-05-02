import { parseArgs } from 'node:util'
import { z } from 'zod'
import { ScopedPackageJson } from './pkgJson'

const argsReturn = parseArgs({
  options: {
    help: {
      type: 'boolean',
      short: 'h',
    },
    doctor: {
      type: 'boolean',
      short: 'd',
    },
    tsConfig: {
      type: 'string',
      short: 'c',
    },
    inputFile: {
      type: 'string',
      short: 'i',
    },
    bundle: {
      type: 'boolean',
      short: 'b',
    },
    preserveModules: {
      type: 'boolean',
      short: 'p',
    },
    init: {
      type: 'boolean',
    },
  },
})

export const tsPackConfig = z.object({
  help: z.boolean(),
  doctor: z.boolean(),
  tsConfig: z.string(),
  inputFile: z.string(),
  bundle: z.boolean(),
  preserveModules: z.boolean(),
  init: z.boolean(),
})

export type TsPackConfig = z.infer<typeof tsPackConfig>

export const DEFAULT_CONFIG: TsPackConfig = {
  help: false,
  doctor: false,
  tsConfig: 'tsconfig.json',
  inputFile: 'src/index.ts',
  bundle: false,
  preserveModules: false,
  init: false,
}

export async function getAggregatedConfig(
  pkgJson: ScopedPackageJson,
): Promise<TsPackConfig> {
  const fromPkgJson = pkgJson['ts-pack'] || {}
  return tsPackConfig.parse(
    Object.assign({}, DEFAULT_CONFIG, fromPkgJson, argsReturn.values),
  )
}
