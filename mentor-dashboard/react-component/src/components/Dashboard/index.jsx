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
    defaultMentor: {},
  }


  componentWillMount() {
    let mentorList = [{ value: 'All', label: 'All' }];
    this.state.data.map(({ mentorGithub }) => {
      return mentorList.push({ value: mentorGithub, label: mentorGithub });
    });
    this.setState({ mentorList: mentorList })
    if (localStorage.getItem('mentor')) {
      this.setState({
        mentorStore: localStorage.getItem('mentor'),
        defaultMentor: {
          value: localStorage.getItem('mentor'),
          label: localStorage.getItem('mentor')
        },
      });
    }
  }


  render() {
    const { displayName } = this.state.buttonList.providerData[0];
    const { data, isDisabled, mentorList, defaultMentor, mentorStore } = this.state;

    return (
      <Layout contentTitle={ `Welcome, ${displayName}` } contentCenter={true}>
        <SelectForm
          mentorList={ mentorList }
          isDisabled={ isDisabled }
          defaultMentor={ defaultMentor }
          mentorStore={ mentorStore }
        />

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