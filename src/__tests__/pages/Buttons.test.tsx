import * as React from 'react';
import {render} from '@testing-library/react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { withRouter } from 'react-router';
import { MemoryRouter as Router, Route } from 'react-router-dom';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import store, { AppState } from '../../stores';
import { actions } from '../../actions';
import { reducer } from '../../states';
import Buttons from '../../pages/Buttons';
import Api from '../../Api';

describe('test buttons', () => {

  Enzyme.configure({ adapter: new Adapter() });
  const mockSendLightButton = jest.spyOn(Api, 'SendLightButton');
  mockSendLightButton.mockResolvedValue({power: 'off'});
  const mockSendAirconSettings = jest.spyOn(Api, 'SendAirconSettings');
  mockSendAirconSettings.mockResolvedValue(new Promise((resolve, reject) => resolve({button: ''})));
  const mockSendSignal = jest.spyOn(Api, 'SendSignal');
  mockSendSignal.mockResolvedValue(new Promise<void>((resolve, reject) => { return; }));
  const mockSendTVButton = jest.spyOn(Api, 'SendTVButton');
  mockSendTVButton.mockResolvedValue(new Promise((resolve, reject) => { return; }));

  beforeAll(() => {
    store.dispatch(actions.updateDevices([{"id": "device_id", "name": "test_device", "newest_events": {}}]));
    localStorage.setItem('access_token', 'test');
  });

  beforeEach(() => {
    mockSendTVButton.mockReset();
    mockSendSignal.mockReset();
    mockSendLightButton.mockReset();
    mockSendAirconSettings.mockReset();
  });

  test('click light button', async () => {
    const store = createStore(
      combineReducers<AppState>({
        remo: reducer,
      })
    );
    store.dispatch(actions.updateAppliances([{
      "id": "test",
      "nickname": "test_appliance",
      "type": "LIGHT",
      "light": {
        buttons: [
          {
            name: 'button1',
            image: 'ico_lightup',
            label: 'button1',
          }
        ],
      },
      "signals": [],
      "device": {"id": "device_id"}
    }]));
    const buttons = Enzyme.mount(
      <Provider store={store}>
        <Router initialEntries={["/appliances/test"]}>
          <Route path="/appliances/:id" component={withRouter(Buttons)} />
        </Router>
      </Provider>
    );
    const button = buttons.find('button').at(0);
    button.simulate('click');
    setImmediate(() => {
      expect(mockSendLightButton.mock.calls.length).toBe(1);
    });
  });

  test('click tv button', async () => {
    const store = createStore(
      combineReducers<AppState>({
        remo: reducer,
      })
    );
    store.dispatch(actions.updateAppliances([{
      "id": "test",
      "nickname": "test_appliance",
      "type": "TV",
      "tv": {
        buttons: [
          {
            name: 'button1',
            image: 'ico_lightup',
            label: 'button1',
          }
        ],
      },
      "signals": [],
      "device": {"id": "device_id"}
    }]));
    const buttons = Enzyme.mount(
      <Provider store={store}>
        <Router initialEntries={["/appliances/test"]}>
          <Route path="/appliances/:id" component={withRouter(Buttons)} />
        </Router>
      </Provider>
    );
    const button = buttons.find('button').at(0);
    button.simulate('click');
    setImmediate(() => {
      expect(mockSendTVButton.mock.calls.length).toBe(1);
    });
  });

  test('click ir button', async () => {
    const store = createStore(
      combineReducers<AppState>({
        remo: reducer,
      })
    );
    store.dispatch(actions.updateAppliances([{
      id: "test",
      nickname: "test_appliance",
      type: "IR",
      signals: [
        {
          id: "test_id",
          name: "test",
          image: "ico_power",
        }
      ],
      device: {"id": "device_id"}
    }]));
    const buttons = Enzyme.mount(
      <Provider store={store}>
        <Router initialEntries={["/appliances/test"]}>
          <Route path="/appliances/:id" component={withRouter(Buttons)} />
        </Router>
      </Provider>
    );
    const button = buttons.find('button').at(0);
    button.simulate('click');
    setImmediate(() => {
      expect(mockSendSignal.mock.calls.length).toBe(1);
    });
  });

  test('click ac button', async () => {
    const store = createStore(
      combineReducers<AppState>({
        remo: reducer,
      })
    );
    mockSendAirconSettings.mockResolvedValue({button: ''});
    store.dispatch(actions.updateAppliances([{
      id: "test",
      nickname: "test_appliance",
      type: "AC",
      aircon: {
        range: {
          modes: {
            warm: {
              temp: ['18','19','20','21'],
              vol: ['1','2','3','4','auto',''],
              dir: ['1','2','3','4','swing','auto',''],
            },
          },
          fixedButtons: ['power-off'],
        },
        tempUnit: 'c',
      },
      settings: {
        mode: 'warm',
        temp: '18',
        vol: '2',
        dir: 'auto',
        button: '',
      },
      signals: [],
      device: {"id": "device_id"}
    }]));
    const buttons = Enzyme.mount(
      <Provider store={store}>
        <Router initialEntries={["/appliances/test"]}>
          <Route path="/appliances/:id" component={withRouter(Buttons)} />
        </Router>
      </Provider>
    );
    const button = buttons.find('button').at(0);
    button.simulate('click');
    setImmediate(() => {
      expect(mockSendAirconSettings.mock.calls.length).toBe(1);
    });
  });

  test('render something', async () => {
    const store = createStore(
      combineReducers<AppState>({
        remo: reducer,
      })
    );
    store.dispatch(actions.updateAppliances([{
      id: "test",
      nickname: "test_appliance",
      type: "SOMETHING",
      signals: [],
      device: {"id": "device_id"}
    }]));
    const buttons = render(
      <Provider store={store}>
        <Router initialEntries={["/appliances/test"]}>
          <Route path="/appliances/:id" component={withRouter(Buttons)} />
        </Router>
      </Provider>
    );
    expect(buttons.getByText(/wrong data/i)).toBeInTheDocument();
  });

  test('click light signal button', async () => {
    const store = createStore(
      combineReducers<AppState>({
        remo: reducer,
      })
    );
    store.dispatch(actions.updateAppliances([{
      id: "test",
      nickname: "test_appliance",
      type: "LIGHT",
      light: {
        buttons: []
      },
      signals: [
        {
          id: "test_id",
          name: "test",
          image: "ico_power",
        }
      ],
      device: {"id": "device_id"}
    }]));
    const buttons = Enzyme.mount(
      <Provider store={store}>
        <Router initialEntries={["/appliances/test"]}>
          <Route path="/appliances/:id" component={withRouter(Buttons)} />
        </Router>
      </Provider>
    );
    const button = buttons.find('button').at(0);
    button.simulate('click');
    setImmediate(() => {
      expect(mockSendSignal.mock.calls.length).toBe(1);
    });
  });

  test('click tv signal button', async () => {
    const store = createStore(
      combineReducers<AppState>({
        remo: reducer,
      })
    );
    store.dispatch(actions.updateAppliances([{
      id: "test",
      nickname: "test_appliance",
      type: "TV",
      tv: {
        buttons: []
      },
      signals: [
        {
          id: "test_id",
          name: "test",
          image: "ico_power",
        }
      ],
      device: {"id": "device_id"}
    }]));
    const buttons = Enzyme.mount(
      <Provider store={store}>
        <Router initialEntries={["/appliances/test"]}>
          <Route path="/appliances/:id" component={withRouter(Buttons)} />
        </Router>
      </Provider>
    );
    const button = buttons.find('button').at(0);
    button.simulate('click');
    setImmediate(() => {
      expect(mockSendSignal.mock.calls.length).toBe(1);
    });
  });

  test('click aircon signal button', async () => {
    const store = createStore(
      combineReducers<AppState>({
        remo: reducer,
      })
    );
    store.dispatch(actions.updateAppliances([{
      id: "test",
      nickname: "test_appliance",
      type: "AC",
      aircon: {
        range: {
          modes: {
            warm: {
              temp: ['18','19','20','21'],
              vol: ['1','2','3','4','auto',''],
              dir: ['1','2','3','4','swing','auto',''],
            },
          },
          fixedButtons: ['power-off'],
        },
        tempUnit: 'c',
      },
      settings: {
        mode: 'warm',
        temp: '18',
        vol: '2',
        dir: 'auto',
        button: '',
      },
      signals: [
        {
          id: "test_id",
          name: "test",
          image: "ico_power",
        }
      ],
      device: {"id": "device_id"}
    }]));
    const buttons = Enzyme.mount(
      <Provider store={store}>
        <Router initialEntries={["/appliances/test"]}>
          <Route path="/appliances/:id" component={withRouter(Buttons)} />
        </Router>
      </Provider>
    );
    const button = buttons.find('.signals button').at(0);
    button.simulate('click');
    setImmediate(() => {
      expect(mockSendSignal.mock.calls.length).toBe(1);
    });
  });

  test('render no appliance', async () => {
    const store = createStore(
      combineReducers<AppState>({
        remo: reducer,
      })
    );
    store.dispatch(actions.updateAppliances([]));
    const buttons = render(
      <Provider store={store}>
        <Router initialEntries={["/appliances/test"]}>
          <Route path="/appliances/:id" component={withRouter(Buttons)} />
        </Router>
      </Provider>
    );
    expect(buttons.getByText(/wrong data/i)).toBeInTheDocument();
  });

});
