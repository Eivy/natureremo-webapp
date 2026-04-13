import { render, screen } from '@solidjs/testing-library';

const device: RemoAPI.Device = {
  id: 'test',
  name: 'remo',
  newest_events: {}
};

test('device name', () => {
  render(() => <Device device={device} />);
  expect(screen.getByText(/remo/)).toBeInTheDocument();
});

test('device temperature', () => {
  render(() => <Device device={{ ...device, newest_events: { te: { val: 19 } } }} />);
  expect(screen.getByText(/19/)).toBeInTheDocument();
});

test('device illuminance', () => {
  render(() => <Device device={{ ...device, newest_events: { il: { val: 20 } } }} />);
  expect(screen.getByText(/20/)).toBeInTheDocument();
});

test('device humidity', () => {
  render(() => <Device device={{ ...device, newest_events: { hu: { val: 21 } } }} />);
  expect(screen.getByText(/21/)).toBeInTheDocument();
});

test('child component', () => {
  render(() => <Device device={device}><span>Appliance1</span></Device>);
  expect(screen.getByText(/Appliance1/)).toBeInTheDocument();
});

import Device from '../../components/Device';
