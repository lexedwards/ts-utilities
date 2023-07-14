import { describe, test, expect } from '@jest/globals'
import { Alert } from './alert'

describe('Alert Construction', () => {
  test('Alert class exists', () => {
    expect(Alert).toBeDefined()
  })
  describe('class methods', () => {
    describe('toJSON', () => {
      test(`method exists`, () => {
        expect(new Alert().toJSON).toBeDefined()
      })
      test('returns JSON object', () => {
        const actualJSON = new Alert().toJSON()
        expect(actualJSON).toMatchObject({})
      })
    })
  })
})
