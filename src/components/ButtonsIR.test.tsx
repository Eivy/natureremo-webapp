import * as React from 'react';
import {render} from '@testing-library/react';
import ButtonsIR from './ButtonsIR';

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
