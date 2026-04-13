import { render, screen, fireEvent } from '@solidjs/testing-library';
import { vi } from 'vitest';
import ButtonsLight from '../../components/ButtonsLight';

test('wrong appliance', () => {
  const data: RemoAPI.Appliance = { id: "test", type: "TV", signals: [] };
  render(() => <ButtonsLight appliance={data} />);
  expect(screen.getByText(/Wrong/)).toBeInTheDocument();
});

test('test buttons', () => {
  const data: RemoAPI.Appliance = {
    id: "test", type: "LIGHT",
    light: { buttons: [{ image: "ico_timer", name: "Power", label: "電源" }] },
    signals: []
  };
  render(() => <ButtonsLight appliance={data} />);
  expect(screen.getByText("電源")).toBeInTheDocument();
});

test('test signals', () => {
  const data: RemoAPI.Appliance = {
    id: "test", type: "LIGHT",
    light: { buttons: [] },
    signals: [{ id: "test_signal", name: "Signal1", image: "ico_lightdown" }]
  };
  render(() => <ButtonsLight appliance={data} />);
  expect(screen.getByText("Signal1")).toBeInTheDocument();
});

test('test signal click', () => {
  const onSignalClick = vi.fn();
  const data: RemoAPI.Appliance = {
    id: "test", type: "LIGHT",
    light: { buttons: [] },
    signals: [{ id: "test_signal", name: "Signal1", image: "ico_lightdown" }]
  };
  const { container } = render(() => <ButtonsLight appliance={data} onSignalClick={onSignalClick} />);
  fireEvent.click(container.querySelector('button')!);
  expect(onSignalClick).toHaveBeenCalledTimes(1);
});

test('test signal click without handler', () => {
  const data: RemoAPI.Appliance = {
    id: "test", type: "LIGHT",
    light: { buttons: [] },
    signals: [{ id: "test_signal", name: "Signal1", image: "ico_lightdown" }]
  };
  const { container } = render(() => <ButtonsLight appliance={data} />);
  expect(() => fireEvent.click(container.querySelector('button')!)).not.toThrow();
});

test('test button click', () => {
  const onButtonClick = vi.fn();
  const data: RemoAPI.Appliance = {
    id: "test", type: "LIGHT",
    light: { buttons: [{ image: "ico_timer", name: "Power", label: "電源" }] },
    signals: []
  };
  const { container } = render(() => <ButtonsLight appliance={data} onButtonClick={onButtonClick} />);
  fireEvent.click(container.querySelector('button')!);
  expect(onButtonClick).toHaveBeenCalledTimes(1);
});

test('test button click without handler', () => {
  const data: RemoAPI.Appliance = {
    id: "test", type: "LIGHT",
    light: { buttons: [{ image: "ico_timer", name: "Power", label: "電源" }] },
    signals: []
  };
  const { container } = render(() => <ButtonsLight appliance={data} />);
  expect(() => fireEvent.click(container.querySelector('button')!)).not.toThrow();
});
