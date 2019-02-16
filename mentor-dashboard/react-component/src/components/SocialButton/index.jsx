import React from 'react';
import PropTypes from 'prop-types';
import FaGithub from 'react-icons/lib/fa/github';

import './index.css';

const propTypes = {
  buttonList: PropTypes.shape({
    github: PropTypes.shape({
      visible: PropTypes.bool.isRequired,
      provider: PropTypes.func.isRequired
    })
  }).isRequired,
  auth: PropTypes.func.isRequired,
  currentProviders: PropTypes.func
};

const defaultProps = {
  currentProviders: null
};

const SocialButton = ({ buttonList, auth, currentProviders }) => {
  const authHandler = authData => {
    if (authData) {
      if (currentProviders !== null) {
        currentProviders(authData.user.providerData);
      }
    }
  };

  const authenticate = (e, provider) => {
    const providerOAuth = buttonList[provider].provider();

    if (!auth().currentUser) {
      auth()
        .signInWithPopup(providerOAuth)
        .then(authHandler)
        .catch(err => err)
    } else {
      auth()
        .currentUser.linkWithPopup(providerOAuth)
        .then(authHandler)
        .catch(err => err)
    }
  };

  const renderSocialButton = provider => {
    const visible = buttonList[provider].visible;
    return (
      <button
        key={provider}
        className={`minimal minimal-indent btn__social-${provider} ${!visible && 'hidden'}`}
        onClick={e => authenticate(e, provider)}
      >
        Login with {provider === 'github'? (<FaGithub style={{fontSize: '24px'}} />) : provider}
      </button>
    );
  };

  return (
    <div className="btn__social--list">
      {Object.keys(buttonList).map(renderSocialButton)}
    </div>
  );
};

SocialButton.propTypes = propTypes;
SocialButton.defaultProps = defaultProps;

export default SocialButton;