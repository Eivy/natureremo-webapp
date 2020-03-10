import React from 'react';
import {render} from '@testing-library/react';
import Button from './Button';

const data: RemoAPI.Button = {
  image: "ico_lightup",
  label: "明るく",
  name: "lightup",
}

test('label text', () => {
  const button = render(<Button button={data} />);
  const label = button.getByText(data.label!);
  expect(label).toBeInTheDocument();
});

test('svg alt text', () => {
  const button = render(<Button button={data} />);
  const label = button.getByText("LightUp");
  expect(label).toBeInTheDocument();
});

test('label something', () => {
  const data: RemoAPI.Button = {
    image: "something",
    label: "明るく",
    name: "lightup",
  }
  const button = render(<Button button={data} />);
  const label = button.queryAllByText(data.label!);
  expect(label.length).toBe(3);
});

