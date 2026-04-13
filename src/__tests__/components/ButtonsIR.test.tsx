import { render, screen, fireEvent } from '@solidjs/testing-library';
import { vi } from 'vitest';
import ButtonsIR from '../../components/ButtonsIR';

const signalData: RemoAPI.Appliance = {
  id: "test", type: "IR",
  signals: [{ id: "test_signal", name: "Signal1", image: "ico_lightdown" }]
};

test('wrong appliance', () => {
  const data: RemoAPI.Appliance = { id: "test", type: "TV", signals: [] };
  render(() => <ButtonsIR appliance={data} />);
  expect(screen.getByText(/Wrong/)).toBeInTheDocument();
});

test('test signals', () => {
  render(() => <ButtonsIR appliance={signalData} />);
  expect(screen.getByText("Signal1")).toBeInTheDocument();
});

test('test click', () => {
  const onSignalClick = vi.fn();
  const { container } = render(() => <ButtonsIR appliance={signalData} onSignalClick={onSignalClick} />);
  fireEvent.click(container.querySelector('button')!);
  expect(onSignalClick).toHaveBeenCalledTimes(1);
});

test('test click without handler', () => {
  const { container } = render(() => <ButtonsIR appliance={signalData} />);
  expect(() => fireEvent.click(container.querySelector('button')!)).not.toThrow();
});
