import { render, screen } from '@solidjs/testing-library';
import Button from '../../components/Button';

const data: RemoAPI.Button = {
  image: "ico_lightup",
  label: "明るく",
  name: "lightup",
};

test('label text', () => {
  render(() => <Button button={data} />);
  expect(screen.getByText(data.label!)).toBeInTheDocument();
});

test('svg alt text', () => {
  render(() => <Button button={data} />);
  expect(screen.getByText("LightUp")).toBeInTheDocument();
});

test('renders text icon for unknown image', () => {
  const unknown: RemoAPI.Button = { image: "something", label: "明るく", name: "lightup" };
  render(() => <Button button={unknown} />);
  // label appears in SVG <text> element and in <div class="label">
  expect(screen.getAllByText(unknown.label!).length).toBeGreaterThanOrEqual(1);
});
