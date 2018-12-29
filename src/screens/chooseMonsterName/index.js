import uniqueRandomArray from 'unique-random-array';

let monsterName = [];

const monsterNames = {
  character: ['The stupid', 'The horrible', 'The toothless'],
  type: ['ogre', 'goblin', 'scarecrow', 'freakazoid'],
  name: ['Chupacabra', 'Loogaroo', 'Gowrow', 'Jackalope'],
};

export const generatorNames = () => {
  const adjective = uniqueRandomArray(monsterNames.character);
  const type = uniqueRandomArray(monsterNames.type);
  const nickname = uniqueRandomArray(monsterNames.name);

  monsterName.length = 0;
  monsterName = [].concat(adjective(), type(), nickname());

  return monsterName.join(' ');
};

export default class ChooseMonsterName {
  constructor() {
    this.localMonsterName = '';
  }

  static getNewMonsterName() {
    return generatorNames();
  }
}
