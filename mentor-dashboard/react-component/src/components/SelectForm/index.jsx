import React, { Component } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import './index.css';


const hiddenSectionAll = (target) => {
  target.forEach((section) => {
    section.classList.add('hidden');
  });
};

const showSectionAll = (target) => {
  target.forEach((section) => {
    section.classList.remove('hidden');
  });
};

const showSection = (target) => {
  target.classList.remove('hidden');
};


const handleChange = ({ value, label }) => {
  const mentors = document.querySelectorAll('.mentor__github');
  const mentor = document.querySelector(`[data-name=${value}]`);
  const myLocalStorage = { 'mentor': value, 'value': label };

  if (!!mentor) {
    hiddenSectionAll(mentors);
    showSection(mentor);
    localStorage.setItem('mentor-dashboard', JSON.stringify(myLocalStorage));
  } else {
    showSectionAll(mentors);
    localStorage.clear('mentor-dashboard');
  }
};

const mentorInitChange = ({ authMentorLabel }) => {
  const mentors = document.querySelectorAll('.mentor__github');
  const mentor = document.querySelector(`[mentor-name=${authMentorLabel}]`);
  if (!!mentor) {
    hiddenSectionAll(mentors);
    showSection(mentor);
  }
};

export class SelectForm extends Component {
  static propTypes = {
    isDisabled: PropTypes.bool,
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
  };


  state = {
    isDisabled: this.props.isDisabled,
    options: this.props.options,
    localStorageMentor: this.props.localStorageMentor,
    authMentorName: this.props.authMentorName,
    authStorageMentor: null,
  }


  componentWillMount() {
    const { options, authMentorName } = this.state;
    const authMentor = options.find(m => m.label === authMentorName);
    if (authMentor) {
      this.setState({
        authStorageMentor: {
          value: authMentor.value,
          label: authMentor.label,
        },
      });
    }
  }

  componentDidMount() {
    const { value, label } = this.state.localStorageMentor;
    const findAuthMentor = () => {
      const { options, authMentorName } = this.state;
      const authMentor = options.find(m => m.label === authMentorName);
      if (authMentor) {
        const authMentorLabel = authMentor.label.toLowerCase().split(' ').join('').trim();
        mentorInitChange({ authMentorLabel });
      } else {
        handleChange({ value, label });
      }
    }
    findAuthMentor();
  }


  getDefaultValue() {
    const { localStorageMentor, authStorageMentor } = this.state;
    if (authStorageMentor !== null) {
      return authStorageMentor;
    }
    return localStorageMentor;
  }

  render() {
  const { isDisabled, options } = this.state;
  return (
    <div className ="find-form">
      <section className="select-form">
        <Select
            isDisabled={ isDisabled }
            options={ options }
            defaultValue={ this.getDefaultValue() }
            onChange={ handleChange }
        />
      </section>
    </div>
    )
  }
}