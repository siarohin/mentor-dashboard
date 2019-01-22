const path = require('path');
const fs = require('fs');
const mentorStudentsPairs = require('./components/mentorStudentsPairs');
const tasks = require('./components/tasks');
const mentorScore = require('./components/mentorScore');


// ??? task Presentatin don't exist in tpl -> students have 9 or 10 tasks.

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


// mutate mentorScore -> add link, status, description
// to existing tasks from Tasks template ===================

const spreadStudentTasks = (data) => {
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


// mutate mentorScore -> add tpl tasks to lazy students ====

const completeStudentTasks = (data) => {
  mentorScore.forEach((mentor) => {
    mentor.students.forEach((student) => {

      const sourceTasks = [data];
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


// Save result to JSON ======================

const pathToJSON = path.join(__dirname, './data.json');

const resultToJson = JSON.stringify(mentorScore, 0, 2);
fs.writeFile(pathToJSON, resultToJson, 'utf8', () => {});
