/**
 * Minimal mock server for Api.test.ts — uses only Node.js built-ins (http module).
 * Handles the subset of Nature Remo API endpoints used by tests.
 */
import { createServer } from 'http';

const sampleDevices = [{
  id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  name: 'string',
  temperature_offset: 0,
  humidity_offset: 0,
  created_at: '2020-02-06T06:23:20.410Z',
  updated_at: '2020-02-06T06:23:20.410Z',
  firmware_version: 'string',
  mac_address: 'string',
  serial_number: 'string',
  newest_events: {
    te: { val: 0, created_at: '2020-02-06T06:23:20.410Z' },
    hu: { val: 0, created_at: '2020-02-06T06:23:20.410Z' },
    il: { val: 0, created_at: '2020-02-06T06:23:20.410Z' },
    mo: { val: 0, created_at: '2020-02-06T06:23:20.410Z' },
  },
}];

const sampleAppliances = [{
  id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  device: {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    name: 'string',
    temperature_offset: 0,
    humidity_offset: 0,
    created_at: '2020-02-06T06:24:34.461Z',
    updated_at: '2020-02-06T06:24:34.461Z',
    firmware_version: 'string',
    mac_address: 'string',
    serial_number: 'string',
  },
  model: {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    manufacturer: 'string',
    remote_name: 'string',
    name: 'string',
    image: 'string',
  },
  nickname: 'string',
  image: 'string',
  type: 'AC',
  settings: { temp: 'string', mode: '', vol: '', dir: '', button: '' },
  aircon: {
    range: {
      modes: {
        cool: { temp: ['string'], vol: [''], dir: [''] },
        warm: { temp: ['string'], vol: [''], dir: [''] },
        dry:  { temp: ['string'], vol: [''], dir: [''] },
        blow: { temp: ['string'], vol: [''], dir: [''] },
        auto: { temp: ['string'], vol: [''], dir: [''] },
      },
      fixedButtons: [''],
    },
    tempUnit: '',
  },
  signals: [{ id: '3fa85f64-5717-4562-b3fc-2c963f66afa6', name: 'string', image: 'string' }],
  tv: {
    state: { input: 't' },
    buttons: [{ name: 'string', image: 'string', label: 'string' }],
  },
  light: {
    state: { brightness: 'string', power: 'on', last_button: 'string' },
    buttons: [{ name: 'string', image: 'string', label: 'string' }],
  },
}];

function readBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', () => resolve(body));
  });
}

function parseForm(body) {
  const params = {};
  for (const pair of body.split('&')) {
    const [k, v] = pair.split('=').map(decodeURIComponent);
    if (k) params[k] = v;
  }
  return params;
}

function json(res, data, status = 200) {
  const body = data === null ? '' : JSON.stringify(data);
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(body);
}

const server = createServer(async (req, res) => {
  const url = req.url || '';
  const method = req.method || '';
  const body = await readBody(req);
  const form = body ? parseForm(body) : {};

  // GET /1/users/me
  if (method === 'GET' && url === '/1/users/me') {
    return json(res, { id: '3fa85f64-5717-4562-b3fc-2c963f66afa6', nickname: 'string' });
  }

  // POST /1/users/me  (update nickname)
  if (method === 'POST' && url === '/1/users/me') {
    return json(res, { id: '3fa85f64-5717-4562-b3fc-2c963f66afa6', nickname: form.nickname ?? 'string' });
  }

  // GET /1/devices
  if (method === 'GET' && url === '/1/devices') {
    return json(res, sampleDevices);
  }

  // GET /1/appliances
  if (method === 'GET' && url === '/1/appliances') {
    return json(res, sampleAppliances);
  }

  // POST /1/signals/:id/send
  if (method === 'POST' && /^\/1\/signals\/[^/]+\/send$/.test(url)) {
    return json(res, null);
  }

  // POST /1/appliances/:id/tv
  if (method === 'POST' && /^\/1\/appliances\/[^/]+\/tv$/.test(url)) {
    return json(res, { input: 't' });
  }

  // POST /1/appliances/:id/light
  if (method === 'POST' && /^\/1\/appliances\/[^/]+\/light$/.test(url)) {
    return json(res, { brightness: 'string', power: 'on', last_button: 'string' });
  }

  // POST /1/appliances/:id/aircon_settings
  if (method === 'POST' && /^\/1\/appliances\/[^/]+\/aircon_settings$/.test(url)) {
    return json(res, { temp: 'string', mode: '', vol: '', dir: '', button: '' });
  }

  json(res, { error: 'Not Found' }, 404);
});

server.listen(8000, () => {
  console.log('Nature Remo Cloud API mock is now running at http://localhost:8000');
});
