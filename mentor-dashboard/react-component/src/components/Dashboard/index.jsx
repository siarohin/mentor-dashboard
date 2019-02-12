import React, { Component } from 'react';
import Layout from '../../containers/Layout/';
import Data from '../../data.json';
import { MentorCard } from '../MentorCard/';
import { StudentCard } from '../StudentCard/';
import { SelectForm } from '../SelectForm/';
import PropTypes from 'prop-types';
import { auth } from '../../firebase';

import './index.css';


class Dashboard extends Component {
  static propTypes = {
    providerData: PropTypes.arrayOf(PropTypes.object).isRequired
  };


  state = {
    data: Data,
    buttonList: {
      github: {
        visible: true,
        provider: () => {
          const provider = auth.githubOAuth();
          provider.addScope('user');
          return provider;
        }
      },
    providerData: this.props.providerData,
    },
    isDisabled: false,
  }

  render() {
    const { displayName } = this.state.buttonList.providerData[0];
    const { data } = this.state;

    return (
      <Layout contentTitle={ `Welcome, ${displayName}` } contentCenter={true}>

        <SelectForm data={ data } isDisabled={ this.state.isDisabled } />

        {data.map(({ mentorGithub, mentorName, mentorCity, students }) => (

          <section className="mentor__github hidden" data-name={ mentorGithub } key={ mentorGithub }>
            <article className="mentor">
              <MentorCard mentorGithub={ mentorGithub } mentorName={ mentorName } mentorCity={ mentorCity } />
              <StudentCard students={ students } />
            </article>
          </section>

        ))}
      </Layout>
    );
  }
}

export default Dashboard;