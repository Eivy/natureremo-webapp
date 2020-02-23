import React from 'react';
import {withRouter} from 'react-router';
import './App.scss';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Top from './pages/Top';
import Config from './pages/Config';
import {Gear} from './components/Icons';
import logo from './logo.svg';

const App: React.FC = () => {
  return (
    <Router>
      <header>
        <Link to="/" className="logo"><img src={logo} alt="logo"/>RemoWebApp</Link>
        <Link to="/config" className="config"><Gear/></Link>
      </header>
      <div id="main">
        <Switch>
          <Route path="/config" component={withRouter(Config)} />
          <Route path="/" component={withRouter(Top)} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
