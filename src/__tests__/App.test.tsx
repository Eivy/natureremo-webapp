import { render, screen } from '@solidjs/testing-library';
import { vi } from 'vitest';
import Api from '../Api';
import App from '../App';

describe('app', () => {
  const mockDevices = vi.spyOn(Api, 'GetDevices');
  const mockAppliances = vi.spyOn(Api, 'GetAppliances');

  beforeEach(() => {
    mockDevices.mockReset();
    mockAppliances.mockReset();
    mockDevices.mockResolvedValue([{ "id": "device_id", "name": "test_device", "newest_events": {} }]);
    mockAppliances.mockResolvedValue([{ "id": "appliance_id", "nickname": "test_appliance", "device": { "id": "device_id" } }]);
  });

  test('render app header', () => {
    localStorage.setItem('access_token', 'test');
    render(() => <App />);
    expect(screen.getByText('RemoWebApp')).toBeInTheDocument();
  });

  test('render gear icon', () => {
    localStorage.setItem('access_token', 'test');
    render(() => <App />);
    expect(screen.getByText('Gear')).toBeInTheDocument();
  });
});
