import React, { Component } from 'react';
import Login from '../../components/Login/';
import Dashboard from '../../components/Dashboard/';
import { auth } from '../../firebase/';
import JsonData from '../../data.json';
import { Preloader } from '../../components/Preloader/';


class App extends Component {
  state = {
    data: [],
    providerData: [],
    isLoading: true,
  };

  componentDidMount() {
    auth.getAuth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          providerData: user.providerData,
          isLoading: false,
          data: JsonData,
        });
      } else {
        this.setState({
          isLoading: false,
        });
      }
    });
  }

  liveComponent = () => {
    if (this.state.providerData.length > 0) {
      return (
        <Dashboard
          {...this.props}
          providerData={this.state.providerData}
          data={this.state.data}
        />
      )
    } return (
    <Login />
    )
  }

  render() {
    return this.state.isLoading ? <Preloader /> : this.liveComponent()
  }
}

export default App;