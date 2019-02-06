/* eslint-disable no-param-reassign */
const path = require('path');
const fs = require('fs');
const mentorStudentsPairs = require('./components/mentorStudentsPairs');
const tasksTemplate = require('./components/tasks');
const mentorScore = require('./components/mentorScore');
const vocabularies = require('./components/vocabularies');


const copyMentorStudentsPairs = JSON.parse(JSON.stringify(mentorStudentsPairs));
const copyMentorScore = JSON.parse(JSON.stringify(mentorScore));


// delete existing students from copyMentorScore
const deleteExistingStudents = (student) => {
  copyMentorScore.forEach(({ students }) => {
    const exStudent = students.find(({ studentGithub }) => studentGithub === student.studentGithub);
    if (exStudent) {
      students.splice(students.indexOf(exStudent), 1);
    }
  });
};


// delete empty mentors from copyMentorScore
const deleteEmptyMentor = () => {
  const emptyMentor = copyMentorScore.find(mentor => mentor.students.length === 0);
  if (emptyMentor) {
    copyMentorScore.splice(copyMentorScore.indexOf(emptyMentor), 1);
    deleteEmptyMentor();
  }
};


// ============================================================================================

copyMentorStudentsPairs.forEach((mentor) => {
  const existingMentor = copyMentorScore.find(({ mentorGithub }) => mentorGithub === mentor.mentorGithub);

  if (existingMentor) {
    mentor.students.forEach((student) => {
      const existingStudent = existingMentor.students.find(({ studentGithub }) => studentGithub === student.studentGithub);

      if (existingStudent) {
        student.tasks = existingStudent.tasks;
        deleteExistingStudents(existingStudent);
      }
    });
  }
});

deleteEmptyMentor();


// ============================================================================================

const findStudent = (myStudent) => {
  const myStudentGithub = myStudent.studentGithub;
  const copyMentorScoreFind = () => {
    copyMentorScore.forEach(({ students }) => {
      students.forEach((student) => {
        findStudent(student);
      });
    });
  };

  copyMentorStudentsPairs.forEach(({ students }) => {
    const existingStudent = students.find(student => student.studentGithub === myStudentGithub);
    if (existingStudent) {
      existingStudent.tasks = myStudent.tasks;

      deleteExistingStudents(myStudent);
      copyMentorScoreFind();
    }
  });
};

copyMentorScore.forEach(({ students }) => {
  students.forEach((student) => {
    findStudent(student);
  });
});

deleteEmptyMentor();


// ============================================================================================

const findMentor = (mentor) => {
  const existingMentor = copyMentorStudentsPairs.find(({ mentorGithub }) => mentorGithub === mentor.mentorGithub);
  if (existingMentor) {
    existingMentor.students = existingMentor.students.concat(mentor.students);
    mentor.students = [];
  }
};

copyMentorScore.forEach((mentor) => {
  findMentor(mentor);
});

deleteEmptyMentor();


// ============================================================================================

const addTaskSpecification = (data) => {
  const existingTask = tasksTemplate.find(task => task.name === data.name);

  if (existingTask) {
    return {
      specification: existingTask.specification,
      status: existingTask.status,
      statusDescription: existingTask.statusDescription,
    };
  }
  return {
    specification: '',
    status: '',
    statusDescription: '',
  };
};

copyMentorStudentsPairs.forEach(({ students }) => {
  students.forEach((student) => {
    if (!student.tasks) {
      student.tasks = [];
    }

    student.tasks.forEach((task) => {
      Object.assign(task, addTaskSpecification(task));
    });
  });
});


// ============================================================================================

const autocompleteTasks = (data) => {
  copyMentorStudentsPairs.forEach(({ students }) => {
    students.forEach((student) => {
      const template = {
        name: '',
        pullReq: '',
        score: '',
        mentorComment: '',
        action: '',
        specification: '',
        status: '',
        statusDescription: '',
      };

      const completeTplData = Object.assign(template, data);

      student.tasks.sort((first, second) => first.name.localeCompare(second.name));

      student.tasks.forEach((taskItem, index) => {
        if ((student.tasks[index + 1]) && taskItem.name === student.tasks[index + 1].name) {
          const doubleItem = taskItem;
          student.tasks.splice((student.tasks).indexOf(doubleItem), 1);
        }
      });


      const sourceTasks = [completeTplData];
      const existingTask = student.tasks.find(task => task.name === data.name);
      if (existingTask) {
        sourceTasks.splice(sourceTasks.indexOf(data), 1);
      }

      student.tasks.push(...sourceTasks);
    });
  });
};

tasksTemplate.forEach((task) => {
  autocompleteTasks(task);
});


// ============================================================================================

let superStudent;
const getSuperStudent = () => {

  const startMentor = copyMentorStudentsPairs.find(mentor => mentor.students.length > 0);
  let bestStudent = startMentor.students[0];

  copyMentorStudentsPairs.forEach((mentor) => {
    mentor.students.forEach((student) => {
      if (student.tasks.length > bestStudent.tasks.length) {
        bestStudent = student;
      }
    });
  });
  superStudent = bestStudent;
  return superStudent;
};


const copyToAllSuperStudentTasks = () => {
  const completeTemplate = [];
  superStudent.tasks.forEach((task) => {
    const data = {
      name: task.name,
      action: task.action,
    };
    completeTemplate.push(data);
  });

  completeTemplate.forEach((task) => {
    autocompleteTasks(task);
  });

  const newSuperStudent = getSuperStudent();
  if (superStudent.tasks.length !== newSuperStudent.tasks.length) {
    superStudent = newSuperStudent;
    copyToAllSuperStudentTasks();
  }
};

getSuperStudent();
copyToAllSuperStudentTasks();


// ============================================================================================

copyMentorStudentsPairs.forEach((mentor) => {
  mentor.students.forEach((student) => {
    student.tasks.forEach((task) => {
      if (task.score !== '') {
        task.status = 'checked';
      } else if (task.score === '' && task.status === 'checked') {
        task.status = 'nochecked';
        task.statusDescription = 'нет оценки ментора';
      } else if (task.status === '' && task.action !== '') {
        task.status = 'checking';
      } else if (task.status === '' && task.action === '') {
        task.status = 'in progress';
      }

      const vocabulary = vocabularies.find(word => word.legend === task.status);
      if (vocabulary) {
        task.statusDescription = vocabulary.legendDescription;
      }
    });
  });
});


// ============================================================================================

const pathToJSON = path.join(__dirname, './data.json');

const resultToJson = JSON.stringify(copyMentorStudentsPairs, 0, 2);
fs.writeFile(pathToJSON, resultToJson, 'utf8', () => {});
