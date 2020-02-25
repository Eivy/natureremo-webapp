import * as cp from 'child_process'
import * as path from 'path'
import Api from './Api'

const sleep = (msec: number) => new Promise((resolve: Function) => setTimeout(resolve, msec))
let sampleDevices: Array<RemoAPI.Device> = [{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "string",
  "temperature_offset": 0,
  "humidity_offset": 0,
  "created_at": "2020-02-06T06:23:20.410Z",
  "updated_at": "2020-02-06T06:23:20.410Z",
  "firmware_version": "string",
  "mac_address": "string",
  "serial_number": "string",
  "newest_events": {
    "te": {
      "val": 0,
      "created_at": "2020-02-06T06:23:20.410Z"
    },
    "hu": {
      "val": 0,
      "created_at": "2020-02-06T06:23:20.410Z"
    },
    "il": {
      "val": 0,
      "created_at": "2020-02-06T06:23:20.410Z"
    },
    "mo": {
      "val": 0,
      "created_at": "2020-02-06T06:23:20.410Z"
    }
  }
}]
let sampleAppliances: Array<RemoAPI.Appliance> = [{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "device": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "name": "string",
    "temperature_offset": 0,
    "humidity_offset": 0,
    "created_at": "2020-02-06T06:24:34.461Z",
    "updated_at": "2020-02-06T06:24:34.461Z",
    "firmware_version": "string",
    "mac_address": "string",
    "serial_number": "string"
  },
  "model": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "manufacturer": "string",
    "remote_name": "string",
    "name": "string",
    "image": "string"
  },
  "nickname": "string",
  "image": "string",
  "type": "AC",
  "settings": {
    "temp": "string",
    "mode": "",
    "vol": "",
    "dir": "",
    "button": ""
  },
  "aircon": {
    "range": {
      "modes": {
        "cool": {
          "temp": ["string"],
          "vol": [""],
          "dir": [""]
        },
        "warm": {
          "temp": ["string"],
          "vol": [""],
          "dir": [""]
        },
        "dry": {
          "temp": ["string"],
          "vol": [""],
          "dir": [""]
        },
        "blow": {
          "temp": ["string"],
          "vol": [""],
          "dir": [""]
        },
        "auto": {
          "temp": ["string"],
          "vol": [""],
          "dir": [""]
        }
      },
      "fixedButtons": [""]
    },
    "tempUnit": ""
  },
  "signals": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "string",
      "image": "string"
    }
  ],
  "tv": {
    "state": {
      "input": "t"
    },
    "buttons": [
      {
        "name": "string",
        "image": "string",
        "label": "string"
      }
    ]
  },
  "light": {
    "state": {
      "brightness": "string",
      "power": "on",
      "last_button": "string"
    },
    "buttons": [
      {
        "name": "string",
        "image": "string",
        "label": "string"
      }
    ]
  }
}]
describe('Api test', () => {

  Api.setApi('http://localhost:8000//1/')
  let server: cp.ChildProcessWithoutNullStreams
  beforeAll(async () => {
    server = cp.spawn('node', [path.resolve(__dirname, '..', 'mock/mock.js')])
    server.stdout.setEncoding('utf-8')
    server.stdout.on('data', (data) => {
      console.log(data)
    })
    await sleep(3000)
  }, 5000)

  afterAll(() => {
    server.kill()
  })

  test('check remaining', async () => {
    await Api.GetMe()
    expect(Api.getRemaining()).toBe(3)
  })

  test('get user', async () => {
    const resp = {
      'id': '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      'nickname': 'string'
    }
    let res = await Api.GetMe()
    expect(res).toStrictEqual(resp)
  })

  test('update user nickname', async () => {
    const resp = {
      'id': '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      'nickname': 'test'
    }
    let res = await Api.PostMe('test')
    expect(res).toStrictEqual(resp)
  })

  test('get devices', async () => {
    let res = await Api.GetDevices()
    expect(res).toStrictEqual(sampleDevices)
  })

  test('get appliances', async () => {
    let res = await Api.GetAppliances()
    expect(res).toStrictEqual(sampleAppliances)
  })

  test('send signal', async () => {
    const signal_id = 'test';
    const r = await Api.SendSignal(signal_id).then(() => null).catch((reason) => reason);
    expect(r).toBe(null);
  })

  test('send tv button', async () => {
    const appliance_id = 'test';
    const button = 'on';
    const r = await Api.SendTVButton(appliance_id, button).then(() => null).catch((reason) => reason);
    expect(r).toBe(null);
  })

})
