import { render, screen } from '@solidjs/testing-library';
import Signal from '../../components/Signal';

const data: RemoAPI.Signal = {
  image: "ico_lightup",
  id: "test_id",
  name: "lightup",
};

test('label text', () => {
  render(() => <Signal signal={data} />);
  expect(screen.getByText(data.name!)).toBeInTheDocument();
});

test('svg alt text', () => {
  render(() => <Signal signal={data} />);
  expect(screen.getByText("LightUp")).toBeInTheDocument();
});

test('renders text icon for unknown image', () => {
  const unknown: RemoAPI.Signal = { image: "something", id: "test_id", name: "lightup" };
  render(() => <Signal signal={unknown} />);
  expect(screen.getAllByText(unknown.name!).length).toBeGreaterThanOrEqual(1);
});
