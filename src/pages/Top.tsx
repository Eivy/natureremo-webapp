import React from 'react';
import {RouteComponentProps} from 'react-router-dom';
import Api from '../Api';
import Device from '../components/Device';
import Appliance from '../components/Appliance';

interface Props extends RouteComponentProps {}

interface State {
  devices: Array<RemoAPI.Device>;
  appliances: Array<RemoAPI.Appliance>;
}

class Top extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      devices: [],
      appliances: [],
    };
    const token = localStorage.getItem('access_token');
    if (!token) {
      this.props.history.push('/config');
      return;
    }
    Api.setToken(token);
  }

  render() {
    const devices = this.state.devices.map((v: RemoAPI.Device) => (
      <Device key={v.id} device={v}>
      {this.state.appliances.filter((a) => a.device!.id === v.id).map((v) => <Appliance key={v.id} data={v} />)}
      </Device>
      )
    );
    return (
      <React.Fragment>
        { devices }
      </React.Fragment>
    );
  }

  componentDidMount() {
    Api.GetDevices().then((v) => {
      if (v) {
        this.setState({devices: v});
      }
    });
    Api.GetAppliances().then((v) => {
      if (v) {
        this.setState({appliances: v});
      }
    });
  }

}

export default Top;
