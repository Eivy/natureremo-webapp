import React from 'react';
import { withRouter } from 'react-router';
import './App.scss';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Action } from 'typescript-fsa';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppState } from './stores';
import { State } from './states';
import { actions } from './actions';
import Top from './pages/Top';
import Config from './pages/Config';
import Buttons from './pages/Buttons';
import {Gear} from './components/Icons';
import logo from './logo.svg';
import Api from './Api';

interface Actions {
  updateDevices: (v: RemoAPI.Device[]) => Action<RemoAPI.Device[]>;
  updateAppliances: (v: RemoAPI.Appliance[]) => Action<RemoAPI.Appliance[]>;
}

function mapDispatchToProps(dispatch: Dispatch<Action<any>>) {
  return {
    updateDevices: (v: RemoAPI.Device[]) => dispatch(actions.updateDevices(v)),
    updateAppliances: (v: RemoAPI.Appliance[]) => dispatch(actions.updateAppliances(v)),
  }
}

function mapStateToProps(appState: AppState) {
  return Object.assign({}, appState.remo);
}

type Props = State & Actions;

class App extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    const token = localStorage.getItem("access_token");
    if (!token) {
      return;
    }
    Api.setToken(token);
    Api.GetDevices().then((v) => {
      if (v) {
        props.updateDevices(v);
      }
    });
    Api.GetAppliances().then((v) => {
      if (v) {
        props.updateAppliances(v);
      }
    });
  }

  render() {
    return (
      <Router>
        <header>
          <Link to="/" className="logo"><img src={logo} alt="logo"/>RemoWebApp</Link>
          <Link to="/config" className="config"><Gear/></Link>
        </header>
        <div id="main">
          <Switch>
            <Route path="/appliances/:id" component={withRouter(Buttons)} />
            <Route path="/config" component={withRouter(Config)} />
            <Route path="/" component={withRouter(Top)} />
          </Switch>
        </div>
      </Router>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(App);
