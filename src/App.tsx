import React from 'react';
import { withRouter } from 'react-router';
import './App.scss';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { State } from './states';
import { Actions, mapDispatchToProps, mapStateToProps } from './dispatcher';
import Top from './pages/Top';
import Config from './pages/Config';
import Buttons from './pages/Buttons';
import {Gear} from './components/Icons';
import Api from './Api';

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
      <Router basename="/natureremo-webapp">
        <header>
          <Link to="/" className="logo">RemoWebApp</Link>
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
