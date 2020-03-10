import { Dispatch } from 'redux';
import { Action } from 'typescript-fsa';
import { AppState } from './stores';
import { actions } from './actions';

export interface Actions {
  updateDevices: (v: RemoAPI.Device[]) => Action<RemoAPI.Device[]>;
  updateAppliances: (v: RemoAPI.Appliance[]) => Action<RemoAPI.Appliance[]>;
  updateAppliance: (id: string, appliance: RemoAPI.Appliance) => Action<{ id: string, appliance: RemoAPI.Appliance }>;
}

export function mapDispatchToProps(dispatch: Dispatch<Action<any>>) {
  return {
    updateDevices: (v: RemoAPI.Device[]) => dispatch(actions.updateDevices(v)),
    updateAppliances: (v: RemoAPI.Appliance[]) => dispatch(actions.updateAppliances(v)),
    updateAppliance: (id: string, appliance: RemoAPI.Appliance) => dispatch(actions.updateAppliance({ id, appliance })),
  }
}

export function mapStateToProps(appState: AppState) {
  return Object.assign({}, appState.remo);
}
