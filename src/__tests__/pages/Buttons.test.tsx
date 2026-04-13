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

  test('render wrong data when unknown type', () => {
    setAppliances([{ id: "test", nickname: "test_appliance", type: "SOMETHING", signals: [], device: { id: "device_id" } }]);
    renderButtons();
    expect(screen.getByText(/wrong data/i)).toBeInTheDocument();
  });

  test('render wrong data when appliance not found', () => {
    setAppliances([]);
    renderButtons();
    expect(screen.getByText(/wrong data/i)).toBeInTheDocument();
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
