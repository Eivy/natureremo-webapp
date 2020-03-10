import * as React from 'react';
import { render } from '@testing-library/react'
import Device from './Device';

const device: RemoAPI.Device = {
  id: 'test',
  name: 'remo',
  newest_events: {}
};

test('device name', () => {
  const el = render(<Device device={device} />)
  expect(el.getByText(/remo/)).toBeInTheDocument();
});

test('device tempture', () => {
  const te = {val: 19};
  device.newest_events!.te = te;
  const el = render(<Device device={device} />)
  expect(el.getByText(/19/)).toBeInTheDocument();
});

test('device illuminance', () => {
  const il = {val: 20};
  device.newest_events!.il = il;
  const el = render(<Device device={device} />)
  expect(el.getByText(/20/)).toBeInTheDocument();
});

test('device humidity', () => {
  const hu = {val: 21};
  device.newest_events!.hu = hu;
  const el = render(<Device device={device} />)
  expect(el.getByText(/21/)).toBeInTheDocument();
});

test('child component', () => {
  const el = render(<Device device={device}><span>Appliance1</span></Device>)
  expect(el.getByText(/Appliance1/)).toBeInTheDocument();
});
