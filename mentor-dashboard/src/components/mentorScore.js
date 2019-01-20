const path = require('path');
const XLSX = require('xlsx');
const getSheetData = require('./utils');

/* path to raw files with data */
const pathToFile = path.join(__dirname, '../rawSource/Mentor score.xlsx');
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
  mentorGithub: 'B',
  studentGithub: 'C',
  taskName: 'D',
  taskPR: 'E',
  taskScore: 'F',
  mentorComment: 'G',
  action: 'H',
};

const sheet1 = getSheetData(readFile);


// Get tasks, statuses, links ==============

const getMentorScore = (currentRow) => {
  let taskPR = '';
  if (sheet1[workbook.taskPR + currentRow]) {
    taskPR = (sheet1[workbook.taskPR + currentRow].v)
      .toLowerCase()
      .trim();
  }

  let mentorComment = '';
  if (sheet1[workbook.mentorComment + currentRow]) {
    mentorComment = sheet1[workbook.mentorComment + currentRow].v;
  }

  let action = '';
  if (sheet1[workbook.action + currentRow]) {
    action = sheet1[workbook.action + currentRow].v;
  }

  const mentorScore = {
    mentorGithub: (sheet1[workbook.mentorGithub + currentRow].v)
      .toString()
      .trim()
      .toLowerCase()
      .replace('https://github.com/', '')
      .replace('http://github.com/', '')
      .replace('/', ''),
    studentGithub: (sheet1[workbook.studentGithub + currentRow].v)
      .toString()
      .replace('https://github.com/', '')
      .replace('http://github.com/', '')
      .toLowerCase()
      .trim(),
    taskName: (sheet1[workbook.taskName + currentRow].v)
      .toString()
      .replace('-', ' ')
      .replace(/"/gi, '\'')
      .trim(),
    taskPR,
    taskScore: sheet1[workbook.taskScore + currentRow].v,
    mentorComment,
    action,
  };

  return mentorScore;
};

const result = () => getSheetRows(sheet1, workbook.mentorGithub)
  .map(row => getMentorScore(row));


// Merge student, mentors and tasks ==============

/* Merge students and tasks */
const mergeStudentTasks = result()
  .reduce((acc, item) => {
    const exsistingStudent = acc.find(accItem => accItem.studentGithub === item.studentGithub);

    if (exsistingStudent) {
      exsistingStudent.tasks
        .push({
          name: item.taskName,
          pullReq: item.taskPR,
          score: item.taskScore,
          mentorComment: item.mentorComment,
          action: item.action,
        });
    } else {
      acc.push({
        mentorGithub: item.mentorGithub,
        studentGithub: item.studentGithub,
        tasks: [
          {
            name: item.taskName,
            pullReq: item.taskPR,
            score: item.taskScore,
            mentorComment: item.mentorComment,
            action: item.action,
          },
        ],
      });
    }
    return acc;
  }, []);

/* Sort result by mentorGithub */
const resultSortByStudentGithub = mergeStudentTasks
  .sort((first, second) => first.studentGithub.localeCompare(second.studentGithub));


/* Merge mentors and students */
const mergeMentorStudentPair = resultSortByStudentGithub
  .reduce((acc, item) => {
    const exsistingMentor = acc.find(accItem => accItem.mentorGithub === item.mentorGithub);

    if (exsistingMentor) {
      exsistingMentor.students
        .push({
          studentGithub: item.studentGithub,
          tasks: item.tasks,
        });
    } else {
      acc.push({
        mentorGithub: item.mentorGithub,
        students: [
          {
            studentGithub: item.studentGithub,
            tasks: item.tasks,
          },
        ],

      });
    }
    return acc;
  }, []);

const resultSortByMentorGithub = mergeMentorStudentPair
  .sort((first, second) => first.mentorGithub.localeCompare(second.mentorGithub));

module.exports = resultSortByMentorGithub;
