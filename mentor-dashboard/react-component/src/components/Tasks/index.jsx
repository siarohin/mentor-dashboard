import React, { Fragment } from 'react';
import { CONSTANT } from '../constant';
import './index.css';


const showClassList = ({ defaultClass, specialClass }) => {
  switch (specialClass) {
    case ('checked'): return `${defaultClass} task__process_checked`;
    case ('todo'): return `${defaultClass} task__process_todo`;
    case ('in progress'): return `${defaultClass} task__process_inprocess`;
    case ('checking'): return `${defaultClass} task__process_tocheck`;
    case ('nochecked'): return `${defaultClass} task__process_nochecked`;
    default: return defaultClass;
  }
};


const TaskName = ({ name, specification }) => {
  const defaultName = `${CONSTANT.task}`;
  if (!!specification) {
    return (
      <a className="task__specification" title={`${ defaultName }: ${ name }`} href={ specification }>
        { name }
      </a>
    )
  }
  return `${ name }`
};


const TaskStatus = ({ status, statusDescription }) => {
  return (
    <div className={ showClassList({
      defaultClass: 'task__process',
      specialClass: status,
      }) }>
        { status }
      <span className="task__process_tooltip">
        { statusDescription }
      </span>
    </div>
  )
};


const TaskComponent = ({ tasks }) => {
  return (
    <Fragment>

      {[...tasks].map(
        ({ name, status, specification, statusDescription }) => (

          <div className="task" key={ name }>
            <div className="task__title">
              <TaskName specification={ specification } name={ name } />
            </div>
              <TaskStatus status={ status } statusDescription={ statusDescription } />
          </div>

        ))}

    </Fragment>
  )
};

export default TaskComponent;