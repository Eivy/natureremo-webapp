// @vitest-environment node
import * as cp from 'child_process';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { describe, test, expect, beforeAll, afterAll } from 'vitest';
import Api from '../Api';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sleep = (msec: number) => new Promise((resolve) => setTimeout(resolve, msec));

const sampleDevices: Array<RemoAPI.Device> = [{
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
    "te": { "val": 0, "created_at": "2020-02-06T06:23:20.410Z" },
    "hu": { "val": 0, "created_at": "2020-02-06T06:23:20.410Z" },
    "il": { "val": 0, "created_at": "2020-02-06T06:23:20.410Z" },
    "mo": { "val": 0, "created_at": "2020-02-06T06:23:20.410Z" }
  }
}];

const sampleAppliances: Array<RemoAPI.Appliance> = [{
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
  "settings": { "temp": "string", "mode": "", "vol": "", "dir": "", "button": "" },
  "aircon": {
    "range": {
      "modes": {
        "cool": { "temp": ["string"], "vol": [""], "dir": [""] },
        "warm": { "temp": ["string"], "vol": [""], "dir": [""] },
        "dry":  { "temp": ["string"], "vol": [""], "dir": [""] },
        "blow": { "temp": ["string"], "vol": [""], "dir": [""] },
        "auto": { "temp": ["string"], "vol": [""], "dir": [""] }
      },
      "fixedButtons": [""]
    },
    "tempUnit": ""
  },
  "signals": [{ "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6", "name": "string", "image": "string" }],
  "tv": {
    "state": { "input": "t" },
    "buttons": [{ "name": "string", "image": "string", "label": "string" }]
  },
  "light": {
    "state": { "brightness": "string", "power": "on", "last_button": "string" },
    "buttons": [{ "name": "string", "image": "string", "label": "string" }]
  }
}];

describe('Api test', () => {
  Api.setApi('http://localhost:8000/1/');
  let server: cp.ChildProcessWithoutNullStreams;

  beforeAll(async () => {
    server = cp.spawn('node', [path.resolve(__dirname, '..', '..', 'mock/server.js')]);
    server.stdout.setEncoding('utf-8');
    server.stdout.on('data', (data) => console.log(data));
    await sleep(3000);
  }, 5000);

  afterAll(() => {
    server.kill();
  });

  test('get user', async () => {
    const resp = { 'id': '3fa85f64-5717-4562-b3fc-2c963f66afa6', 'nickname': 'string' };
    const res = await Api.GetMe();
    expect(res).toStrictEqual(resp);
  });

  test('update user nickname', async () => {
    const resp = { 'id': '3fa85f64-5717-4562-b3fc-2c963f66afa6', 'nickname': 'test' };
    const res = await Api.PostMe('test');
    expect(res).toStrictEqual(resp);
  });

  test('get devices', async () => {
    const res = await Api.GetDevices();
    expect(res).toStrictEqual(sampleDevices);
  });

  test('get appliances', async () => {
    const res = await Api.GetAppliances();
    expect(res).toStrictEqual(sampleAppliances);
  });

  test('send signal', async () => {
    const r = await Api.SendSignal('test');
    expect(r).toBe(null);
  });

  test('send tv button', async () => {
    const r = await Api.SendTVButton('test', 'on');
    expect(r).not.toBe(null);
  });

  test('send light button', async () => {
    const r = await Api.SendLightButton('3fa85f64-5717-4562-b3fc-2c963f66afa6', 'on');
    expect(r).not.toBe(null);
  });

  test('send aircon settings (temp)', async () => {
    const r = await Api.SendAirconSettings('test', { temperature: "20" });
    expect(r).not.toBe(null);
  });

  test('send aircon settings (mode)', async () => {
    const r = await Api.SendAirconSettings('test', { operation_mode: "warm" });
    expect(r).not.toBe(null);
  });

  test('send aircon settings (vol)', async () => {
    const r = await Api.SendAirconSettings('test', { air_volume: "20" });
    expect(r).not.toBe(null);
  });

  test('send aircon settings (dir)', async () => {
    const r = await Api.SendAirconSettings('test', { air_volume: "swing" });
    expect(r).not.toBe(null);
  });

  test('send aircon settings (button)', async () => {
    const r = await Api.SendAirconSettings('test', { button: "power_off" });
    expect(r).not.toBe(null);
  });

  test('send aircon settings (all)', async () => {
    const r = await Api.SendAirconSettings('test', {
      operation_mode: "cool",
      temperature: "25",
      air_volume: "auto",
      air_direction: "swing",
    });
    expect(r).not.toBe(null);
  });
});
