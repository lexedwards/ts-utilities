import { describe, test, expect } from '@jest/globals'
import { Variable } from './variable'

describe('Variable Construction', () => {
  test('Variable class exists', () => {
    expect(Variable).toBeDefined()
  })
  describe('class methods', () => {
    describe('toJSON', () => {
      test(`method exists`, () => {
        expect(new Variable().toJSON).toBeDefined()
      })
      test('returns JSON object', () => {
        const actualJSON = new Variable().toJSON()
        expect(actualJSON).toMatchObject({})
      })
    })
  })
})
