import { describe, test, expect } from '@jest/globals'
import { Link } from './link'

describe('Link Construction', () => {
  test('Link class exists', () => {
    expect(Link).toBeDefined()
  })
  describe('class methods', () => {
    describe('toJSON', () => {
      test(`method exists`, () => {
        expect(new Link().toJSON).toBeDefined()
      })
      test('returns JSON object', () => {
        const actualJSON = new Link().toJSON()
        expect(actualJSON).toMatchObject({})
      })
    })
  })
})
