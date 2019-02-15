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
    mentorList: [{value: 'All', label: 'All'}],
    localStorageMentor: {},
  }

  getMentorList(data) {
    return data.map(({ mentorGithub, mentorName }) => {
      return { value: mentorGithub, label: mentorName };
    });
  }

  componentWillMount() {
    this.setState({
        mentorList: [...this.state.mentorList, ...this.getMentorList(this.state.data)],
      });

    if (localStorage.getItem('mentor-dashboard')) {
      const myLocalStorage = JSON.parse(localStorage.getItem('mentor-dashboard'));
      this.setState({
        localStorageMentor: {
          value: myLocalStorage.mentor,
          label:myLocalStorage.value,
        },
      });
    }
  }


  render() {
    const { displayName } = this.state.buttonList.providerData[0];
    const { data, isDisabled, mentorList, localStorageMentor } = this.state;

    return (
      <Layout contentTitle={ `Welcome, ${displayName}` } contentCenter={true}>
        <SelectForm
          options={ mentorList }
          isDisabled={ isDisabled }
          localStorageMentor={ localStorageMentor }
          authMentorName={ displayName }
        />

        {data.map(({ mentorGithub, mentorName, mentorCity, students }) => (
          <section
            className='mentor__github hidden'
            data-name={ mentorGithub }
            mentor-name={ mentorName.toLowerCase().split(' ').join('').trim() }
            key={ mentorGithub }>

              <article className="mentor">
                <MentorCard
                  mentorGithub={ mentorGithub }
                  mentorName={ mentorName }
                  mentorCity={ mentorCity }
                />
                <StudentCard students={ students } />
              </article>

          </section>
        ))}

      </Layout>
    );
  }
}

export default Dashboard;