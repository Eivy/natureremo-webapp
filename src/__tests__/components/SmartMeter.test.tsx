import { render, screen } from '@solidjs/testing-library';
import SmartMeter from '../../components/SmartMeter';

function appliance(properties: RemoAPI.EchonetLiteProperty[]): RemoAPI.Appliance {
  return {
    id: "test", type: "EL_SMART_METER", nickname: "test_meter",
    smart_meter: { echonetlite_properties: properties },
    signals: [],
  };
}

const updated_at = '2020-02-06T06:23:20Z';

test('render instantaneous power', () => {
  render(() => <SmartMeter appliance={appliance([
    { name: 'measured_instantaneous', epc: 231, val: '580', updated_at },
  ])} />);
  expect(screen.getByText('580')).toBeInTheDocument();
  expect(screen.getByText('W')).toBeInTheDocument();
});

test('convert cumulative energy with coefficient and unit', () => {
  render(() => <SmartMeter appliance={appliance([
    { name: 'coefficient', epc: 211, val: '10', updated_at },
    { name: 'cumulative_electric_energy_unit', epc: 225, val: '2', updated_at },
    { name: 'normal_direction_cumulative_electric_energy', epc: 224, val: '5641', updated_at },
    { name: 'reverse_direction_cumulative_electric_energy', epc: 227, val: '100', updated_at },
  ])} />);
  // 5641 * 10 * 0.01 = 564.1
  expect(screen.getByText('564.1')).toBeInTheDocument();
  // 100 * 10 * 0.01 = 10.0
  expect(screen.getByText('10.0')).toBeInTheDocument();
});

test('fall back to raw value when coefficient and unit are missing', () => {
  render(() => <SmartMeter appliance={appliance([
    { name: 'normal_direction_cumulative_electric_energy', epc: 224, val: '5641', updated_at },
  ])} />);
  expect(screen.getByText('5641.0')).toBeInTheDocument();
});

test('list properties which are not summarized', () => {
  render(() => <SmartMeter appliance={appliance([
    { name: 'cumulative_electric_energy_effective_digits', epc: 215, val: '6', updated_at },
    { name: 'unknown_property', epc: 999, val: '42', updated_at },
  ])} />);
  expect(screen.getByText(/Effective Digits/)).toBeInTheDocument();
  expect(screen.getByText('unknown_property')).toBeInTheDocument();
  expect(screen.getByText('42')).toBeInTheDocument();
});

test('render message when there is no property', () => {
  render(() => <SmartMeter appliance={{ id: "test", type: "EL_SMART_METER", signals: [] }} />);
  expect(screen.getByText(/No smart meter data/i)).toBeInTheDocument();
});
