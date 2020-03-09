import React from 'react';
import {RouteComponentProps} from 'react-router-dom';
import { Action } from 'typescript-fsa';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../stores';
import { State } from '../states';
import { actions } from '../actions';
import Api from '../Api';
import Device from '../components/Device';
import Appliance from '../components/Appliance';

interface Actions {
  updateDevices: (v: RemoAPI.Device[]) => Action<RemoAPI.Device[]>;
  updateAppliances: (v: RemoAPI.Appliance[]) => Action<RemoAPI.Appliance[]>;
  updateAppliance: (id: string, appliance: RemoAPI.Appliance) => Action<{id: string, appliance: RemoAPI.Appliance}>;
}

function mapDispatchToProps(dispatch: Dispatch<Action<any>>) {
  return {
    updateDevices: (v: RemoAPI.Device[]) => dispatch(actions.updateDevices(v)),
    updateAppliances: (v: RemoAPI.Appliance[]) => dispatch(actions.updateAppliances(v)),
    updateAppliance: (id: string, appliance: RemoAPI.Appliance) => dispatch(actions.updateAppliance({id, appliance})),
  }
}

function mapStateToProps(appState: AppState) {
  return Object.assign({}, appState.remo);
}

type Props = State & Actions & RouteComponentProps;

class Top extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
    const token = localStorage.getItem('access_token');
    if (!token) {
      this.props.history.push('/config');
      return;
    }
  }

  render() {
    const devices = this.props.devices.map((v: RemoAPI.Device) => (
      <Device key={v.id} device={v}>
      {
        this.props.appliances.filter((a) => a.device!.id === v.id).map((v) => (
          <Appliance
            key={v.id}
            data={v}
            onClick={(event) => this.props.history.push('/appliances/' + v.id)}
            onPowerClick={async (event) => {
              if (v.type === 'LIGHT') {
                const newState = await Api.SendLightButton(v.id!, v.light!.state!.power === 'on' ? 'off' : 'on');
                v.light!.state = newState;
                this.props.updateAppliance(v.id!, v);
              } else if (v.type === 'AC') {
                const newSettings = await Api.SendAirconSettings(v.id!, {button: v.settings!.button === 'power-off' ? '' : 'power-off'});
                v.settings = newSettings;
                this.props.updateAppliance(v.id!, v);
              }
            }}
          />
        ))
      }
      </Device>
      )
    );
    return (
      <React.Fragment>
        { devices }
      </React.Fragment>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Top);
