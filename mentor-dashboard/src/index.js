const path = require('path');
const fs = require('fs');
const mentorStudentsPairs = require('./components/mentorStudentsPairs');
const tasks = require('./components/tasks');
const mentorScore = require('./components/mentorScore');


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


// mutate mentorScore -> concat task params with template ====

const findTask = (data) => {
  const existingTask = tasks.find(task => task.name === data.name);

  if (existingTask) {
    return {
      link: existingTask.link,
      status: existingTask.status,
      statusDescription: existingTask.statusDescription,
    };
  }
  return {
    link: '',
    status: '',
    statusDescription: '',
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

  mentor.mentorName = result.mentorName;
  mentor.mentorCity = result.mentorCity;
});


// Save result to JSON ======================

const pathToJSON = path.join(__dirname, './data.json');

const resultToJson = JSON.stringify(mentorScore, 0, 2);
fs.writeFile(pathToJSON, resultToJson, 'utf8', () => {});
