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


const handleChange = ({ value }) => {
  const mentors = document.querySelectorAll('.mentor__github');
  const mentor = document.querySelector(`[data-name=${value}]`);
  console.log(mentor);

  if (!!mentor) {
    hiddenSectionAll(mentors);
    showSection(mentor);
    localStorage.setItem('mentor', value);
  } else {
    showSectionAll(mentors);
    localStorage.setItem('mentor', '');
  }
};



export class SelectForm extends Component {
  static propTypes = {
    isDisabled: PropTypes.bool,
    mentorList: PropTypes.arrayOf(PropTypes.object).isRequired,
    mentorListName: PropTypes.array,
  };


  state = {
    isDisabled: this.props.isDisabled,
    mentorList: this.props.mentorList,
    localStorageMentor: this.props.localStorageMentor,
    mentorListName: this.props.mentorListName,
    authMentorName: this.props.authMentorName,
  }


  componentDidMount() {
    const { value } = this.state.localStorageMentor;

    const findAuthMentor = () => {
      const { mentorListName, authMentorName } = this.state;
      const authMentor = mentorListName.find(m => m === authMentorName);
      if (authMentor) {
        console.log(`Find auth mentor: ${authMentorName}`)
        handleChange({ value });
      } else {
        console.log('Dont find auth mentor');
        handleChange({ value });
      }
    }
    findAuthMentor();
  }


  render() {
  const { isDisabled, mentorList, localStorageMentor } = this.state;
  return (
    <div className ="find-form">
      <section className="select-form">
        <Select
            isDisabled={ isDisabled }
            options={ mentorList }
            defaultValue={ localStorageMentor }
            onChange={ handleChange }
        />
      </section>
    </div>
    )
  }
}