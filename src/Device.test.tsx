
import * as React from 'react';
import { render } from '@testing-library/react'
import Device from './Device';

const device: RemoAPI.Device = {
  id: 'test',
  name: 'remo',
  newest_events: {}
};

test('device name', () => {
  const appliances: Array<RemoAPI.Appliance> = [];
  const el = render(<Device device={device} appliances={appliances} />)
  expect(el.getByText(/remo/)).toBeInTheDocument();
});

test('device tempture', () => {
  const appliances: Array<RemoAPI.Appliance> = [];
  const hu = {val: 19};
  device.newest_events!.hu = hu;
  const el = render(<Device device={device} appliances={appliances} />)
  expect(el.getByText(/19/)).toBeInTheDocument();
});

test('device illuminance', () => {
  const appliances: Array<RemoAPI.Appliance> = [];
  const il = {val: 20};
  device.newest_events!.il = il;
  const el = render(<Device device={device} appliances={appliances} />)
  expect(el.getByText(/20/)).toBeInTheDocument();
});

test('device humidity', () => {
  const appliances: Array<RemoAPI.Appliance> = [];
  const hu = {val: 21};
  device.newest_events!.hu = hu;
  const el = render(<Device device={device} appliances={appliances} />)
  expect(el.getByText(/21/)).toBeInTheDocument();
});

test('device appliances', () => {
  const appliances: Array<RemoAPI.Appliance> = [
  {
    id: 'test1',
    nickname: 'Appliance1',
  },
  {
    id: 'test2',
    nickname: 'Appliance2',
  },
  ];
  const el = render(<Device device={device} appliances={appliances} />)
  expect(el.getByText(/Appliance1/)).toBeInTheDocument();
  expect(el.getByText(/Appliance2/)).toBeInTheDocument();
});
