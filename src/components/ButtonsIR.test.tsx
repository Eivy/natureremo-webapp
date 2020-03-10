import * as React from 'react';
import {render} from '@testing-library/react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import ButtonsIR from './ButtonsIR';

Enzyme.configure({ adapter: new Adapter() })

test('wrong appliance', () => {
  const data: RemoAPI.Appliance = {
    id: "test",
    type: "TV",
  };
  const button = render(<ButtonsIR appliance={data} />);
  const label = button.getByText(/Wrong/);
  expect(label).toBeInTheDocument();
});

test('test signals', () => {
  const data: RemoAPI.Appliance = {
    id: "test",
    type: "IR",
    signals: [
      {
        id: "test_signal",
        name: "Signal1",
        image: "ico_lightdown",
      }
    ]
  };
  const { getByText } = render(<ButtonsIR appliance={data} />);
  expect(getByText("Signal1")).toBeInTheDocument();
});

test('test click', () => {
  const data: RemoAPI.Appliance = {
    id: "test",
    type: "IR",
    signals: [
      {
        id: "test_signal",
        name: "Signal1",
        image: "ico_lightdown",
      }
    ]
  };
  const mockConsole = jest.spyOn(console, 'log');
  const buttons = Enzyme.mount(<ButtonsIR appliance={data} onSignalClick={(event) => console.log('test')} />);
  const button = buttons.find('button').at(0);
  button.simulate('click');
  expect(mockConsole.mock.calls.length).toBe(1);
});

test('test click without handler', () => {
  const data: RemoAPI.Appliance = {
    id: "test",
    type: "IR",
    signals: [
      {
        id: "test_signal",
        name: "Signal1",
        image: "ico_lightdown",
      }
    ]
  };
  const buttons = Enzyme.mount(<ButtonsIR appliance={data} />);
  const button = buttons.find('button').at(0);
  button.simulate('click');
});
