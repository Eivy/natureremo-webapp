import { render, screen, fireEvent } from '@solidjs/testing-library';
import { vi } from 'vitest';
import { Router, Route } from '@solidjs/router';
import { setAppliances } from '../../store';
import Api from '../../Api';
import Buttons from '../../pages/Buttons';

describe('test buttons page', () => {
  const mockSendLightButton = vi.spyOn(Api, 'SendLightButton');
  const mockSendAirconSettings = vi.spyOn(Api, 'SendAirconSettings');
  const mockSendSignal = vi.spyOn(Api, 'SendSignal');
  const mockSendTVButton = vi.spyOn(Api, 'SendTVButton');

  beforeEach(() => {
    mockSendLightButton.mockReset();
    mockSendAirconSettings.mockReset();
    mockSendSignal.mockReset();
    mockSendTVButton.mockReset();
    localStorage.setItem('access_token', 'test');
    window.history.pushState({}, '', '/appliances/test');
  });

  function renderButtons() {
    return render(() => (
      <Router url="/appliances/test">
        <Route path="/appliances/:id" component={Buttons} />
      </Router>
    ));
  }

  test('click light button', async () => {
    mockSendLightButton.mockResolvedValue({ power: 'off' });
    setAppliances([{
      id: "test", nickname: "test_appliance", type: "LIGHT",
      light: { buttons: [{ name: 'button1', image: 'ico_lightup', label: 'button1' }] },
      signals: [], device: { id: "device_id" }
    }]);
    const { container } = renderButtons();
    fireEvent.click(container.querySelector('button')!);
    await vi.waitFor(() => expect(mockSendLightButton).toHaveBeenCalledTimes(1));
  });

  test('click tv button', async () => {
    mockSendTVButton.mockResolvedValue({ input: 't' });
    setAppliances([{
      id: "test", nickname: "test_appliance", type: "TV",
      tv: { buttons: [{ name: 'button1', image: 'ico_lightup', label: 'button1' }] },
      signals: [], device: { id: "device_id" }
    }]);
    const { container } = renderButtons();
    fireEvent.click(container.querySelector('button')!);
    await vi.waitFor(() => expect(mockSendTVButton).toHaveBeenCalledTimes(1));
  });

  test('click ir signal button', async () => {
    mockSendSignal.mockResolvedValue(undefined);
    setAppliances([{
      id: "test", nickname: "test_appliance", type: "IR",
      signals: [{ id: "test_id", name: "test", image: "ico_io" }],
      device: { id: "device_id" }
    }]);
    const { container } = renderButtons();
    fireEvent.click(container.querySelector('button')!);
    await vi.waitFor(() => expect(mockSendSignal).toHaveBeenCalledTimes(1));
  });

  test('click ac button', async () => {
    mockSendAirconSettings.mockResolvedValue({ button: '' });
    setAppliances([{
      id: "test", nickname: "test_appliance", type: "AC",
      aircon: {
        range: {
          modes: { warm: { temp: ['18','19','20','21'], vol: ['1','2','3','4','auto',''], dir: ['1','2','3','4','swing','auto',''] } },
          fixedButtons: ['power-off'],
        },
        tempUnit: 'c',
      },
      settings: { mode: 'warm', temp: '18', vol: '2', dir: 'auto', button: '' },
      signals: [], device: { id: "device_id" }
    }]);
    const { container } = renderButtons();
    fireEvent.click(container.querySelector('button')!);
    await vi.waitFor(() => expect(mockSendAirconSettings).toHaveBeenCalledTimes(1));
  });

  test('render message when unknown type has no signal', () => {
    setAppliances([{ id: "test", nickname: "test_appliance", type: "SOMETHING", signals: [], device: { id: "device_id" } }]);
    renderButtons();
    expect(screen.getByText(/SOMETHING/)).toBeInTheDocument();
  });

  test('click signal button of unknown type', async () => {
    mockSendSignal.mockResolvedValue(undefined);
    setAppliances([{
      id: "test", nickname: "test_appliance", type: "SOMETHING",
      signals: [{ id: "test_id", name: "test", image: "ico_io" }],
      device: { id: "device_id" }
    }]);
    const { container } = renderButtons();
    fireEvent.click(container.querySelector('button')!);
    await vi.waitFor(() => expect(mockSendSignal).toHaveBeenCalledTimes(1));
  });

  test('render smart meter', () => {
    setAppliances([{
      id: "test", nickname: "test_appliance", type: "EL_SMART_METER",
      smart_meter: {
        echonetlite_properties: [
          { name: 'measured_instantaneous', epc: 231, val: '580', updated_at: '2020-02-06T06:23:20Z' },
          { name: 'coefficient', epc: 211, val: '1', updated_at: '2020-02-06T06:23:20Z' },
          { name: 'cumulative_electric_energy_unit', epc: 225, val: '1', updated_at: '2020-02-06T06:23:20Z' },
          { name: 'normal_direction_cumulative_electric_energy', epc: 224, val: '5641', updated_at: '2020-02-06T06:23:20Z' },
        ],
      },
      signals: [], device: { id: "device_id" }
    }]);
    renderButtons();
    expect(screen.getByText('580')).toBeInTheDocument();
    expect(screen.getByText('564.1')).toBeInTheDocument();
  });

  test('click qrio lock macro', async () => {
    const mockExecBLEMacro = vi.spyOn(Api, 'ExecBLEMacro').mockResolvedValue(undefined);
    setAppliances([{
      id: "test", nickname: "test_appliance", type: "QRIO_LOCK",
      qrio_lock: { device: { id: 1, name: "Qrio Lock" }, is_available: true },
      ble: { macros: { lock: { id: "lock_macro", url: "https://example.com/lock" } } },
      signals: [], device: { id: "device_id" }
    }]);
    const { container } = renderButtons();
    fireEvent.click(container.querySelector('button')!);
    await vi.waitFor(() => expect(mockExecBLEMacro).toHaveBeenCalledWith("lock_macro"));
    mockExecBLEMacro.mockRestore();
  });

  test('click mornin plus macro', async () => {
    const mockExecBLEMacro = vi.spyOn(Api, 'ExecBLEMacro').mockResolvedValue(undefined);
    setAppliances([{
      id: "test", nickname: "test_appliance", type: "MORNIN_PLUS",
      mornin_plus: { devices: [{ id: "left", name: "mornin' plus L", active: true }], hi_speed_mode: false },
      ble: { macros: { open: { id: "open_macro", url: "https://example.com/open" } } },
      signals: [], device: { id: "device_id" }
    }]);
    const { container } = renderButtons();
    fireEvent.click(container.querySelector('button')!);
    await vi.waitFor(() => expect(mockExecBLEMacro).toHaveBeenCalledWith("open_macro"));
    mockExecBLEMacro.mockRestore();
  });

  test('render message when appliance not found', () => {
    setAppliances([]);
    renderButtons();
    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });

  test('click light signal button', async () => {
    mockSendSignal.mockResolvedValue(undefined);
    setAppliances([{
      id: "test", nickname: "test_appliance", type: "LIGHT",
      light: { buttons: [] },
      signals: [{ id: "test_id", name: "test", image: "ico_io" }],
      device: { id: "device_id" }
    }]);
    const { container } = renderButtons();
    fireEvent.click(container.querySelector('button')!);
    await vi.waitFor(() => expect(mockSendSignal).toHaveBeenCalledTimes(1));
  });

  test('click tv signal button', async () => {
    mockSendSignal.mockResolvedValue(undefined);
    setAppliances([{
      id: "test", nickname: "test_appliance", type: "TV",
      tv: { buttons: [] },
      signals: [{ id: "test_id", name: "test", image: "ico_io" }],
      device: { id: "device_id" }
    }]);
    const { container } = renderButtons();
    fireEvent.click(container.querySelector('button')!);
    await vi.waitFor(() => expect(mockSendSignal).toHaveBeenCalledTimes(1));
  });

  test('click aircon signal button', async () => {
    mockSendSignal.mockResolvedValue(undefined);
    setAppliances([{
      id: "test", nickname: "test_appliance", type: "AC",
      aircon: {
        range: {
          modes: { warm: { temp: ['18','19','20','21'], vol: ['1','2','3','4','auto',''], dir: ['1','2','3','4','swing','auto',''] } },
          fixedButtons: ['power-off'],
        },
        tempUnit: 'c',
      },
      settings: { mode: 'warm', temp: '18', vol: '2', dir: 'auto', button: '' },
      signals: [{ id: "test_id", name: "test", image: "ico_io" }],
      device: { id: "device_id" }
    }]);
    const { container } = renderButtons();
    fireEvent.click(container.querySelector('.signals button')!);
    await vi.waitFor(() => expect(mockSendSignal).toHaveBeenCalledTimes(1));
  });
});
