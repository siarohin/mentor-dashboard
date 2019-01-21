const path = require('path');
const fs = require('fs');
const mentorStudentsPairs = require('./components/mentorStudentsPairs');
const tasks = require('./components/tasks');
const mentorScore = require('./components/mentorScore');


// TODO: add future tasks!!!

// mutate mentorStudentsPairs-> add tasks ================

// mentorStudentsPairs.forEach((mentorStudentsPair) => {
//   mentorStudentsPair.students.forEach((student) => {
//     const currentStudent = student;
//     currentStudent.tasks = tasks;
//   });
// });


// find mentor's name & city in mentorStudentsPairs =======

const findMentorData = (data) => {
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


// find mentor's name & city in mentorStudentsPairs =======

const findTask = (data) => {

  const existingTask = tasks.find(task => task.name === data.name);

  if (existingTask) {
    return {
      name: existingTask.name,
      link: existingTask.link,
      pullReq: data.pullReq,
      score: data.score,
      mentorComment: data.mentorComment,
      status: existingTask.status,
      statusDescription: existingTask.statusDescription,
      action: data.action,
    };
  }
  return {
    name: data.name,
    link: data.link,
    pullReq: '',
    score: data.score,
    mentorComment: data.mentorComment,
    status: '',
    statusDescription: '',
    action: '',
  };
};


// mutate mentorScore -> add mentor's name & city ========

mentorScore.forEach((mentor) => {
  const result = findMentorData(mentor);

  mentor.students.forEach((student) => {
    student.tasks.forEach((task) => {
      Object.assign(task, findTask(task));
    });
  });


  mentor.mentorName += result.mentorName;
  mentor.mentorCity += result.mentorCity;
});


/* path to JSON */
const pathToJSON = path.join(__dirname, './data.json');

/* TODO: for test only, delete */
const pathToJSON2 = path.join(__dirname, './result.json');
const resultToJson2 = JSON.stringify(mentorScore, 0, 2);
fs.writeFile(pathToJSON2, resultToJson2, 'utf8', () => {});
/* ==================== */

// Save result to JSON ======================

const resultToJson = JSON.stringify(mentorStudentsPairs, 0, 2);
fs.writeFile(pathToJSON, resultToJson, 'utf8', () => {});
