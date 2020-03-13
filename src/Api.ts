/// <reference path="schema.d.ts" />
import * as path from 'path';
import * as url from 'url';

class Api {
  private static basePath: string = "https://api.nature.global/1/";
  private static requestHeaders: { [key: string]: string } = {};

  static setApi(server: string) {
    Api.basePath = server;
  }

  static setToken(token: string) {
    Api.requestHeaders = { 'Authorization': 'Bearer ' + token };
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
    return Api.post(path.join('signals', signal_id, 'send'), null);
  }

  static async SendTVButton(appliance_id: string, button: string): Promise<RemoAPI.TVState> {
    return Api.post(path.join('appliances', appliance_id, 'tv'), { button: button });
  }

  static async SendLightButton(appliance_id: string, button: string): Promise<RemoAPI.LIGHTState> {
    return Api.post(path.join('appliances', appliance_id, 'light'), { button: button });
  }

  static async SendAirconSettings(appliance_id: string, options: { temperature?: string, operation_mode?: string, air_volume?: string, air_direction?: string, button?: string }): Promise<RemoAPI.AirConParams> {
    return Api.post(
      url.resolve(Api.basePath, path.join('appliances', appliance_id, 'aircon_settings')), options);
  }

  private static async get(path: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url.resolve(Api.basePath, path), true);
      Object.keys(Api.requestHeaders).forEach((k: string) => xhr.setRequestHeader(k, Api.requestHeaders[k]));
      xhr.onload = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          if (xhr.responseText) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            resolve(null);
          }
        } else {
          reject(new Error(xhr.statusText));
        }
      };
      xhr.onerror = () => reject(new Error(xhr.statusText));
      xhr.send(null);
    });
  }

  private static async post(path: string, form: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', url.resolve(Api.basePath, path), true);
      Object.keys(Api.requestHeaders).forEach((k: string) => xhr.setRequestHeader(k, Api.requestHeaders[k]));
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.onload = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          if (xhr.responseText) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            resolve(null);
          }
        } else {
          reject(new Error(xhr.statusText));
        }
      };
      xhr.onerror = () => reject(new Error(xhr.statusText));
      xhr.send(Api.EncodeHTMLForm(form));
    });
  }

  private static EncodeHTMLForm(data: any): string {
    var params = [];

    for (var name in data) {
      var value = data[name];
      var param = encodeURIComponent(name) + '=' + encodeURIComponent(value);

      params.push(param);
    }

    return params.join('&').replace(/%20/g, '+');
  }

}

export default Api;
