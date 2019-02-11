import React, { Component } from 'react';
import SocialButton from '../SocialButton/';
import Layout from '../../containers/Layout/';
import { auth } from '../../firebase';

const buttonList = {
  github: {
    visible: true,
    provider: () => {
      const provider = auth.githubOAuth();
      provider.addScope('user');
      return provider;
    },
  },
};

class Login extends Component {
  componentDidMount() {
    auth.getAuth().onAuthStateChanged(user => {
      if (user) {
        this.props.history.push('/dashboard');
      }
    });
  }

  render() {
    return (
      <Layout contentCenter={false}>
        <SocialButton buttonList={buttonList} auth={auth.getAuth} />
      </Layout>
    );
  }
}

export default Login;