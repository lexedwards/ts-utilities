import { green, red, yellow } from './colours'

export const NULL = yellow(`○`)
export const TICK = green(`✓`)
export const CROSS = red(`✕`)

export function boolEmoji(value: boolean | undefined) {
  if (typeof value === 'undefined') return NULL
  return value ? TICK : CROSS
}
