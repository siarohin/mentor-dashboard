const path = require('path');
const XLSX = require('xlsx');
const getSheetData = require('./utils');

/* path to raw files with data */
const pathToFile = path.join(__dirname, './rawSource/Mentor-students pairs.xlsx');
const readFile = XLSX.readFile(pathToFile);

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

/* Get rows array */
const getSheetRows = (sheet, workbookName) => {
  const rows = [];
  for (let i = START_ROW; i < LIMIT_ROW; i += 1) {
    if (getNextRow(sheet, workbookName, i)) {
      rows.push(i);
    }
  }
  return rows;
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
    interviewer: (sheet1[workbook.interviewer + currentRow].v)
      .toString()
      .toLowerCase()
      .split(/\s+/)
      .map(word => word[0].toUpperCase() + word.substring(1))
      .join(' ')
      .trim(),
    studentGithub: (sheet1[workbook.studentGithub + currentRow].v)
      .toString()
      .trim(),
  };

  return mentorStudentPair;
};

const getPairs = () => {
  return getSheetRows(sheet1, workbook.interviewer)
    .map(row => getMentorStudentPair(row));
};

const pairs = getPairs();

// Merge rows with mentor names
const mergeMentorStudentPair = pairs.reduce((acc, item) => {
  const exsistingMentor = acc.find(accItem => accItem.interviewer === item.interviewer);

  if (exsistingMentor) {
    exsistingMentor.studentGithub
      .push({ studentGithub: item.studentGithub });

    exsistingMentor.studentGithub
      .sort((first, second) => (first.studentGithub).localeCompare(second.studentGithub));
  } else {
    acc.push({
      interviewer: item.interviewer,
      studentGithub: [
        { studentGithub: item.studentGithub },
      ],
    });
  }
  return acc;
}, []);


// Sheet2 workbook ===============================

const sheet2 = getSheetData(readFile, 2);

const getMentorData = (currentRow) => {
  const mentorData = {
    mentorFullName: (`${sheet2[workbook.mentorName + currentRow].v} ${sheet2[workbook.mentorSername + currentRow].v}`)
      .toLowerCase()
      .split(/\s+/)
      .map(word => word[0].toUpperCase() + word.substring(1)).join(' ')
      .trim(),

    mentorCity: (sheet2[workbook.city + currentRow].v)
      .toString()
      .trim(),

    mentorGithub: (sheet2[workbook.mentorGithub + currentRow].v)
      .toString()
      .trim()
      .toLowerCase()
      .replace('https://github.com/', '')
      .replace('http://github.com/', '')
      .replace('/', ''),
  };

  return mentorData;
};

const getMentors = () => {
  return getSheetRows(sheet2, workbook.mentorName)
    .map(row => getMentorData(row));
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
        students: mentorStudentPair.studentGithub || '',
      };
    }
    return {
      mentorName: mentorStudentsPairs.mentorFullName,
      mentorCity: mentorStudentsPairs.mentorCity,
      mentorGithub: mentorStudentsPairs.mentorGithub,
      students: mentorStudentPair.studentGithub,
    };
  });

// Sort result by name
const resultSortByName = result
  .sort((first, second) => first.mentorName.localeCompare(second.mentorName));


module.exports = resultSortByName;
