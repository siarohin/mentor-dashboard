const path = require('path');
const XLSX = require('xlsx');
const getSheetData = require('./utils');

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
  legend: 'F',
  legendDescription: 'G',
};

const sheet1 = getSheetData(readFile);


// get legend and legendDescription ==============

const getVocabulary = (currentRow) => {
  const vocabulary = {
    legend: (sheet1[workbook.legend + currentRow].v)
      .toString()
      .toLowerCase()
      .trim(),

    legendDescription: '',
  };

  if (sheet1[workbook.legendDescription + currentRow] !== undefined) {
    vocabulary.legendDescription = (sheet1[workbook.legendDescription + currentRow].v)
      .toString()
      .toLowerCase()
      .trim();
  }

  return vocabulary;
};

const vocabularies = () => getSheetRows(sheet1, workbook.legend)
  .map(row => getVocabulary(row));


module.exports = vocabularies();
