import React from 'react';
import './App.scss';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Top from './pages/Top';
import Config from './pages/Config';

const App: React.FC = () => {
  return (
  <Router>
    <Switch>
      <Route path="/config" component={Config} />
      <Route path="/" component={Top} />
    </Switch>
  </Router>
  );
};

export default App;
