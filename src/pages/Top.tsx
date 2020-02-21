import React from 'react';
import Device from '../components/Device';

interface Props {
  devices: Array<RemoAPI.Device>;
  appliances: Array<RemoAPI.Appliance>;
}

class PageTop extends React.Component<Props> {
    render() {
        if (!this.props.devices) {
            return;
        }
        return this.props.devices.map((v: RemoAPI.Device) => <Device key={v.id} device={v} appliances={this.props.appliances.filter((a) => a.device!.id === v.id)} />);
    }
}

export default PageTop;
