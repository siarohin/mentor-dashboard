const path = require('path');
const XLSX = require('xlsx');
const getSheetData = require('./utils');
const vocabularies = require('./vocabularies');

/* path to raw files with data */
const pathToFile = path.join(__dirname, '../rawSource/Tasks.xlsx');
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
  name: 'A',
  link: 'B',
  status: 'C',
};

const sheet1 = getSheetData(readFile);


// get tasks, statuses, links ==============

const getTask = (currentRow) => {
  let link = '';
  if (sheet1[workbook.link + currentRow]) {
    link = (sheet1[workbook.link + currentRow].v)
      .toLowerCase()
      .trim();
  }

  const task = {
    name: (sheet1[workbook.name + currentRow].v)
      .toString()
      .replace('-', ' ')
      .replace(/"/gi, '\'')
      .trim(),
    link,
    status: (sheet1[workbook.status + currentRow].v)
      .toString()
      .toLowerCase()
      .trim(),
  };

  const currentStatus = vocabularies.find(data => data.legend === task.status);
  if (currentStatus) {
    task.statusDescription = currentStatus.legendDescription;
  }

  return task;
};

const tasks = () => getSheetRows(sheet1, workbook.name)
  .map(row => getTask(row));

module.exports = tasks();
