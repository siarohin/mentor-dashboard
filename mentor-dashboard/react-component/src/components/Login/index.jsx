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
  render() {
    return (
      <Layout contentTitle={'Mentor Dashboard'} contentCenter={true}>
        <SocialButton buttonList={buttonList} auth={auth.getAuth} />
      </Layout>
    );
  }
}

export default Login;