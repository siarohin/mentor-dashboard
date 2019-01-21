const path = require('path');
const fs = require('fs');
const mentorStudentsPairs = require('./components/mentorStudentsPairs');
const tasks = require('./components/tasks');
const mentorScore = require('./components/mentorScore');


// Merge mentorStudentsPairs and Tasks workbook ========

mentorStudentsPairs.forEach((mentorStudentsPair) => {
  mentorStudentsPair.students.forEach((student) => {
    const currentStudent = student;
    currentStudent.tasks = tasks;
  });
});


// const findStudent = (data) => {
//   let currentStudent = '';

//   data.students.forEach((student) => {
//     currentStudent = student.studentGithub;
//     return currentStudent;
//   });
// };

/* find Mentor name and city in template (mentorStudentsPairs) */
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

/* add data to out file from template (mentorStudentsPairs) */
mentorScore.forEach((mentor) => {
  const result = findMentorData(mentor);

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
