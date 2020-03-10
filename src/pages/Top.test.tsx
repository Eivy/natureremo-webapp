import * as React from 'react';
import { withRouter } from 'react-router';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory as createHistory } from 'history';
import { render } from '@testing-library/react'
import { Provider } from 'react-redux';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Top from './Top';
import store from '../stores';
import { actions } from '../actions';

describe('test top page', () => {
  Enzyme.configure({ adapter: new Adapter() });
  beforeAll(() => {
    store.dispatch(actions.updateDevices([{"id": "device_id", "name": "test_device", "newest_events": {}}]));
    store.dispatch(actions.updateAppliances([{"id": "appliance_id", "nickname": "test_appliance", "device": {"id": "device_id"}},{"id": "appliance_id_not_render", "nickname": "test_appliance_not_render", "device": {"id": "device_id_not_contain"}}]));
  })

  beforeEach(() => {
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

  test('not render appliances', async () => {
    localStorage.setItem('access_token', 'test');
    const { queryByText } = render(<Provider store={store}><Top /></Provider>);
    setImmediate(() => {
      expect(queryByText('test_appliance_not_render')).not.toBeInTheDocument();
    })
  });

});
