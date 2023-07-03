import { describe, test, expect } from '@jest/globals'
import { DataSource } from './datasource'

describe('DataSource Construction', () => {
  test('DataSource class exists', () => {
    expect(DataSource).toBeDefined()
  })
  describe('class methods', () => {
    describe('toJSON', () => {
      test(`method exists`, () => {
        expect(new DataSource().toJSON).toBeDefined()
      })
      test('returns JSON object', () => {
        const actualJSON = new DataSource().toJSON()
        expect(actualJSON).toMatchObject({})
      })
    })
  })
})
