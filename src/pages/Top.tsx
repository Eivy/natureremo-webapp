import React from 'react';
import { withRouter } from 'react-router';
import {RouteComponentProps} from 'react-router-dom';
import Api from '../Api';
import Device from '../components/Device';


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
  }

  render() {
    if (!this.state.devices) {
        return;
    }
    return this.state.devices.map((v: RemoAPI.Device) => <Device key={v.id} device={v} appliances={this.state.appliances.filter((a) => a.device!.id === v.id)} />);
  }

  componentDidMount() {
    const token = localStorage.getItem('access_token');
    if (!token) {
      this.props.history.push('/config');
      return;
    }
    Api.setToken(token);
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

export default withRouter(Top);
