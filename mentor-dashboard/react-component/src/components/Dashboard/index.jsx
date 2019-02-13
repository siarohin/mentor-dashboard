import React, { Component } from 'react';
import Layout from '../../containers/Layout/';
import { MentorCard } from '../MentorCard/';
import { StudentCard } from '../StudentCard/';
import { SelectForm } from '../SelectForm/';
import PropTypes from 'prop-types';
import { auth } from '../../firebase';

import './index.css';


class Dashboard extends Component {
  static propTypes = {
    providerData: PropTypes.arrayOf(PropTypes.object).isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
  };


  state = {
    data: this.props.data,
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
    mentorList: [],
    mentorStore: '',
  }


  componentDidMount() {
    let mentorList = [{ value: 'All', label: 'All' }];
    this.state.data.map(({ mentorGithub }) => {
      return mentorList.push({ value: mentorGithub, label: mentorGithub });
    });
    this.setState({ mentorList: mentorList })
    if (localStorage.getItem('mentor')) {
      this.setState({ mentorStore: localStorage.getItem('mentor') })
    }
  }


  render() {
    const { displayName } = this.state.buttonList.providerData[0];
    const { data, isDisabled, mentorList } = this.state;
    console.log(this.state.mentorStore);

    return (
      <Layout contentTitle={ `Welcome, ${displayName}` } contentCenter={true}>
        <SelectForm isDisabled={ isDisabled } options={ mentorList } />

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