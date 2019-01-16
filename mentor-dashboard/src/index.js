const path = require('path');
const XLSX = require('xlsx');
const getSheetData = require('./utils');

/* path to raw files with data */
const pathToFile = path.join(__dirname, './rawSource/Mentor-students pairs.xlsx');
const readFile = XLSX.readFile(pathToFile);

/* limit of rows in xlsx files */
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
    interviewer: sheet1[workbook.interviewer + currentRow].v,
    studentGithub: sheet1[workbook.studentGithub + currentRow].v,
  };

  return mentorStudentPair;
};

const getPairs = () => {
  const rows = [];
  for (let i = 1; i < LIMIT_ROW; i += 1) {
    if (getNextRow(sheet1, workbook.interviewer, i)) {
      rows.push(i);
    }
  }
  const dataRow = rows.map(row => getMentorStudentPair(row));
  return dataRow;
};

const pairs = getPairs();


// Sheet2 workbook ===============================

const sheet2 = getSheetData(readFile, 2);

const getMentorData = (currentRow) => {
  const mentorData = {
    mentorFullName: `${sheet2[workbook.mentorName + currentRow].v} ${sheet2[workbook.mentorSername + currentRow].v}`,
    mentorCity: sheet2[workbook.city + currentRow].v,
    mentorGithub: sheet2[workbook.mentorGithub + currentRow].v,
  };

  return mentorData;
};

const getMentors = () => {
  const rows = [];
  for (let i = 1; i < LIMIT_ROW; i += 1) {
    if (getNextRow(sheet2, workbook.mentorName, i)) {
      rows.push(i);
    }
  }
  const dataRow = rows.map(row => getMentorData(row));
  return dataRow;
};

const mentors = getMentors();


// Merge Sheet1 and Sheet2 workbook ==============

const mentorStudentPairs = pairs
  .map((mentorStudentPair) => {
    const mentorData = mentors.find(m => m.mentorFullName === mentorStudentPair.interviewer);

    if (!mentorData) return;

    // eslint-disable-next-line consistent-return
    return {
      mentorName: mentorData.mentorFullName,
      mentorCity: mentorData.mentorCity,
      mentorGithub: mentorData.mentorGithub,
      studentGithub: `https://github.com/${mentorStudentPair.studentGithub}`,
    };
  })
  .filter(r => r);

  console.log(mentorStudentPairs.length);


// /* count of students */
// console.log(`Students: ${pairs.length - 1}`);

// /* count of mentors */
// console.log(`Mentors: ${mentors.length - 1}`);
