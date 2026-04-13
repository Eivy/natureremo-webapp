import { render, screen, fireEvent } from '@solidjs/testing-library';
import { vi } from 'vitest';
import Appliance from '../../components/Appliance';

test('appliance light power off - no on class', () => {
  const data: RemoAPI.Appliance = {
    nickname: "light", type: "LIGHT", image: "ico_light",
    light: { state: { power: "off" } }
  };
  const { container } = render(() => <Appliance data={data} />);
  expect(container.querySelector('.circle')).toBeTruthy();
  expect(container.querySelector('.on')).toBeNull();
});

test('appliance light power on - has on class', () => {
  const data: RemoAPI.Appliance = {
    nickname: "light", type: "LIGHT", image: "ico_light",
    light: { state: { power: "on" } }
  };
  const { container } = render(() => <Appliance data={data} />);
  expect(container.querySelector('.circle.on')).toBeTruthy();
});

test('appliance aircon power on - has on class', () => {
  const data: RemoAPI.Appliance = {
    nickname: "aircon", type: "AC", image: "ico_ac_1",
    settings: { button: "" }
  };
  const { container } = render(() => <Appliance data={data} />);
  expect(container.querySelector('.circle.on')).toBeTruthy();
});

test('appliance aircon power off - has off class', () => {
  const data: RemoAPI.Appliance = {
    nickname: "aircon", type: "AC", image: "ico_ac_1",
    settings: { button: "power-off" }
  };
  const { container } = render(() => <Appliance data={data} />);
  expect(container.querySelector('.circle.off')).toBeTruthy();
});

test('renders ico_light', () => {
  const data: RemoAPI.Appliance = {
    nickname: "light", type: "LIGHT", image: "ico_light",
    light: { state: { power: "on" } }
  };
  render(() => <Appliance data={data} />);
  expect(screen.getByText('Light')).toBeInTheDocument();
  expect(screen.getByText('light')).toBeInTheDocument();
});

test('renders ico_etc', () => {
  const data: RemoAPI.Appliance = { nickname: "machine", type: "IR", image: "ico_etc" };
  render(() => <Appliance data={data} />);
  expect(screen.getByText('Etc')).toBeInTheDocument();
  expect(screen.getByText('machine')).toBeInTheDocument();
});

test.each([
  ['ico_light', 'Light'],
  ['ico_tv', 'TV'],
  ['ico_ac_1', 'AC1'],
  ['ico_ac_0', 'AC2'],
  ['ico_curtain', 'Curtain'],
  ['ico_air_purifier', 'AirPurifier'],
  ['ico_robot', 'Robot'],
  ['ico_fan', 'Fan'],
  ['ico_audio', 'Audio'],
  ['ico_av', 'AV'],
  ['ico_etc', 'Etc'],
  ['something', 'Etc'],
])('renders %s icon', (image, altText) => {
  const data: RemoAPI.Appliance = { nickname: "test", type: "IR", image };
  render(() => <Appliance data={data} />);
  expect(screen.getByText(altText)).toBeInTheDocument();
});

test('power click handler is called', () => {
  const onPowerClick = vi.fn();
  const data: RemoAPI.Appliance = {
    nickname: "light", type: "LIGHT", image: "ico_light",
    light: { state: { power: "on" } }
  };
  const { container } = render(() => <Appliance data={data} onPowerClick={onPowerClick} />);
  const powerButton = container.querySelector('.power') as HTMLElement;
  fireEvent.click(powerButton);
  expect(onPowerClick).toHaveBeenCalledTimes(1);
});

test('power click without handler does not throw', () => {
  const data: RemoAPI.Appliance = {
    nickname: "light", type: "LIGHT", image: "ico_light",
    light: { state: { power: "on" } }
  };
  const { container } = render(() => <Appliance data={data} />);
  const powerButton = container.querySelector('.power') as HTMLElement;
  expect(() => fireEvent.click(powerButton)).not.toThrow();
});
