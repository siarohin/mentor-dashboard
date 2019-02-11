import React, { Component } from 'react';
import Delay from 'react-delay';

import { auth } from '../../firebase/';


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
          <p>Loading...</p>
        </Delay>
      );
    }
  }

  return oAuth;
};