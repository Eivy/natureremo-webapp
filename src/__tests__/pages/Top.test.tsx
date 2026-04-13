import { render, screen, fireEvent } from '@solidjs/testing-library';
import { vi } from 'vitest';
import { Router, Route } from '@solidjs/router';
import { setDevices, setAppliances } from '../../store';
import Api from '../../Api';
import Top from '../../pages/Top';

const device: RemoAPI.Device = { id: "device_id", name: "test_device", newest_events: {} };
const appliance: RemoAPI.Appliance = { id: "appliance_id", nickname: "test_appliance", device: { id: "device_id" } };

describe('test top page', () => {
  const mockSendLightButton = vi.spyOn(Api, 'SendLightButton');
  const mockSendAirconSettings = vi.spyOn(Api, 'SendAirconSettings');

  beforeEach(() => {
    mockSendLightButton.mockReset();
    mockSendAirconSettings.mockReset();
    setDevices([device]);
    setAppliances([appliance, { id: "appliance_id_not_render", nickname: "test_appliance_not_render", device: { id: "device_id_not_contain" } }]);
  });

  test('navigate to config when no token', async () => {
    render(() => (
      <Router url="/">
        <Route path="/" component={Top} />
        <Route path="/config" component={() => <div>config page</div>} />
      </Router>
    ));
    await vi.waitFor(() => {
      expect(screen.getByText('config page')).toBeInTheDocument();
    });
  });

  test('does not navigate when token exists', () => {
    localStorage.setItem('access_token', 'test');
    render(() => (
      <Router url="/">
        <Route path="/" component={Top} />
        <Route path="/config" component={() => <div>config page</div>} />
      </Router>
    ));
    expect(screen.queryByText('config page')).toBeNull();
  });

  test('render device name', () => {
    localStorage.setItem('access_token', 'test');
    render(() => (
      <Router url="/">
        <Route path="/" component={Top} />
      </Router>
    ));
    expect(screen.getByText('test_device')).toBeInTheDocument();
  });

  test('render appliance in same device', () => {
    localStorage.setItem('access_token', 'test');
    render(() => (
      <Router url="/">
        <Route path="/" component={Top} />
      </Router>
    ));
    expect(screen.getByText('test_appliance')).toBeInTheDocument();
  });

  test('does not render appliance from different device', () => {
    localStorage.setItem('access_token', 'test');
    render(() => (
      <Router url="/">
        <Route path="/" component={Top} />
      </Router>
    ));
    expect(screen.queryByText('test_appliance_not_render')).toBeNull();
  });

  test('click light power toggles state', async () => {
    localStorage.setItem('access_token', 'test');
    mockSendLightButton.mockResolvedValue({ power: 'off' });
    setAppliances([{
      id: "appliance_id", nickname: "light_appliance", type: "LIGHT",
      light: { state: { power: 'on' } },
      device: { id: "device_id" }
    }]);
    const { container } = render(() => (
      <Router url="/">
        <Route path="/" component={Top} />
      </Router>
    ));
    fireEvent.click(container.querySelector('.power')!);
    await vi.waitFor(() => {
      expect(mockSendLightButton).toHaveBeenCalledTimes(1);
    });
  });

  test('click ac power toggles state', async () => {
    localStorage.setItem('access_token', 'test');
    mockSendAirconSettings.mockResolvedValue({ button: 'power-off' });
    setAppliances([{
      id: "appliance_id", nickname: "ac_appliance", type: "AC",
      settings: { button: '' },
      device: { id: "device_id" }
    }]);
    const { container } = render(() => (
      <Router url="/">
        <Route path="/" component={Top} />
      </Router>
    ));
    fireEvent.click(container.querySelector('.power')!);
    await vi.waitFor(() => {
      expect(mockSendAirconSettings).toHaveBeenCalledTimes(1);
    });
  });
});
