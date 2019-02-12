import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import Login from '../../components/Login/';
import Dashboard from '../../components/Dashboard/';
import oAuth from '../oAuth/';


class App extends Component {
  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path='/' exact component={ Login } />
          <Route path='/dashboard' component={ oAuth(Dashboard) } />
        </Switch>
      </Router>
    );
  }
}

export default App;