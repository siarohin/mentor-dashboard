import React, { Component, Fragment } from 'react';
import Data from './data.json';
import { StudentCard } from './components/StudentCard';
import { SelectForm } from './components/SelectForm';
import { CONSTANT } from './components/constant';
import GitHubLogin from 'react-github-login';
import './App.css';


const onSuccess = response => console.log(response);
const onFailure = response => console.error(response);

export class App extends Component {
  state = {
    data: Data,
    title: CONSTANT.root,
  }

  render() {
    const { data, title } = this.state;

    return (
      <Fragment>
      <h1 className="root__title">{ title }</h1>

      <GitHubLogin
      clientId="7f772eb46164221790f5"
      onSuccess={onSuccess}
      onFailure={onFailure}/>

        <SelectForm data={ data } isDisabled={ false } />

        {data.map(({ mentorGithub, mentorName, mentorCity, students }) => (
          <section className="mentor__github hidden" data-name={ mentorGithub } key={ mentorGithub }>
            <article className="mentor">
              <h2 className="mentor__title">@{ mentorGithub }</h2>
              <div className="mentor__data">
                { mentorName }
                <span className="mentor__data-tooltip">{ mentorCity }</span>
              </div>

              <div className="students">
                { students.map(({ studentGithub, tasks }) => (
                  <StudentCard key={ studentGithub } studentGithub={ studentGithub } tasks={ tasks } />
                )) }
              </div>

            </article>
          </section>
        ))}

      </Fragment>
    );
  }
}