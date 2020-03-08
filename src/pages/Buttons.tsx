import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Action } from 'typescript-fsa';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../stores';
import { State } from '../states';
import ButtonsLight from '../components/ButtonsLight';
import ButtonsTV from '../components/ButtonsTV';
import ButtonsAC from '../components/ButtonsAC';
import ButtonsIR from '../components/ButtonsIR';
import Api from '../Api';

interface Actions { }

function mapDispatchToProps(dispatch: Dispatch<Action<any>>) {
  return { };
}

function mapStateToProps(appState: AppState) {
  return Object.assign({}, appState.remo);
}

type Props = State & Actions & RouteComponentProps<{id: string}>;

class Buttons extends React.Component<Props> {

  sendLightButton(button: RemoAPI.Button): any {
    Api.SendLightButton(this.props.match.params.id, button.name!)
  }

  sendTVButton(button: RemoAPI.Button): any {
    Api.SendTVButton(this.props.match.params.id, button.name!)
  }

  sendSignal(signal: RemoAPI.Signal): any {
    Api.SendSignal(signal.id!)
  }

  sendAriconSettings(id: string,data: { temperature?: string, operation_mode?: string, air_volume?: string, air_direction?: string, button?: string }): void {
    Api.SendAirconSettings(id, data);
  }

  render() {
    const appliances = this.props.appliances.filter((v) => v.id === this.props.match.params.id);
    if (appliances.length < 1) {
      return <div>Wrong data!!</div>
    }
    const appliance = appliances[0];
    switch (appliance.type) {
      case "LIGHT":
        return <ButtonsLight appliance={appliance} onSignalClick={(signal): any => {this.sendSignal(signal)}} onButtonClick={(button): any => {this.sendLightButton(button)}} />
      case "IR":
        return <ButtonsIR appliance={appliance} onSignalClick={(signal): any => {this.sendSignal(signal)}} />
      case "TV":
        return <ButtonsTV appliance={appliance} onSignalClick={(signal): any => {this.sendSignal(signal)}} onButtonClick={(button): any => {this.sendTVButton(button)}} />
      case "AC":
        return <ButtonsAC appliance={appliance} onChange={(data) => {this.sendAriconSettings(this.props.match.params.id, data)}} />
      default:
        return <div>Wrong data!!</div>
    }
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Buttons);
