import { Client as UndiciClient, request, setGlobalDispatcher } from 'undici'
import { URL } from 'node:url'

interface ClientProps {
  baseUrl: string
  accessToken: string
  httpConnectionOptions?: UndiciClient.Options['connect']
}

export class Client {
  #authHeader: string
  #baseURL: string
  #loggedIn = false
  constructor({ accessToken, baseUrl, httpConnectionOptions }: ClientProps) {
    this.#baseURL = baseUrl
    this.#setAuth(accessToken)
    setGlobalDispatcher(
      new UndiciClient(new URL(baseUrl).origin, {
        connect: { ...httpConnectionOptions },
      }),
    )
  }

  #setAuth(token: string) {
    this.#authHeader = `Bearer ${token}`
  }

  #getHeaders() {
    return {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: this.#authHeader,
    }
  }

  #getUrl(path: string) {
    return new URL(path, this.#baseURL).href
  }

  async #login() {
    const { statusCode } = await request(this.#getUrl('/api/login/ping'), {
      method: 'POST',
      headers: this.#getHeaders(),
    })
    if (statusCode !== 200) {
      throw new Error(
        `Status: ${statusCode}; There was a problem authenticating with Grafana. 
Please check your authentication token and baseUrl configurations`,
      )
    }
    this.#loggedIn = true
  }

  // TODO
  async putDashboard() {
    if (!this.#loggedIn) await this.#login()
    const { statusCode } = await request(this.#getUrl('/api/dashboards/db'), {
      method: 'POST',
      headers: this.#getHeaders(),
    })
    return statusCode
  }
}
