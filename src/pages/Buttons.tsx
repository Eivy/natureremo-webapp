import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Actions, mapDispatchToProps, mapStateToProps } from '../dispatcher';
import { State } from '../states';
import ButtonsLight from '../components/ButtonsLight';
import ButtonsTV from '../components/ButtonsTV';
import ButtonsAC from '../components/ButtonsAC';
import ButtonsIR from '../components/ButtonsIR';
import Api from '../Api';

type Props = State & Actions & RouteComponentProps<{id: string}>;

class Buttons extends React.Component<Props> {

  async sendLightButton(button: RemoAPI.Button): Promise<void> {
    const new_state = await Api.SendLightButton(this.props.match.params.id, button.name!)
    const tmp = this.props.appliances.filter((v) => v.id === this.props.match.params.id)[0];
    tmp.light!.state = new_state;
    this.props.updateAppliance(this.props.match.params.id, tmp);
  }

  sendTVButton(button: RemoAPI.Button): void {
    Api.SendTVButton(this.props.match.params.id, button.name!)
  }

  sendSignal(signal: RemoAPI.Signal): void {
    Api.SendSignal(signal.id!)
  }

  async sendAriconSettings(id: string,data: { temperature?: string, operation_mode?: string, air_volume?: string, air_direction?: string, button?: string }): Promise<void> {
    const new_settings = await Api.SendAirconSettings(id, data);
    const tmp = this.props.appliances.filter((v) => v.id === this.props.match.params.id)[0];
    tmp.settings! = new_settings;
    this.props.updateAppliance(this.props.match.params.id, tmp);
  }

  render() {
    const appliances = this.props.appliances.filter((v) => v.id === this.props.match.params.id);
    if (appliances.length < 1) {
      return <div>Wrong data!!</div>
    }
    const appliance = appliances[0];
    switch (appliance.type) {
      case "LIGHT":
        return <ButtonsLight appliance={appliance} onSignalClick={(signal) => {this.sendSignal(signal)}} onButtonClick={(button) => {this.sendLightButton(button)}} />
      case "IR":
        return <ButtonsIR appliance={appliance} onSignalClick={(signal) => {this.sendSignal(signal)}} />
      case "TV":
        return <ButtonsTV appliance={appliance} onSignalClick={(signal) => {this.sendSignal(signal)}} onButtonClick={(button) => {this.sendTVButton(button)}} />
      case "AC":
        return <ButtonsAC appliance={appliance} onChange={(data) => {this.sendAriconSettings(this.props.match.params.id, data)}} />
      default:
        return <div>Wrong data!!</div>
    }
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Buttons);
