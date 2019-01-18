const path = require('path');
const fs = require('fs');
const mentorStudentsPairs = require('./mentorStudentsPairs.js');
const tasks = require('./tasks.js');


// Merge mentorStudentsPairs and Tasks workbook ========

mentorStudentsPairs.forEach((mentorStudentsPair) => {
  mentorStudentsPair.students.forEach((student) => {
    const currentStudent = student;
    currentStudent.tasks = tasks;
  });
});


/* path to JSON in out  */
const pathToJSON = path.join(__dirname, './data.json');


// Save result to JSON ======================

const resultToJson = JSON.stringify(mentorStudentsPairs, 0, 2);
fs.writeFile(pathToJSON, resultToJson, 'utf8', () => {});
