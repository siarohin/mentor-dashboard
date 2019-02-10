import React, { Component } from 'react';
import SocialButtonList from '../SocialButton/SocialButtonList';
import Layout from '../../containers/Layout';
import { auth } from '../../firebase';

const buttonList = {
  github: {
    visible: true,
    provider: () => {
      const provider = auth.githubOAuth();
      provider.addScope('user');
      return provider;
    }
  }
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
      <Layout contentCenter={true}>
        <SocialButtonList buttonList={buttonList} auth={auth.getAuth} />
      </Layout>
    );
  }
}

export default Login;