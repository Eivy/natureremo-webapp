import { render, screen, fireEvent } from '@solidjs/testing-library';
import { vi } from 'vitest';
import QrioLock from '../../components/QrioLock';

const data: RemoAPI.Appliance = {
  id: "test", type: "QRIO_LOCK", nickname: "entrance",
  qrio_lock: { device: { id: 1, name: "Qrio Lock", image: "ico_qrio_lock" }, bd_address: "00:00:00:00:00:00", is_available: true },
  ble: {
    addr: "00:00:00:00:00:00", addr_type: "random", bonded: true,
    macros: {
      lock: { id: "lock_macro", url: "https://example.com/lock" },
      unlock: { id: "unlock_macro", url: "https://example.com/unlock" },
    },
  },
  signals: [],
};

test('render lock status', () => {
  render(() => <QrioLock appliance={data} />);
  expect(screen.getByText("Qrio Lock")).toBeInTheDocument();
  expect(screen.getByText(/available/i)).toBeInTheDocument();
});

test('render unavailable lock', () => {
  const unavailable: RemoAPI.Appliance = { ...data, qrio_lock: { ...data.qrio_lock, is_available: false } };
  render(() => <QrioLock appliance={unavailable} />);
  expect(screen.getByText(/unavailable/i)).toBeInTheDocument();
});

test('render macro buttons', () => {
  // The icons carry their name as a text node too, so the label is not unique.
  render(() => <QrioLock appliance={data} />);
  expect(screen.getAllByText("Lock").length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText("Unlock").length).toBeGreaterThanOrEqual(1);
});

test('click macro button', () => {
  const onMacroClick = vi.fn();
  const { container } = render(() => <QrioLock appliance={data} onMacroClick={onMacroClick} />);
  fireEvent.click(container.querySelector('button')!);
  expect(onMacroClick).toHaveBeenCalledWith({ id: "lock_macro", url: "https://example.com/lock" });
});

test('click macro button without handler', () => {
  const { container } = render(() => <QrioLock appliance={data} />);
  expect(() => fireEvent.click(container.querySelector('button')!)).not.toThrow();
});

test('render message when there is no macro', () => {
  const noMacro: RemoAPI.Appliance = { id: "test", type: "QRIO_LOCK", qrio_lock: { is_available: false }, signals: [] };
  render(() => <QrioLock appliance={noMacro} />);
  expect(screen.getByText(/No macro/i)).toBeInTheDocument();
});
