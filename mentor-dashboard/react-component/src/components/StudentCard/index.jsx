import React, { Fragment } from 'react';
import FaGithub from 'react-icons/lib/fa/github';
import TaskComponent from '../Tasks/';
import { CONSTANT } from '../constant';
import './index.css';

const { gitHubURL, rssGithub, privatePrefix } = CONSTANT;

const Header = ({ studentGithub }) => {
  const publicGit = `${ gitHubURL }/${ studentGithub }`;
  const privateGit = `${ gitHubURL }/${ rssGithub }/${ studentGithub }-${ privatePrefix }`;
    return (
      <Fragment>
        <h2 className="students__title">@{ studentGithub }</h2>
          <div className="students__github">
            <a className="students__github-link" href={ publicGit } title="public">
              <FaGithub />
            </a>
            <a className="students__github-link private" href={ privateGit } title="private">
              <FaGithub />
            </a>
          </div>
      </Fragment>
    )
};

export const StudentCard = ({ students }) => {
  return (
    <div className="students">

      {[...students].map(
        ({ studentGithub, tasks }) => (

          <article className="students__data" key={ studentGithub }>
            <Header studentGithub={ studentGithub } className="students__title" />
            <TaskComponent tasks={ tasks } />
          </article>

      ))}

    </div>
  )
};