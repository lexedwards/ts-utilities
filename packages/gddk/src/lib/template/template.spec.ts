import { describe, test, expect } from '@jest/globals'
import { Template } from './template'

describe('Template Construction', () => {
  test('Template class exists', () => {
    expect(Template).toBeDefined()
  })
  describe('class methods', () => {
    describe('toJSON', () => {
      test(`method exists`, () => {
        expect(new Template().toJSON).toBeDefined()
      })
      test('returns JSON object', () => {
        const actualJSON = new Template().toJSON()
        expect(actualJSON).toMatchObject({})
      })
    })
  })
})
