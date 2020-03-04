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

interface Actions { }

function mapDispatchToProps(dispatch: Dispatch<Action<any>>) {
  return { };
}

function mapStateToProps(appState: AppState) {
  return Object.assign({}, appState.remo);
}

type Props = State & Actions & RouteComponentProps<{id: string}>;

class Buttons extends React.Component<Props> {

  render() {
    const appliances = this.props.appliances.filter((v) => v.id === this.props.match.params.id);
    if (appliances.length < 1) {
      return <div>Wrong data!!</div>
    }
    const appliance = appliances[0];
    switch (appliance.type) {
      case "LIGHT":
        return <ButtonsLight appliance={appliance} />
      case "IR":
        return <ButtonsIR appliance={appliance} />
      case "TV":
        return <ButtonsTV appliance={appliance} />
      case "AC":
        return <ButtonsAC appliance={appliance} />
      default:
        return <div>Wrong data!!</div>
    }
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Buttons);
