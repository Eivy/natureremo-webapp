/// <reference path="schema.d.ts" />
import request from 'request-promise-native';
import * as path from 'path';
import * as url from 'url';

class Api {
  private static basePath: string = "https://api.nature.global/1/";
  private static requestHeaders: any;
  private static remaining: number = 0;

  static setApi(server: string) {
    Api.basePath = server;
  }

  static setToken(token: string) {
    Api.requestHeaders = { 'Authorization': 'Bearer ' + token };
  }

  static getRemaining(): number {
    return Api.remaining;
  }

  static async GetMe(): Promise<RemoAPI.User | null> {
    return Api.get('users/me');
  }

  static async PostMe(nickname: string): Promise<RemoAPI.User | null> {
    return Api.post('users/me', { nickname: nickname });
  }

  static async GetDevices(): Promise<Array<RemoAPI.Device> | null> {
    return Api.get('devices');
  }

  static async GetAppliances(): Promise<Array<RemoAPI.Appliance> | null> {
    return Api.get('appliances');
  }

  static async SendSignal(signal_id: string): Promise<void> {
    return request.post(url.resolve(Api.basePath, path.join('signals', signal_id, 'send')),
      { headers: Api.requestHeaders },
      (err, res, body) => {
        if (res.statusCode !== 200) {
          throw new Error('failed to send signal');
        }
        return null;
      });
  }

  private static updateRemaining(remaining: number) {
    Api.remaining = remaining;
  }

  private static async get(path: string): Promise<any> {
    return JSON.parse(
      await request.get(
        url.resolve(Api.basePath, path),
        { headers: Api.requestHeaders },
        (err, res, body) => {
          Api.updateRemaining(parseInt(res?.headers['x-rate-limit-remaining'] as string));
          return body;
        }
      )
        .catch((reason) => {
          console.log(reason)
          return null
        })
    );
  }

  private static async post(path: string, form: any): Promise<any> {
    return JSON.parse(
      await request.post(
        url.resolve(Api.basePath, path),
        {
          headers: Api.requestHeaders,
          form: form,
        },
        (err, res, body) => {
          Api.updateRemaining(parseInt(res?.headers['x-rate-limit-remaining'] as string))
          return body;
        }
      )
        .catch((reason) => {
          console.log(reason)
          return null
        })
    );
  }

}

export default Api;
