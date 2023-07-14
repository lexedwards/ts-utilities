import { describe, test, expect } from '@jest/globals'
import { Row } from './row'

describe('Row Construction', () => {
  test('Row class exists', () => {
    expect(Row).toBeDefined()
  })
  describe('class methods', () => {
    describe('toJSON', () => {
      test(`method exists`, () => {
        expect(new Row().toJSON).toBeDefined()
      })
      test('returns JSON object', () => {
        const actualJSON = new Row().toJSON()
        expect(actualJSON).toMatchObject({})
      })
    })
  })
})
