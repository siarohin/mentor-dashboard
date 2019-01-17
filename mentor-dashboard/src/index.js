const path = require('path');
const XLSX = require('xlsx');
const fs = require('fs');
const getSheetData = require('./utils');

/* path to raw files with data */
const pathToFile = path.join(__dirname, './rawSource/Mentor-students pairs.xlsx');
const readFile = XLSX.readFile(pathToFile);

/* path to JSON in out  */
const pathToJSON = path.join(__dirname, './data.json');

/* range of rows in xlsx files */
const START_ROW = 2;
const LIMIT_ROW = 65535;


/* Do we have next row? */
const getNextRow = (sheet, column, row) => {
  const nextRow = sheet[column + row];
  if (nextRow !== undefined) {
    return true;
  } return false;
};


const workbook = {
  // Sheet1
  interviewer: 'A',
  studentGithub: 'B',

  // Sheet2
  mentorName: 'A',
  mentorSername: 'B',
  city: 'C',
  mentorGithub: 'E',
};


// Sheet1 workbook ===============================

const sheet1 = getSheetData(readFile, 1);

const getMentorStudentPair = (currentRow) => {
  const mentorStudentPair = {
    interviewer: (sheet1[workbook.interviewer + currentRow].v).toString(),
    studentGithub: (sheet1[workbook.studentGithub + currentRow].v).toString(),
  };

  return mentorStudentPair;
};

const getPairs = () => {
  const rows = [];
  for (let i = START_ROW; i < LIMIT_ROW; i += 1) {
    if (getNextRow(sheet1, workbook.interviewer, i)) {
      rows.push(i);
    }
  }
  const dataRow = rows.map(row => getMentorStudentPair(row));
  return dataRow;
};

const pairs = getPairs();

// Merge rows with mentor names
const mergeMentorStudentPair = pairs.reduce((acc, item) => {
  const exsistingMentor = acc.find(accItem => accItem.interviewer === item.interviewer);

  if (exsistingMentor) {
    exsistingMentor.studentGithub.push(item.studentGithub);
    exsistingMentor.studentGithub.sort((first, second) => first.localeCompare(second));
  } else {
    acc.push({
      interviewer: item.interviewer,
      studentGithub: [item.studentGithub],
    });
  }
  return acc;
}, []);


// Sheet2 workbook ===============================

const sheet2 = getSheetData(readFile, 2);

const getMentorData = (currentRow) => {
  const mentorData = {
    mentorFullName: `${sheet2[workbook.mentorName + currentRow].v} ${sheet2[workbook.mentorSername + currentRow].v}`,
    mentorCity: (sheet2[workbook.city + currentRow].v).toString(),
    mentorGithub: (sheet2[workbook.mentorGithub + currentRow].v).toString(),
  };

  return mentorData;
};

const getMentors = () => {
  const rows = [];
  for (let i = START_ROW; i < LIMIT_ROW; i += 1) {
    if (getNextRow(sheet2, workbook.mentorName, i)) {
      rows.push(i);
    }
  }
  const dataRow = rows.map(row => getMentorData(row));
  return dataRow;
};

const mentors = getMentors();


// Merge Sheet1 and Sheet2 workbook and sort result ========

const result = mergeMentorStudentPair
  .map((mentorStudentPair) => {
    const mentorStudentsPairs = mentors.find(data => data.mentorFullName === mentorStudentPair.interviewer);

    if (!mentorStudentsPairs) {
      return {
        mentorName: mentorStudentPair.interviewer || '',
        mentorCity: '',
        mentorGithub: '',
        studentsGithub: mentorStudentPair.studentGithub || '',
      };
    }
    return {
      mentorName: mentorStudentsPairs.mentorFullName,
      mentorCity: mentorStudentsPairs.mentorCity,
      mentorGithub: mentorStudentsPairs.mentorGithub,
      studentsGithub: mentorStudentPair.studentGithub,
    };
  });

// Sort result by name
const resultSortByName = result.sort((first, second) => first.mentorName.localeCompare(second.mentorName));


// Save result to JSON ======================

const resultToJson = JSON.stringify(resultSortByName, 0, 2);
fs.writeFile(pathToJSON, resultToJson, 'utf8', () => {});