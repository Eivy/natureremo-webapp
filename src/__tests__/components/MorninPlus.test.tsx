import { render, screen, fireEvent } from '@solidjs/testing-library';
import { vi } from 'vitest';
import MorninPlus from '../../components/MorninPlus';

const data: RemoAPI.Appliance = {
  id: "test", type: "MORNIN_PLUS", nickname: "living curtain",
  mornin_plus: {
    devices: [
      { id: "left", name: "mornin' plus L", image: "ico_mornin_plus", active: true },
      { id: "right", name: "mornin' plus R", image: "ico_mornin_plus", active: false },
    ],
    hi_speed_mode: true,
  },
  ble: {
    macros: {
      open: { id: "open_macro", url: "https://example.com/open" },
      close: { id: "close_macro", url: "https://example.com/close" },
    },
  },
  signals: [],
};

test('render devices', () => {
  render(() => <MorninPlus appliance={data} />);
  expect(screen.getByText("mornin' plus L")).toBeInTheDocument();
  expect(screen.getByText("mornin' plus R")).toBeInTheDocument();
  expect(screen.getByText(/^Active$/)).toBeInTheDocument();
  expect(screen.getByText(/^Inactive$/)).toBeInTheDocument();
});

test('render hi speed mode', () => {
  render(() => <MorninPlus appliance={data} />);
  expect(screen.getByText(/Hi-Speed/)).toBeInTheDocument();
});

test('hide hi speed mode when it is off', () => {
  const off: RemoAPI.Appliance = { ...data, mornin_plus: { ...data.mornin_plus, hi_speed_mode: false } };
  render(() => <MorninPlus appliance={off} />);
  expect(screen.queryByText(/Hi-Speed/)).not.toBeInTheDocument();
});

test('render macro buttons', () => {
  // The icons carry their name as a text node too, so the label is not unique.
  render(() => <MorninPlus appliance={data} />);
  expect(screen.getAllByText("Open").length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText("Close").length).toBeGreaterThanOrEqual(1);
});

test('click macro button', () => {
  const onMacroClick = vi.fn();
  const { container } = render(() => <MorninPlus appliance={data} onMacroClick={onMacroClick} />);
  fireEvent.click(container.querySelector('button')!);
  expect(onMacroClick).toHaveBeenCalledWith({ id: "open_macro", url: "https://example.com/open" });
});

test('click macro button without handler', () => {
  const { container } = render(() => <MorninPlus appliance={data} />);
  expect(() => fireEvent.click(container.querySelector('button')!)).not.toThrow();
});

test('render message when there is no macro', () => {
  const noMacro: RemoAPI.Appliance = { id: "test", type: "MORNIN_PLUS", mornin_plus: { devices: [] }, signals: [] };
  render(() => <MorninPlus appliance={noMacro} />);
  expect(screen.getByText(/No macro/i)).toBeInTheDocument();
});
