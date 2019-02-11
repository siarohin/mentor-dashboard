import React, { Component } from 'react';
import Layout from '../../containers/Layout/';
import Data from '../../data.json';
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
      <Layout contentTitle={ `Welcome, ${displayName}` }>

        <SelectForm data={ data } isDisabled={ this.state.isDisabled } />

        {data.map(({ mentorGithub, mentorName, mentorCity, students }) => (
          <section className="mentor__github hidden" data-name={ mentorGithub } key={ mentorGithub }>
            <article className="mentor">
              <h2 className="mentor__title">@{ mentorGithub }</h2>
              <div className="mentor__data">
                { mentorName }
                <span className="mentor__data-tooltip">{ mentorCity }</span>
              </div>

              <div className="students">
                { students.map(({ studentGithub, tasks }) => (
                  <StudentCard key={ studentGithub } studentGithub={ studentGithub } tasks={ tasks } />
                )) }
              </div>

            </article>
          </section>
        ))}
      </Layout>
    );
  }
}

export default Dashboard;