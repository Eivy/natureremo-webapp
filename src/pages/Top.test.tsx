import * as React from 'react';
import { createStore, combineReducers } from 'redux';
import { reducer } from '../states';
import { withRouter } from 'react-router';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory as createHistory } from 'history';
import { render } from '@testing-library/react'
import { Provider } from 'react-redux';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Top from './Top';
import store, { AppState } from '../stores';
import { actions } from '../actions';
import Api from '../Api';

describe('test top page', () => {
  Enzyme.configure({ adapter: new Adapter() });
  const mockSendLightButton = jest.spyOn(Api, 'SendLightButton');
  const mockSendAirconSettings = jest.spyOn(Api, 'SendAirconSettings');

  beforeEach(() => {
    store.dispatch(actions.updateDevices([{"id": "device_id", "name": "test_device", "newest_events": {}}]));
    store.dispatch(actions.updateAppliances([{"id": "appliance_id", "nickname": "test_appliance", "device": {"id": "device_id"}},{"id": "appliance_id_not_render", "nickname": "test_appliance_not_render", "device": {"id": "device_id_not_contain"}}]));
    localStorage.clear();
  })

  test('navigate to config', () => {
    const hist = createHistory();
    render(
      <Provider store={store}>
        <Router history={hist} >
          <Route path="/" component={withRouter(Top)} />
        </Router>
      </Provider>
    );
    expect(hist.location.pathname).toBe("/config");
  });

  test('not navigate to config', () => {
    localStorage.setItem('access_token', 'test');
    const hist = createHistory();
    render(
      <Provider store={store}>
        <Router history={hist} >
          <Route path="/" component={withRouter(Top)} />
        </Router>
      </Provider>
    );
    expect(hist.location.pathname).toBe("/");
  });

  test('render device', async () => {
    localStorage.setItem('access_token', 'test');
    const { getByText } = render(<Provider store={store}><Top /></Provider>);
    setImmediate(() => {
      expect(getByText('test_device')).toBeInTheDocument();
    })
  });

  test('render appliances', async () => {
    localStorage.setItem('access_token', 'test');
    const { queryByText } = render(<Provider store={store}><Top /></Provider>);
    setImmediate(() => {
      expect(queryByText('test_appliance')).toBeInTheDocument();
    })
  });

  test('click appliance', async () => {
    localStorage.setItem('access_token', 'test');
    const hist = createHistory();
    const top = Enzyme.mount(
      <Provider store={store}>
        <Router history={hist} >
          <Route path="/" component={withRouter(Top)} />
        </Router>
      </Provider>
    );
    setImmediate(() => {
      const appliance = top.find('.appliance').at(0);
      appliance.simulate('click');
      expect(hist.location.pathname).toBe('/appliances/appliance_id');
    })
  });

  test('click light power to off', async () => {
    const store = createStore(
      combineReducers<AppState>({
        remo: reducer,
      })
    );
    store.dispatch(actions.updateDevices([{"id": "device_id", "name": "test_device", "newest_events": {}}]));
    localStorage.setItem('access_token', 'test');
    mockSendLightButton.mockResolvedValue(new Promise((resolve, reject) => resolve({power: 'off'})));
    store.dispatch(actions.updateAppliances([{
      "id": "appliance_id",
      "nickname": "test_appliance",
      "type": "LIGHT",
      "light": {
        state: {power: 'on'}
      },
      "device": {"id": "device_id"}
    }]));
    const hist = createHistory();
    const top = Enzyme.mount(
      <Provider store={store}>
        <Router history={hist} >
          <Route path="/" component={withRouter(Top)} />
        </Router>
      </Provider>
    );
    setImmediate(() => {
      const appliance = top.find('.power').at(0);
      appliance.simulate('click');
      setImmediate(() => {
        expect(store.getState().remo.appliances[0].light!.state!.power).toBe('off');
      });
    })
  });

  test('click light power to on', async () => {
    const store = createStore(
      combineReducers<AppState>({
        remo: reducer,
      })
    );
    store.dispatch(actions.updateDevices([{"id": "device_id", "name": "test_device", "newest_events": {}}]));
    localStorage.setItem('access_token', 'test');
    mockSendLightButton.mockResolvedValue(new Promise((resolve, reject) => resolve({power: 'on'})));
    store.dispatch(actions.updateAppliances([{
      "id": "appliance_id",
      "nickname": "test_appliance",
      "type": "LIGHT",
      "light": {
        state: {power: 'off'}
      },
      "device": {"id": "device_id"}
    }]));
    const hist = createHistory();
    const top = Enzyme.mount(
      <Provider store={store}>
        <Router history={hist} >
          <Route path="/" component={withRouter(Top)} />
        </Router>
      </Provider>
    );
    setImmediate(() => {
      const appliance = top.find('.power').at(0);
      appliance.simulate('click');
      setImmediate(() => {
        expect(store.getState().remo.appliances[0].light!.state!.power).toBe('on');
      });
    })
  });

  test('click ac power to off', async () => {
    const store = createStore(
      combineReducers<AppState>({
        remo: reducer,
      })
    );
    store.dispatch(actions.updateDevices([{"id": "device_id", "name": "test_device", "newest_events": {}}]));
    localStorage.setItem('access_token', 'test');
    mockSendAirconSettings.mockResolvedValue(new Promise((resolve, reject) => resolve({button: 'power-off'})));
    store.dispatch(actions.updateAppliances([{
      "id": "appliance_id",
      "nickname": "test_appliance",
      "type": "AC",
      "settings": {
        button: '',
      },
      "device": {"id": "device_id"}
    }]));
    const hist = createHistory();
    const top = Enzyme.mount(
      <Provider store={store}>
        <Router history={hist} >
          <Route path="/" component={withRouter(Top)} />
        </Router>
      </Provider>
    );
    setImmediate(() => {
      const appliance = top.find('.power').at(0);
      appliance.simulate('click');
      setImmediate(() => {
        expect(store.getState().remo.appliances[0].settings!.button).toBe('power-off');
      });
    })
  });

  test('click ac power to on', async () => {
    const store = createStore(
      combineReducers<AppState>({
        remo: reducer,
      })
    );
    store.dispatch(actions.updateDevices([{"id": "device_id", "name": "test_device", "newest_events": {}}]));
    localStorage.setItem('access_token', 'test');
    mockSendAirconSettings.mockResolvedValue(new Promise((resolve, reject) => resolve({button: ''})));
    store.dispatch(actions.updateAppliances([{
      "id": "appliance_id",
      "nickname": "test_appliance",
      "type": "AC",
      "settings": {
        button: 'power-off',
      },
      "device": {"id": "device_id"}
    }]));
    const hist = createHistory();
    const top = Enzyme.mount(
      <Provider store={store}>
        <Router history={hist} >
          <Route path="/" component={withRouter(Top)} />
        </Router>
      </Provider>
    );
    setImmediate(() => {
      const appliance = top.find('.power').at(0);
      appliance.simulate('click');
      setImmediate(() => {
        expect(store.getState().remo.appliances[0].settings!.button).toBe('');
      });
    })
  });

});
