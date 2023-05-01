export function red(text: string): string {
  return `\x1b[31m${text}\x1b[0m`
}

export function green(text: string): string {
  return `\x1b[32m${text}\x1b[0m`
}

export function yellow(text: string): string {
  return `\x1b[33m${text}\x1b[0m`
}

export function cyan(text: string): string {
  return `\x1b[96m${text}\x1b[0m`
}
