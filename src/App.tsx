import React from 'react';
import './App.scss';
import Api from './Api';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import history from 'history/createBrowserHistory';
import Top from './pages/Top';
import Config from './pages/Config';

interface Props {
}

interface State {
  devices: Array<RemoAPI.Device>;
  appliances: Array<RemoAPI.Appliance>;

}

class App extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      devices: [],
      appliances: [],
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('access_token');
    if (!token) {
      history().push('/config');
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

  render() {
    return (
    <Router>
      <Switch>
        <Route path="/config">
          <Config />
        </Route>
        <Route path="/">
          <Top devices={this.state.devices} appliances={this.state.appliances} />
        </Route>
      </Switch>
    </Router>
    );
  }
}

export default App;
