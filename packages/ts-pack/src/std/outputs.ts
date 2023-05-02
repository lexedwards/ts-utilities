import { red, yellow, cyan } from './colours'
import { boolEmoji } from './symbols'

export function logResult(value: boolean | undefined, message: string) {
  console.info(` ${boolEmoji(value)} - ${message.trim()}`)
}

export function logInfo(message: string) {
  console.info(`\n${cyan(message)}\n`)
}

export function logWarning(message: string) {
  console.warn(`\n${yellow(message)}\n`)
}

export function logError(message: string) {
  console.error(`\n${red(message)}\n`)
}
