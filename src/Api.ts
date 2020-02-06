/// <reference path="schema.d.ts" />
import request from 'request-promise-native'
import * as url from 'url'

class Api {
  private basePath: string
  private requestHeaders: any

  constructor(token: string, server = "https://api.nature.global/1/") {
    this.basePath = server
    this.requestHeaders = { 'Authorization': 'Bearer ' + token }
  }

  async GetMe(): Promise<RemoAPI.User | null> {
    return JSON.parse(await request.get(url.resolve(this.basePath, 'users/me'), { headers: this.requestHeaders })
      .catch((reason) => {
        console.log(reason)
        return null
      }))
  }

  async PostMe(nickname: string): Promise<RemoAPI.User | null> {
    return JSON.parse(await request.post(url.resolve(this.basePath, 'users/me'),
      {
        headers: this.requestHeaders,
        form: { nickname: nickname }
      })
      .catch((reason) => {
        console.log(reason)
        return null
      }))
  }

}

export default Api
