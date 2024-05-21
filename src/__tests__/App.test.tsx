import React from 'react';
import * as timers from 'timers';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import Api from '../Api';
import App from '../App';
import store from '../stores';

if (typeof setImmediate !== 'function') {
  global.setImmediate = timers.setImmediate;
  global.clearImmediate = timers.clearImmediate;
}

describe('app', () => {

  const mockDevices = jest.spyOn(Api, 'GetDevices');
  const mockAppliances = jest.spyOn(Api, 'GetAppliances');

  beforeEach(() => {
    mockDevices.mockReset();
    mockAppliances.mockReset();
    mockDevices.mockResolvedValue(new Promise((resolve, reject) => {
      resolve([{"id": "device_id", "name": "test_device", "newest_events": {}}]);
    }));
    mockAppliances.mockResolvedValue(new Promise((resolve, reject) => {
      resolve([{"id": "appliance_id", "nickname": "test_appliance", "device": {"id": "device_id"}},{"id": "appliance_id_not_render", "nickname": "test_appliance_not_render", "device": {"id": "device_id_not_contain"}}]);
    }));
  });

  test('render app', () => {
    localStorage.setItem('access_token', 'test');
    var app = render(<Provider store={store}><App /></Provider>);
    setImmediate(() => {
      expect(app.getByText('Gear')).toBeInTheDocument();
    });
  });

});
