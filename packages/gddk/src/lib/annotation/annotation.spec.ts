import { describe, test, expect } from '@jest/globals'
import { Annotation } from './annotation'

describe('Annotation Construction', () => {
  test('Annotation class exists', () => {
    expect(Annotation).toBeDefined()
  })
  describe('class methods', () => {
    describe('toJSON', () => {
      test(`method exists`, () => {
        expect(new Annotation().toJSON).toBeDefined()
      })
      test('returns JSON object', () => {
        const actualJSON = new Annotation().toJSON()
        expect(actualJSON).toMatchObject({})
      })
    })
  })
})
