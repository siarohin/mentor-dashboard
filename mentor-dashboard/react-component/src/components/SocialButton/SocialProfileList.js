import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Layout from '../../containers/Layout';
import './SocialProfileList.css';

class SocialProfileList extends PureComponent {
  static propTypes = {
    auth: PropTypes.func.isRequired,
    providerData: PropTypes.arrayOf(PropTypes.object).isRequired,
    unlinkedProvider: PropTypes.func.isRequired
  };


  handleProviderUnlink = async (provider) => {
    const { auth, unlinkedProvider } = this.props;
    const providers = await auth()
        .currentUser.unlink(`${provider}.com`)
        .catch(err => console.error(err));

      unlinkedProvider(provider, providers.providerData);
  };

  renderProfileList = ({ providerId }) => {
    const providerName = providerId.split('.')[0];

    return (
      <div className="container__profile" key={providerName}>
        <p>{providerName}</p>
        <button
          className="container__profile--btn"
          onClick={e => this.handleProviderUnlink(e, providerName)}
        >
          Logout
        </button>
      </div>
    );
  };

  render() {
    return (
      <Layout>
        <div className="btn__profiles--list">
          {this.props.providerData.map(this.renderProfileList)}
        </div>
      </Layout>
    );
  }
}

export default SocialProfileList;