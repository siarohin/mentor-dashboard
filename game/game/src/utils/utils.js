import uniqueRandomArray from 'unique-random-array';

const monsterNames = {
  character: ['Глупый', 'Ужасный', 'Беззубый', 'Злобный', 'Сопливый', 'Гнусный',
    'Страшный', 'Клыкастый', 'Хвостатый', 'Зловонный', 'Костяной',
    'Неповоротливый', 'Кошмарный', 'Рогатый', 'Жутковатый', 'Когтистый'],
  type: ['Огр', 'Гоблин', 'Прыгун', 'Скакун', 'Лизун', 'Бармалей', 'Зомби',
    'Дикарь', 'Глазаль', 'Монстр', 'Ползун', 'Обсмеюн'],
  name: ['Алладин', 'Абу', 'Астерикс', 'Артемон', 'Бивис', 'Батхед', 'Боб',
    'Грю', 'Мардж', 'Ранго', 'Майк', 'Клювклюн', 'Баюн', 'Битвохряк'],
};

const monsterClass = ['random-1', 'random-2', 'random-3'];

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

export const generatorMonsters = () => {
  const monsterBody = uniqueRandomArray(monsterClass);
  const monsterEyes = uniqueRandomArray(monsterClass);
  const monsterHair = uniqueRandomArray(monsterClass);
  const monsterMouth = uniqueRandomArray(monsterClass);

  const monsterComplete = {
    body: monsterBody(),
    eyes: monsterEyes(),
    hair: monsterHair(),
    mouth: monsterMouth(),
  };

  return monsterComplete;
};
