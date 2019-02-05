import React from 'react';
import TaskComponent from '../Tasks/';
import './index.css';

export const StudentCard = ({ studentGithub, tasks }) => {
  return (
    <article className="students__data" key={ studentGithub }>
      <h2 className="students__title">@{ studentGithub }</h2>
        {tasks.map(({ name, status, specification, statusDescription }) => (
          <TaskComponent key={ name } props={{ tasks, name, status, specification, statusDescription }} />
        ))}
    </article>
  )
};