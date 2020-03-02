import * as React from 'react';
import {render} from '@testing-library/react';
import ButtonsTV from './ButtonsTV';

test('wrong appliance', () => {
  const data: RemoAPI.Appliance = {
    id: "test",
    type: "LIGHT",
  };
  const button = render(<ButtonsTV appliance={data} />);
  const label = button.getByText(/Wrong/);
  expect(label).toBeInTheDocument();
});

test('test buttons', () => {
  const data: RemoAPI.Appliance = {
    id: "test",
    type: "TV",
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
  const { getByText } = render(<ButtonsTV appliance={data} />);
  expect(getByText("電源")).toBeInTheDocument();
});

test('test signals', () => {
  const data: RemoAPI.Appliance = {
    id: "test",
    type: "TV",
    tv: { buttons: [] },
    signals: [
      {
        id: "test_signal",
        name: "Signal1",
        image: "ico_lightdown",
      }
    ]
  };
  const { getByText } = render(<ButtonsTV appliance={data} />);
  expect(getByText("Signal1")).toBeInTheDocument();
});
