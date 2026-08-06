import { render, screen, fireEvent } from '@solidjs/testing-library';
import { vi } from 'vitest';
import ButtonsOther from '../../components/ButtonsOther';

const signalData: RemoAPI.Appliance = {
  id: "test", type: "QRIO_LOCK",
  signals: [{ id: "test_signal", name: "Signal1", image: "ico_lightdown" }]
};

test('unsupported appliance without signal', () => {
  const data: RemoAPI.Appliance = { id: "test", type: "QRIO_LOCK", signals: [] };
  render(() => <ButtonsOther appliance={data} />);
  expect(screen.getByText(/QRIO_LOCK/)).toBeInTheDocument();
});

test('unsupported appliance without signals field', () => {
  const data: RemoAPI.Appliance = { id: "test", type: "QRIO_LOCK" };
  render(() => <ButtonsOther appliance={data} />);
  expect(screen.getByText(/QRIO_LOCK/)).toBeInTheDocument();
});

test('test signals', () => {
  render(() => <ButtonsOther appliance={signalData} />);
  expect(screen.getByText("Signal1")).toBeInTheDocument();
});

test('test click', () => {
  const onSignalClick = vi.fn();
  const { container } = render(() => <ButtonsOther appliance={signalData} onSignalClick={onSignalClick} />);
  fireEvent.click(container.querySelector('button')!);
  expect(onSignalClick).toHaveBeenCalledTimes(1);
});

test('test click without handler', () => {
  const { container } = render(() => <ButtonsOther appliance={signalData} />);
  expect(() => fireEvent.click(container.querySelector('button')!)).not.toThrow();
});
