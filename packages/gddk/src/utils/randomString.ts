import { randomBytes } from 'node:crypto'

const ALPHABET =
  'ABCDEFGHIJJKLMNOPQRSTUVWXYZ01234567890abcdefghijklmnopqrstuvwxyz'
const ALPHABET_LENGTH = ALPHABET.length

export function randomString(length: number) {
  const shuffledAlphabet = [...ALPHABET]
    .sort(() => Math.random() - 0.5)
    .join('')
  const randomBytePool = randomBytes(length)
  const result = new Array(length)
  let cursor = 0
  for (let i = 0; i < length; i++) {
    cursor += randomBytePool[i]
    result[i] = shuffledAlphabet[cursor % ALPHABET_LENGTH]
  }

  return result.join('')
}
