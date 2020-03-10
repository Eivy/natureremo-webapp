import React from 'react';
import {render} from '@testing-library/react';
import Signal from './Signal';

const data: RemoAPI.Signal = {
  image: "ico_lightup",
  id: "test_id",
  name: "lightup",
}

test('label text', () => {
  const button = render(<Signal signal={data} />);
  const label = button.getByText(data.name!);
  expect(label).toBeInTheDocument();
});

test('svg alt text', () => {
  const button = render(<Signal signal={data} />);
  const label = button.getByText("LightUp");
  expect(label).toBeInTheDocument();
});

test('render unmatched icon', () => {
  const data: RemoAPI.Signal = {
    image: "something",
    id: "test_id",
    name: "lightup",
  }
  const button = render(<Signal signal={data} />);
  const label = button.queryAllByText(data.name!);
  expect(label.length).toBe(3);
});

