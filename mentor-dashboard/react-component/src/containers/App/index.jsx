import React, { Component } from 'react';
import Login from '../../components/Login/';
import Dashboard from '../../components/Dashboard/';
import { auth } from '../../firebase/';
import { Preloader } from '../../components/Preloader/';
import { CONSTANT } from '../../components/constant';
import Layout from '../Layout/';

const { sourceJsonURL, fileJsonName } = CONSTANT;

class App extends Component {
  state = {
    data: [],
    providerData: [],
    isLoading: true,
    errorMsg: null,
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
      .then(res => {
        if (!res.ok) { throw res }
        return res.json()
      })
      .then((data) => {
        this.setState({ data: data })
      })
      .catch((err) => {
        this.setState({ errorMsg: `Can't load data` })
      });
  }

  render() {
    return this.state.isLoading ? <Preloader /> : (
      this.state.providerData.length > 0 && this.state.data.length > 0 ?
        <Dashboard
          {...this.props}
          providerData={this.state.providerData}
          data={this.state.data}
        />:

      this.state.errorMsg === null ? <Login />:
        <Layout contentTitle={ this.state.errorMsg } contentCenter={true}>
          Please try again later...
        </Layout>
    )
  }
}

export default App;