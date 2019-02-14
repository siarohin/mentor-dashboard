import React, { Component } from 'react';
import Select from 'react-select';
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

  if (!!mentor) {
    hiddenSectionAll(mentors);
    showSection(mentor);
    localStorage.setItem('mentor', value);
  } else {
    showSectionAll(mentors);
  }
};



export class SelectForm extends Component {
  state = {
    isDisabled: this.props.isDisabled,
    mentorList: this.props.mentorList,
    mentorStore: this.props.mentorStore,
    defaultMentor: this.props.defaultMentor,
  }


  componentDidMount() {
    const { value } = this.state.defaultMentor;
    handleChange({ value });
  }


  render() {
  const { isDisabled, mentorList, defaultMentor } = this.state;
  return (
    <div className ="find-form">
      <section className="select-form">
        <Select
            isDisabled={ isDisabled }
            options={ mentorList }
            defaultValue={ defaultMentor }
            onChange={ handleChange }
        />
      </section>
    </div>
    )
  }
}