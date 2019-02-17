import React, { Component } from 'react';
import Login from '../../components/Login/';
import Dashboard from '../../components/Dashboard/';
import { auth } from '../../firebase/';
import { Preloader } from '../../components/Preloader/';
import { CONSTANT } from '../../components/constant';

const { sourceJsonURL, fileJsonName } = CONSTANT;
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
        });
      } else {
        this.setState({
          isLoading: false,
        });
      }
    });

    fetch(`${sourceJsonURL}/${fileJsonName}`)
    .then(res => res.json())
    .then((data) => {this.setState({ data: data })});
  }

  render() {
    return this.state.isLoading ? <Preloader /> : (
      this.state.providerData.length > 0 ?
        (<Dashboard
          {...this.props}
          providerData={this.state.providerData}
          data={this.state.data}
        /> )
        : (<Login />)
    )
  }
}

export default App;