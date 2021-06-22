import * as React from 'react';
import {render} from '@testing-library/react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ButtonsLight from '../../components/ButtonsLight';
Enzyme.configure({adapter: new Adapter()});

test('wrong appliance', () => {
  const data: RemoAPI.Appliance = {
    id: "test",
    type: "TV",
  };
  const button = render(<ButtonsLight appliance={data} />);
  const label = button.getByText(/Wrong/);
  expect(label).toBeInTheDocument();
});

test('test buttons', () => {
  const data: RemoAPI.Appliance = {
    id: "test",
    type: "LIGHT",
    light: {
      buttons: [
        {
          "image": "ico_timer",
          "name": "Power",
          "label": "電源",
        }
      ]
    },
    signals: []
  };
  const { getByText } = render(<ButtonsLight appliance={data} />);
  expect(getByText("電源")).toBeInTheDocument();
});

test('test signals', () => {
  const data: RemoAPI.Appliance = {
    id: "test",
    type: "LIGHT",
    light: { buttons: [] },
    signals: [
      {
        id: "test_signal",
        name: "Signal1",
        image: "ico_lightdown",
      }
    ]
  };
  const { getByText } = render(<ButtonsLight appliance={data} />);
  expect(getByText("Signal1")).toBeInTheDocument();
});

test('test signal click', () => {
  const data: RemoAPI.Appliance = {
    id: "test",
    type: "LIGHT",
    light: { buttons: [] },
    signals: [
      {
        id: "test_signal",
        name: "Signal1",
        image: "ico_lightdown",
      }
    ]
  };
  const mockConsole = jest.spyOn(console, 'log');
  mockConsole.mockReset();
  const buttons = Enzyme.mount(<ButtonsLight appliance={data} onSignalClick={() => console.log('test')} />);
  const button = buttons.find('button').at(0);
  button.simulate('click');
  expect(mockConsole.mock.calls.length).toBe(1);
});

test('test signal click without handler', () => {
  const data: RemoAPI.Appliance = {
    id: "test",
    type: "LIGHT",
    light: { buttons: [] },
    signals: [
      {
        id: "test_signal",
        name: "Signal1",
        image: "ico_lightdown",
      }
    ]
  };
  const buttons = Enzyme.mount(<ButtonsLight appliance={data} />);
  const button = buttons.find('button').at(0);
  button.simulate('click');
});

test('test button click', () => {
  const data: RemoAPI.Appliance = {
    id: "test",
    type: "LIGHT",
    light: { buttons: [
        {
          "image": "ico_timer",
          "name": "Power",
          "label": "電源",
        }
    ] },
    signals: []
  };
  const mockConsole = jest.spyOn(console, 'log');
  mockConsole.mockReset();
  const buttons = Enzyme.mount(<ButtonsLight appliance={data} onButtonClick={() => console.log('test')} />);
  const button = buttons.find('button').at(0);
  button.simulate('click');
  expect(mockConsole.mock.calls.length).toBe(1);
});

test('test button click without handler', () => {
  const data: RemoAPI.Appliance = {
    id: "test",
    type: "LIGHT",
    light: { buttons: [
        {
          "image": "ico_timer",
          "name": "Power",
          "label": "電源",
        }
    ] },
    signals: []
  };
  const buttons = Enzyme.mount(<ButtonsLight appliance={data} />);
  const button = buttons.find('button').at(0);
  button.simulate('click');
});
