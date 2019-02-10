import React, { Component } from 'react';
import Layout from '../../containers/Layout';
import Data from '../../data.json';
import { StudentCard } from '../StudentCard';
import { SelectForm } from '../SelectForm';
import './index.css';

class Dashboard extends Component {
  state = {
    data: Data,
  }


  render() {
    const { data } = this.state;

    return (
      <Layout>
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
      </Layout>
    );
  }
}

export default Dashboard;