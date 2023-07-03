import { describe, test, expect } from '@jest/globals'
import { Panel } from './panel'

describe('Panel Construction', () => {
  test('Panel class exists', () => {
    expect(Panel).toBeDefined()
  })
  describe('class methods', () => {
    describe('toJSON', () => {
      test(`method exists`, () => {
        expect(new Panel().toJSON).toBeDefined()
      })
      test('returns JSON object', () => {
        const actualJSON = new Panel().toJSON()
        expect(actualJSON).toMatchObject({})
      })
    })
  })
})
