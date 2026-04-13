import { render, screen, fireEvent } from '@solidjs/testing-library';
import { vi } from 'vitest';
import { Router, Route } from '@solidjs/router';
import Api from '../../Api';
import Config from '../../pages/Config';

const mockGetDevices = vi.spyOn(Api, 'GetDevices');
const mockGetAppliances = vi.spyOn(Api, 'GetAppliances');

beforeEach(() => {
  mockGetDevices.mockReset();
  mockGetAppliances.mockReset();
  window.history.pushState({}, '', '/config');
});

function renderConfig() {
  return render(() => (
    <Router url="/config">
      <Route path="/config" component={Config} />
      <Route path="/" component={() => <div>top page</div>} />
    </Router>
  ));
}

test('renders config form', () => {
  renderConfig();
  expect(screen.getByLabelText(/access token/i)).toBeInTheDocument();
});

test('default input value from localStorage', () => {
  localStorage.setItem('access_token', 'test');
  renderConfig();
  const input = screen.getByLabelText(/access token/i) as HTMLInputElement;
  expect(input.value).toBe('test');
});

test('save token to localStorage and navigate', async () => {
  mockGetDevices.mockResolvedValue([{ id: "device_id", name: "test_device", newest_events: {} }]);
  mockGetAppliances.mockResolvedValue([{ id: "appliance_id", nickname: "test_appliance", device: { id: "device_id" } }]);
  const inputValue = 'saved_to_localStorage';

  renderConfig();
  const input = screen.getByLabelText(/access token/i);
  fireEvent.input(input, { target: { value: inputValue } });
  fireEvent.click(screen.getByRole('button'));

  expect(localStorage.getItem('access_token')).toBe(inputValue);
  await vi.waitFor(() => {
    expect(screen.getByText('top page')).toBeInTheDocument();
  });
  expect(mockGetDevices).toHaveBeenCalledTimes(1);
  expect(mockGetAppliances).toHaveBeenCalledTimes(1);
});

test('remove token from localStorage when empty', () => {
  localStorage.setItem('access_token', 'existing_token');
  renderConfig();
  const input = screen.getByLabelText(/access token/i);
  fireEvent.input(input, { target: { value: '' } });
  fireEvent.click(screen.getByRole('button'));
  expect(localStorage.getItem('access_token')).toBeNull();
});
