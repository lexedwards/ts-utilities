import {
  readFile as fsReadFile,
  writeFile as fsWriteFile,
} from 'node:fs/promises'
import { join } from 'node:path'

export async function readFile(relativePath: string, file: string) {
  return fsReadFile(join(relativePath, file), { encoding: 'utf-8' })
}

export async function writeFile(
  relativePath: string,
  file: string,
  data: string,
) {
  return fsWriteFile(join(relativePath, file), data, { encoding: 'utf-8' })
}
