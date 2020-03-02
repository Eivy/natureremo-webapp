import * as React from 'react';
import {render} from '@testing-library/react';
import ButtonsAC from './ButtonsAC';

test('wrong appliance', () => {
  const data: RemoAPI.Appliance = {
    id: "test",
    type: "LIGHT",
  };
  const button = render(<ButtonsAC appliance={data} />);
  const label = button.getByText(/Wrong/);
  expect(label).toBeInTheDocument();
});

test('test buttons', () => {
  const data: RemoAPI.Appliance = {
    id: "test",
    type: "AC",
    tv: {
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
  const { getByText } = render(<ButtonsAC appliance={data} />);
  expect(getByText("電源")).toBeInTheDocument();
});

test('test signals', () => {
  const data: RemoAPI.Appliance = {
    id: "test",
    type: "AC",
    tv: { buttons: [] },
    signals: [
      {
        id: "test_signal",
        name: "Signal1",
        image: "ico_lightdown",
      }
    ]
  };
  const { getByText } = render(<ButtonsAC appliance={data} />);
  expect(getByText("Signal1")).toBeInTheDocument();
});
