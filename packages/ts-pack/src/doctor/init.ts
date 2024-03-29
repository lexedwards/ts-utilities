import { cwd } from 'node:process'
import { sep } from 'node:path'
import { getPkgJson } from '../configs'
import { DEFAULT_CONFIG } from '../configs'
import { writeFile } from '../fileSystem/io'

export async function init() {
  const currentDirectory = cwd()
  const pkgJson = await getPkgJson(currentDirectory)
  const curFolder = currentDirectory.split(sep).pop()

  pkgJson.name = pkgJson.name || curFolder
  pkgJson.version = pkgJson.version || '1.0.0'
  pkgJson.files = pkgJson.files || ['dist']
  pkgJson.type = 'module'
  pkgJson.main = './dist/cjs/index.cjs'
  pkgJson.module = './dist/esm/index.mjs'
  pkgJson.types = './dist/@types/index.d.ts'
  pkgJson.exports = {
    '.': {
      import: './dist/esm/index.mjs',
      require: './dist/cjs/index.cjs',
      types: './dist/@types/index.d.ts',
    },
  }
  pkgJson['ts-pack'] = pkgJson['ts-pack'] || {
    inputFile: DEFAULT_CONFIG.inputFile,
    tsConfig: DEFAULT_CONFIG.tsConfig,
    bundle: false,
    external: [],
  }

  pkgJson['scripts'] = {
    ...(pkgJson.scripts || {}),
    prebuild: 'rm -rf ./dist',
    build: 'ts-pack',
  }

  await writeFile(
    currentDirectory,
    'package.json',
    JSON.stringify(pkgJson, null, 2),
  )
}
