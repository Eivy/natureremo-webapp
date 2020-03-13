import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { actions } from './actions';

export interface State {
  appliances: Array<RemoAPI.Appliance>,
  devices: Array<RemoAPI.Device>,
}

const initialState: State = {
  appliances: [],
  devices: [],
}

export const reducer = reducerWithInitialState(initialState)
  .case(actions.updateAppliances, (state, appliances) => {
    return Object.assign({}, state, { appliances });
  })
  .case(actions.updateDevices, (state, devices) => {
    return Object.assign({}, state, { devices });
  })
  .case(actions.updateAppliance, (state, payload) => {
    const new_list = state.appliances.map((v) => v.id === payload.id ? payload.appliance : v);
    return Object.assign({}, state, { appliances: new_list });;
  })
  ;
