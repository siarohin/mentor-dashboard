import uniqueRandomArray from 'unique-random-array';

const monsterNames = {
  character: ['The stupid', 'The horrible', 'The toothless'],
  type: ['ogre', 'goblin', 'scarecrow', 'freakazoid'],
  name: ['Chupacabra', 'Loogaroo', 'Gowrow', 'Jackalope'],
};


export const pause = time => new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, time);
});

export const generatorNames = () => {
  let monsterName = [];
  const adjective = uniqueRandomArray(monsterNames.character);
  const type = uniqueRandomArray(monsterNames.type);
  const nickname = uniqueRandomArray(monsterNames.name);

  monsterName = [].concat(adjective(), type(), nickname());

  return monsterName.join(' ');
};
