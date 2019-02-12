import React, { Component } from 'react';
import Login from '../../components/Login/';
import Dashboard from '../../components/Dashboard/';
import Layout from '../Layout/';
import { auth } from '../../firebase/';

import './index.css';


class App extends Component {
  state = {
    providerData: [],
    isLoading: true,
  };

  componentDidMount() {
    auth.getAuth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ providerData: user.providerData });
        this.setState({ isLoading: false });
      } else {
        this.setState({ isLoading: false });
      }
    });
  }

  preloader = () => {
    return (
      <Layout contentTitle={'Please, wait'} contentCenter={true}>
        <div className="lds-dual-ring"></div>
      </Layout>
    )
  };

  liveComponent = () => {
    if (this.state.providerData.length > 0) {
      return (
        <Dashboard
          {...this.props}
          providerData={this.state.providerData}
      />
      )
    } return (
        <Login />
      )
  }

  render() {
    return this.state.isLoading ? this.preloader() : this.liveComponent()
  }
}

export default App;