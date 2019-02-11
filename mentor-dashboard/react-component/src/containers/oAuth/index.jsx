import React, { Component } from 'react';
import Delay from 'react-delay';
import Layout from '../Layout/';
import { auth } from '../../firebase/';

import './index.css';


export default HOCComponent => {
  class oAuth extends Component {
    state = {
      providerData: []
    };

    componentDidMount() {
      auth.getAuth().onAuthStateChanged(user => {
        if (user) {
          this.setState({ providerData: user.providerData });
        } else {
          console.info('Must be authenticated');
          this.props.history.push('/');
        }
      });
    }

    render() {
      return this.state.providerData.length > 0 ? (
        <HOCComponent
          {...this.props}
          providerData={this.state.providerData}
        />
      ) : (
        <Delay wait={250}>
          <Layout contentTitle={'Please, wait'} contentCenter={true}>
            <div class="lds-dual-ring"></div>
          </Layout>
        </Delay>
      );
    }
  }

  return oAuth;
};