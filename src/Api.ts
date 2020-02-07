/// <reference path="schema.d.ts" />
import request from 'request-promise-native'
import * as url from 'url'

class Api {
  private basePath: string
  private requestHeaders: any
  remaining: number = 0

  constructor(token: string, server = "https://api.nature.global/1/") {
    this.basePath = server
    this.requestHeaders = { 'Authorization': 'Bearer ' + token }
  }

  async GetMe(): Promise<RemoAPI.User | null> {
    return this.get('users/me')
  }

  async PostMe(nickname: string): Promise<RemoAPI.User | null> {
    return this.post('users/me', { nickname: nickname })
  }

  async GetDevices(): Promise<Array<RemoAPI.Device> | null> {
    return this.get('devices')
  }

  async GetAppliances(): Promise<Array<RemoAPI.Appliance> | null> {
    return this.get('appliances')
  }

  private updateRemaining(remaining: number) {
    this.remaining = remaining
  }

  private async get(path: string): Promise<any> {
    return JSON.parse(
      await request.get(
        url.resolve(this.basePath, path),
        { headers: this.requestHeaders },
        (err, res, body) => {
          this.updateRemaining(parseInt(res?.headers['x-rate-limit-remaining'] as string))
          return body;
        }
      )
        .catch((reason) => {
          console.log(reason)
          return null
        })
    )
  }

  private async post(path: string, form: any): Promise<any> {
    return JSON.parse(
      await request.post(
        url.resolve(this.basePath, path),
        {
          headers: this.requestHeaders,
          form: form,
        },
        (err, res, body) => {
          this.updateRemaining(parseInt(res?.headers['x-rate-limit-remaining'] as string))
          return body;
        }
      )
        .catch((reason) => {
          console.log(reason)
          return null
        })
    )
  }

}

export default Api
