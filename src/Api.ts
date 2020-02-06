/// <reference path="schema.d.ts" />
import request from 'request-promise-native'
import * as path from 'path'

class Api {
  private basePath: string
  private requestHeaders: Map<string, string>

  constructor(token: string, server = "https://api.nature.global/1") {
    this.basePath = server
    this.requestHeaders = new Map<string, string>([['Authorization', 'Bearer ' + token]])
  }

  async GetMe(): Promise<RemoAPI.User | null> {
    return await request.get(path.join(this.basePath, 'users', 'me'), { headers: this.requestHeaders }).catch((reason) => {
      console.log(reason)
      return null
    })
  }

  async PostMe(nickname: string): Promise<RemoAPI.User | null> {
    return await request.post(path.join(this.basePath, 'users', 'me'),
      {
        headers: this.requestHeaders,
        form: { nickname: nickname }
      })
      .catch((reason) => {
        console.log(reason)
        return null
      })
  }

}

export default Api
