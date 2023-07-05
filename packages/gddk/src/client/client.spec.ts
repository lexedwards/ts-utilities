import { describe, test, expect } from '@jest/globals'
import { Client } from './client'

import {
  mockOrigin,
  httpMock,
  setGlobalDispatcher,
  mockAccessToken,
} from '~/test/http/agent'

describe('Grafana Client', () => {
  test('returning an instance of "Client"', () => {
    const client = new Client({
      accessToken: mockAccessToken,
      baseUrl: mockOrigin,
    })
    expect(client).toBeInstanceOf(Client)
  })
  test('failing to ping login endpoint before first request sent', async () => {
    const client = new Client({
      accessToken: 'NOT A TOKEN',
      baseUrl: mockOrigin,
    })
    setGlobalDispatcher(httpMock)
    await expect(client.putDashboard()).rejects
      .toThrow(`Status: 400; There was a problem authenticating with Grafana. 
Please check your authentication token and baseUrl configurations`)
  })
})
