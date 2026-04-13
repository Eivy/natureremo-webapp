import { render, screen, fireEvent } from '@solidjs/testing-library';
import { vi } from 'vitest';
import ButtonsAC from '../../components/ButtonsAC';

const makeAC = (overrides: Partial<RemoAPI.Appliance> = {}): RemoAPI.Appliance => ({
  id: "test",
  type: "AC",
  aircon: {
    range: {
      modes: {
        warm: { temp: ['18','19','20','21'], vol: ['1','2','3','4','auto',''], dir: ['1','2','3','4','swing','auto',''] },
        cool: { temp: ['25','26'], vol: ['auto',''], dir: ['swing'] },
        dry:  { temp: ['25','26'], vol: ['auto',''], dir: ['swing'] },
        blow: { temp: ['25','26'], vol: ['auto',''], dir: ['swing'] },
        auto: { temp: [], vol: [], dir: [] },
      },
      fixedButtons: ['power-off'],
    },
    tempUnit: 'c',
  },
  settings: { mode: 'warm', temp: '18', vol: '2', dir: 'auto', button: '' },
  signals: [],
  ...overrides,
});

test('wrong appliance', () => {
  const data: RemoAPI.Appliance = { id: "test", type: "LIGHT", signals: [] };
  render(() => <ButtonsAC appliance={data} />);
  expect(screen.getByText(/Wrong/)).toBeInTheDocument();
});

test('test signals', () => {
  const data = makeAC({ signals: [{ id: "test_signal", name: "Signal1", image: "ico_lightdown" }] });
  render(() => <ButtonsAC appliance={data} />);
  expect(screen.getByText("Signal1")).toBeInTheDocument();
});

test('test click signal', () => {
  const onSignalClick = vi.fn();
  const data = makeAC({ signals: [{ id: "test_signal", name: "Signal1", image: "ico_lightdown" }] });
  const { container } = render(() => <ButtonsAC appliance={data} onSignalClick={onSignalClick} />);
  fireEvent.click(container.querySelector('.signals button')!);
  expect(onSignalClick).toHaveBeenCalledTimes(1);
});

test('test click power button', () => {
  const onChange = vi.fn();
  const data = makeAC();
  const { container } = render(() => <ButtonsAC appliance={data} onChange={onChange} />);
  fireEvent.click(container.querySelectorAll('button')[0]);
  expect(onChange).toHaveBeenCalledWith({ button: 'power-off' });
});

test('test render warm - selects have correct values', () => {
  const data = makeAC({ aircon: { range: { modes: { warm: { temp: ['18','19','20','21'], vol: ['1','2','3','4','auto',''], dir: ['1','2','3','4','swing','auto',''] } }, fixedButtons: [] }, tempUnit: 'c' } });
  const { container } = render(() => <ButtonsAC appliance={data} />);
  const selects = container.querySelectorAll('select');
  expect(selects.length).toBeGreaterThan(0);
  const tempSelect = container.querySelector('select.temp') as HTMLSelectElement;
  expect(tempSelect.value).toBe('18');
});

test('test render auto - no selects', () => {
  const data = makeAC({ settings: { mode: 'auto', temp: '25', vol: 'auto', dir: 'swing', button: '' } });
  const { container } = render(() => <ButtonsAC appliance={data} />);
  expect(container.querySelectorAll('select').length).toBe(0);
});

test('test to change mode value', () => {
  const onChange = vi.fn();
  const data = makeAC();
  const { container } = render(() => <ButtonsAC appliance={data} onChange={onChange} />);
  // buttons: [power-off, warm, cool, dry, blow, auto] → at(2) = cool
  const modeButtons = container.querySelectorAll('.mode button');
  fireEvent.click(modeButtons[2]);
  expect(onChange).toHaveBeenCalledWith({ operation_mode: 'cool' });
});

test('test to change temp value', () => {
  const onChange = vi.fn();
  const data = makeAC();
  const { container } = render(() => <ButtonsAC appliance={data} onChange={onChange} />);
  const tempSelect = container.querySelector('select.temp') as HTMLSelectElement;
  fireEvent.change(tempSelect, { target: { value: '18' } });
  expect(onChange).toHaveBeenCalledWith({ temperature: '18' });
});

test('test to change vol value', () => {
  const onChange = vi.fn();
  const data = makeAC();
  const { container } = render(() => <ButtonsAC appliance={data} onChange={onChange} />);
  const volSelect = container.querySelector('select.vol') as HTMLSelectElement;
  fireEvent.change(volSelect, { target: { value: '1' } });
  expect(onChange).toHaveBeenCalledWith({ air_volume: '1' });
});

test('test to change dir value', () => {
  const onChange = vi.fn();
  const data = makeAC();
  const { container } = render(() => <ButtonsAC appliance={data} onChange={onChange} />);
  const dirSelect = container.querySelector('select.dir') as HTMLSelectElement;
  fireEvent.change(dirSelect, { target: { value: 'swing' } });
  expect(onChange).toHaveBeenCalledWith({ air_direction: 'swing' });
});

test('test to change values without handler does not throw', () => {
  const data = makeAC();
  const { container } = render(() => <ButtonsAC appliance={data} />);
  expect(() => {
    fireEvent.click(container.querySelectorAll('.mode button')[0]);
    fireEvent.change(container.querySelector('select.temp')!, { target: { value: '18' } });
  }).not.toThrow();
});
