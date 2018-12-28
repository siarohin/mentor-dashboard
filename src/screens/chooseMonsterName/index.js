import uniqueRandomArray from 'unique-random-array';

let monsterName = [];

fetch('./index.json')
  .then(response => response.json())
  .then((data) => {
    const adjective = uniqueRandomArray(data.character);
    const type = uniqueRandomArray(data.type);
    const nickname = uniqueRandomArray(data.name);

    monsterName = [].concat(adjective(), type(), nickname());
  });

export default class ChooseMonsterName {
  constructor() {
    this.localMonsterName = '';
  }

  static getNewMonsterName() {
    return monsterName.join(' ');
  }
}
