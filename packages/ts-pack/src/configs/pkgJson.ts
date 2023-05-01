import { join } from 'node:path'
import { readFile } from 'node:fs/promises'
import { z } from 'zod'
import { tsPackConfig } from './packConfig'

const exportValue = z
  .record(
    z.enum(['default', 'import', 'node', 'require', 'types']),
    z.string().optional(),
  )
  .optional()

const scopedPackageJson = z.object({
  dependencies: z.record(z.string(), z.string()).optional(),
  exports: z
    .object({
      '.': exportValue,
    })
    .optional(),
  files: z.array(z.string()).optional(),
  main: z.string().optional(),
  module: z.string().optional(),
  name: z.string().optional(),
  peerDependencies: z.record(z.string(), z.string()).optional(),
  'ts-pack': tsPackConfig.partial().optional(),
  type: z.enum(['commonjs', 'module']).optional(),
  types: z.string().optional(),
  version: z.string().optional(),
})

export type ScopedPackageJson = z.infer<typeof scopedPackageJson>

export async function getPkgJson(cwd: string): Promise<ScopedPackageJson> {
  const file = await readFile(join(cwd, 'package.json'), { encoding: 'utf-8' })
  return scopedPackageJson.parse(JSON.parse(file))
}
