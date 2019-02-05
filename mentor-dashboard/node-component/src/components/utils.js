/* get data from sheet (sheets are begin from 1) */
/* for example: getSheetData(readFile, 1) */
const getSheetData = (name, number = 1) => {
  if (!name) {
    const errorMessage = 'Name couldn\'t be empty';
    return new Error(errorMessage);
  }
  const sheet = name.SheetNames[number - 1];
  return name.Sheets[sheet];
};

module.exports = getSheetData;
