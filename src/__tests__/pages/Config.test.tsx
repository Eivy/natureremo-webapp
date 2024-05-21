import * as React from 'react'
import * as timers from 'timers';
import { Router, Route } from 'react-router-dom';
import { createStore, combineReducers } from 'redux';
import { reducer } from '../../states';
import { Provider } from 'react-redux';
import { withRouter } from 'react-router';
import { render } from '@testing-library/react'
import { createMemoryHistory as createHistory } from 'history';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Config from '../../pages/Config';
import { AppState } from '../../stores';
import Api from '../../Api';

if (typeof setImmediate !== 'function') {
  global.setImmediate = timers.setImmediate;
  global.clearImmediate = timers.clearImmediate;
}

Enzyme.configure({ adapter: new Adapter() })

const mockGetDevices = jest.spyOn(Api, 'GetDevices');
const mockGetAppliances = jest.spyOn(Api, 'GetAppliances');

beforeEach(() => {
  localStorage.clear()
})

test('renders config', () => {
  const store = createStore(
    combineReducers<AppState>({
      remo: reducer,
    })
  );
  const { getByLabelText } = render(<Provider store={store}><Config /></Provider>)
  expect(getByLabelText(/access token/i)).toBeInTheDocument()
});

test('default input value', () => {
  const store = createStore(
    combineReducers<AppState>({
      remo: reducer,
    })
  );
  localStorage.setItem('access_token', 'test')
  const config = Enzyme.mount(<Provider store={store}><Config /></Provider>)
  expect(config.find('input').get(0).props.defaultValue).toEqual('test')
});

test('save token to localStorage', () => {
  mockGetDevices.mockResolvedValue(new Promise((resolve, reject) => resolve([{"id": "device_id", "name": "test_device", "newest_events": {}}])));
  mockGetAppliances.mockResolvedValue(new Promise((resolve, reject) => resolve([{"id": "appliance_id", "nickname": "test_appliance", "device": {"id": "device_id"}}])));
  const hist = createHistory();
  const inputValue = 'saved to localStorage';
  const store = createStore(
    combineReducers<AppState>({
      remo: reducer,
    })
  );
  const config = Enzyme.mount(<Provider store={store}><Router history={hist}><Route path="/" component={withRouter(Config)} /></Router></Provider>);
  const input = config.find('input').at(0);
  const button = config.find('button').at(0);
  input.simulate('change', { target: { value: inputValue } });
  button.simulate('click');
  expect(localStorage.getItem('access_token')).toBe(inputValue);
  setImmediate(() => {
    expect(mockGetAppliances.mock.calls.length).toBe(1);
    expect(mockGetDevices.mock.calls.length).toBe(1);
    expect(hist.location.pathname).toBe('/');
  });
})

test('remove token to localStorage', () => {
  const store = createStore(
    combineReducers<AppState>({
      remo: reducer,
    })
  );
  const inputValue = 'saved to localStorage';
  localStorage.setItem('access_token', inputValue);
  const config = Enzyme.mount(<Provider store={store}><Config /></Provider>);
  const input = config.find('input').at(0);
  const button = config.find('button').at(0);
  input.simulate('change', { target: { value: '' } })
  button.simulate('click')
  expect(localStorage.getItem('access_token')).toBe(null)
})
