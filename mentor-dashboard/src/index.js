const path = require('path');
const fs = require('fs');
const mentorStudentsPairs = require('./components/mentorStudentsPairs');
const tasks = require('./components/tasks');
const mentorScore = require('./components/mentorScore');


// TODO: change status if mentor push points

// find mentor's name & city in mentorStudentsPairs =======

const spreadMentorData = (data) => {
  const existingMentor = mentorStudentsPairs.find(mentor => data.mentorGithub === mentor.mentorGithub);

  if (existingMentor) {
    return {
      mentorName: existingMentor.mentorName,
      mentorCity: existingMentor.mentorCity,
    };
  }
  return {
    mentorName: '',
    mentorCity: '',
  };
};


// mutate mentorScore -> add specification, status,
// description to existing tasks from Tasks template =======

const spreadStudentTasks = (data) => {
  const existingTask = tasks.find(task => task.name === data.name);

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


// mutate mentorScore -> add mentor's name & city =========

mentorScore.forEach((mentor) => {
  const result = spreadMentorData(mentor);

  mentor.students.forEach((student) => {
    student.tasks.forEach((task) => {
      Object.assign(task, spreadStudentTasks(task));
    });
  });

  mentor.mentorName = result.mentorName;
  mentor.mentorCity = result.mentorCity;
});


// mutate mentorScore -> add tpl tasks to lazy students,
// fix tasks with same names ====================

const completeStudentTasks = (data) => {
  mentorScore.forEach((mentor) => {
    mentor.students.forEach((student) => {
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


      // check and fix double tasks, if student has
      // tasks with same names in source exel;
      // Rule: last task is right ================

      student.tasks.sort((first, second) => first.name.localeCompare(second.name));

      student.tasks.forEach((taskItem, index) => {
        if ((student.tasks[index + 1]) && taskItem.name === student.tasks[index + 1].name) {
          const doubleItem = taskItem;
          student.tasks.splice((student.tasks).indexOf(doubleItem), 1);
        }
      });


      // add taskTemplate to `lazy` student;
      // `lazy` student = student without task ====

      const sourceTasks = [completeTplData];
      const existingTask = student.tasks.find(task => task.name === data.name);
      if (existingTask) {
        sourceTasks.splice(sourceTasks.indexOf(data), 1);
      }

      student.tasks.push(...sourceTasks);
    });
  });
};

tasks.forEach((task) => {
  completeStudentTasks(task);
});


// mutate mentorScore -> add tasks which missed
// in template Task, but present in
// some students ==================================

// find student with max count of tasks ===========

const getSuperStudent = () => {
  const superStudent = [];
  mentorScore.forEach((mentor) => {
    let bestMentorStudent = null;
    mentor.students.forEach((student, index) => {
      if ((student[index + 1]) && student[index + 1].tasks.length > student.tasks.length) {
        bestMentorStudent = student[index + 1];
      } else {
        bestMentorStudent = student;
      }
    });

    superStudent.push(bestMentorStudent);
  });

  while (superStudent.length > 1) {
    superStudent.forEach((student, index) => {
      if ((student[index + 1]) && student.tasks.length >= student[index + 1].tasks.length) {
        superStudent.splice(superStudent.indexOf(student[index + 1]), 1);
      } else {
        superStudent.splice(superStudent.indexOf(student), 1);
      }
    });
  }

  const [result] = superStudent;
  return result;
};

const superStudent = getSuperStudent();


// create task template and add this tasks to all
// students ========================================

const completeTemplate = [];
superStudent.tasks.forEach((task) => {
  const data = {
    name: task.name,
    action: task.action,
  };
  completeTemplate.push(data);
});

completeTemplate.forEach((task) => {
  completeStudentTasks(task);
});


// Save result to JSON =============================

const pathToJSON = path.join(__dirname, './data.json');

const resultToJson = JSON.stringify(mentorScore, 0, 2);
fs.writeFile(pathToJSON, resultToJson, 'utf8', () => {});
