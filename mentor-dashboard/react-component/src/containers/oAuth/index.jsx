import React, { Component } from 'react';
import { auth } from '../../firebase';

export default WrappedComponent => {
  class oAuth extends Component {
    state = {
      providerData: []
    };

    componentDidMount() {
      auth.getAuth().onAuthStateChanged(user => {
        if (user) {
          this.setState({ providerData: user.providerData });
        } else {
          this.props.history.push('/');
        }
      });
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          providerData={this.state.providerData}
        />
      );
    }
  }

  return oAuth;
};