import { describe, test, expect } from '@jest/globals'
import { randomString } from '~/src/utils/randomString'

const ALPHABET =
  'ABCDEFGHIJJKLMNOPQRSTUVWXYZ01234567890abcdefghijklmnopqrstuvwxyz'

describe('randomString fn', () => {
  test('returns a string of determined length (10)', () => {
    const actual = randomString(10)
    expect(actual.length).toBe(10)
  })
  test('returns a string only containing the alpha-numeric alphabet', () => {
    const actual = randomString(40)
    const actualCharsPresentInAlphabet = actual.split('').reduce((acc, cur) => {
      const includedIn = ALPHABET.includes(cur)
      return (acc += includedIn ? 1 : 0)
    }, 0)
    expect(actualCharsPresentInAlphabet).toBe(40)
  })
})
