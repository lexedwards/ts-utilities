import { MockAgent, setGlobalDispatcher } from 'undici'

const mockOrigin = 'https://mock.local'
const mockAccessToken = 'abcdefgh12345678'

const httpMock = new MockAgent()
httpMock.disableNetConnect()

const client = httpMock.get(new URL(mockOrigin).origin)
client
  .intercept({
    path: '/api/login/ping',
    method: 'POST',
    headers: {
      Authorization: (body: string) => body === `Bearer ${mockAccessToken}`,
    },
  })
  .reply(200)

client
  .intercept({
    path: '/api/login/ping',
    method: 'POST',
  })
  .reply(400)

client
  .intercept({
    path: '/api/dashboards/db',
    method: 'POST',
  })
  .reply(200)

export { httpMock, mockOrigin, mockAccessToken, setGlobalDispatcher }
