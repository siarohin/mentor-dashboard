import React from 'react';
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

const options = [{ value: 'All', label: 'All' }];

export const SelectForm = ({ data, isDisabled }) => {
  data.map(({ mentorGithub }) => {
    return options.push(
    {
      value: mentorGithub,
      label: mentorGithub,
    })
  });

  return (
    <div className ="find-form">
      <section className="select-form">
        <Select
            onChange={ handleChange }
            options={ options }
            isDisabled={ isDisabled }
        />
      </section>
    </div>
  )
}