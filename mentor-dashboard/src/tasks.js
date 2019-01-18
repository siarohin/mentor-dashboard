const path = require('path');
const XLSX = require('xlsx');
const getSheetData = require('./utils');

/* path to raw files with data */
const pathToFile = path.join(__dirname, './rawSource/Tasks.xlsx');
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


const workbook = {
  // Sheet1
  name: 'A',
  link: 'B',
  status: 'C',
};


// Sheet1 workbook ===============================

const sheet1 = getSheetData(readFile);

const getTask = (currentRow) => {
  let link = '';
  if (sheet1[workbook.link + currentRow]) {
    link = (sheet1[workbook.link + currentRow].v)
      .trim();
  }

  const task = {
    name: (sheet1[workbook.name + currentRow].v)
      .toString()
      .replace('-', ' ')
      .trim(),
    link,
    status: (sheet1[workbook.status + currentRow].v)
      .toString()
      .trim(),
  };

  return task;
};

const getTasks = () => {
  const rows = [];
  for (let i = START_ROW; i < LIMIT_ROW; i += 1) {
    if (getNextRow(sheet1, workbook.name, i)) {
      rows.push(i);
    }
  }
  const dataRow = rows.map(row => getTask(row));
  return dataRow;
};

const tasks = getTasks();


module.exports = tasks;
