import React, { Component } from 'react';
import Layout from '../../containers/Layout/';
import { MentorCard } from '../MentorCard/';
import { StudentCard } from '../StudentCard/';
import { SelectForm } from '../SelectForm/';
import PropTypes from 'prop-types';
import { auth } from '../../firebase';
import { Preloader } from '../Preloader/';

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
    options: [{value: 'All', label: 'All'}],
    localStorageMentor: {},
    nameFromProvider: null,
    sectionsForRender: [],
    isLoading: false,
    selectValue: {},
  }

  getOptionsList(data) {
    return data.map(({ mentorGithub, mentorName }) => {
      return { value: mentorGithub, label: mentorName };
    });
  }

  getNameFromProvider() {
    const { displayName } = this.state.buttonList.providerData[0];
    return displayName;
  }

  componentWillMount() {
    this.setState({
      options: [...this.state.options, ...this.getOptionsList(this.state.data)],
      nameFromProvider: this.getNameFromProvider(),
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

  getDefaultSelectValue() {
    const { options, nameFromProvider, localStorageMentor } = this.state;
    const authenticateMentor = options.find(mentor => mentor.label === nameFromProvider);
    if (authenticateMentor) {
      this.setState({ selectValue: {value: authenticateMentor.value, label: authenticateMentor.label} });
      return {
        value: authenticateMentor.value,
        label: authenticateMentor.label,
      }
    }
    this.setState({ selectValue: localStorageMentor })
    return localStorageMentor;
  }

  getMentorSections({ value, label }) {
    const defaultMentor = { value, label };
    const existingMentor = this.state.data.find(mentor => mentor.mentorGithub === defaultMentor.value);
    if (existingMentor) {
      this.setState({ sectionsForRender: [existingMentor] })
      return [existingMentor];
    }
    this.setState({ sectionsForRender: this.state.data })
    return this.state.data;
  }


  handleChange = ({ value, label }) => {
    this.setState({ selectValue: { value, label } });
    const myLocalStorage = { 'mentor': value, 'value': label };
    const existingMentor = this.state.data.find(mentor => mentor.mentorGithub === value);
    if (existingMentor) {
      this.setState( { sectionsForRender: [existingMentor] });
      localStorage.setItem('mentor-dashboard', JSON.stringify(myLocalStorage));
    } else {
      this.setState({ sectionsForRender: this.state.data });
      localStorage.clear('mentor-dashboard');
    }
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 0);
  }

  componentDidMount() {
    this.getMentorSections(this.getDefaultSelectValue());
  }


  render() {
    const { isDisabled, options, nameFromProvider, sectionsForRender, selectValue } = this.state;
    return this.state.isLoading ? <Preloader /> : (
      <Layout contentTitle={ `Welcome, ${nameFromProvider}` } contentCenter={true}>
        <SelectForm
          options={ options }
          isDisabled={ isDisabled }
          onChange={ this.handleChange }
          value={ selectValue }
        />

        {sectionsForRender.map(({ mentorGithub, mentorName, mentorCity, students }) => (
          <section
            className='mentor__github'
            data-name={ mentorGithub }
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