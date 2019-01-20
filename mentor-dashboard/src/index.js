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


/* path to JSON */
const pathToJSON = path.join(__dirname, './data.json');

/* TODO: for test only, delete */
const pathToJSON2 = path.join(__dirname, './data_test.json');
const resultToJson2 = JSON.stringify(mentorScore, 0, 2);
fs.writeFile(pathToJSON2, resultToJson2, 'utf8', () => {});
/* ==================== */

// Save result to JSON ======================

const resultToJson = JSON.stringify(mentorStudentsPairs, 0, 2);
fs.writeFile(pathToJSON, resultToJson, 'utf8', () => {});
