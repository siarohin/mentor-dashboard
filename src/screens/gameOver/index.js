import $ from 'jquery';
import { Howl } from 'howler';

import { pause } from '../../utils';
import Sound from '../../components/sound';
import PlayerWin from './playerWin';
import MonsterWin from './monsterWin';

import { generatorNames } from '../chooseMonsterName';


const music = new Howl({
  src: ['./music/game-win-over.mp3'],
  sprite: {
    player_win: [0, 3500],
    monster_win: [4000, 7000],
  },
  autoplay: false,
  loop: false,
  volume: 0.5,
});


const generateNewMonster = async () => {
  $('.monster-name').empty();

  window.gameState.monsterName = await generatorNames();

  const name = window.gameState.monsterName;

  await console.log(window.gameState.monsterName);

  await pause(2000);
  await $('.monster-name').text(name);
};

const monsterWinAnimation = async () => {
  await MonsterWin.init();
  await (pause(3000));
};

const playerWinAnimation = async () => {
  await PlayerWin.init();
  await (pause(3000));
  await generateNewMonster();
};

export default class GameOver {
  static init() {
    this.gameOver(window.gameState);
  }

  static play(sprite) {
    if (!$('.nav-sound').hasClass('sound-off')) {
      music.play(sprite);
    }
  }

  static stop() {
    music.stop();
  }

  static gameOver() {
    if (window.gameState.monsterHealth === 0) {
      this.play('player_win');
      playerWinAnimation();
    } else {
      Sound.stop();
      this.play('monster_win');
      monsterWinAnimation();
    }
  }
}
