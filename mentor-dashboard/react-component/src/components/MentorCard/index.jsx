import React from 'react';
import './index.css';

export const MentorCard = ({ mentorGithub, mentorName, mentorCity }) => {
  return (
    <>
      <h2 className="mentor__title">@{ mentorGithub }</h2>
      <div className="mentor__data">
        { mentorName }
        <span className="mentor__data-tooltip">{ mentorCity }</span>
      </div>
    </>
  )
};
