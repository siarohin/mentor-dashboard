/* eslint-disable import/no-cycle */
import $ from 'jquery';
import { Howl } from 'howler';
import { pause } from '../../utils/utils';
import Sound from '../../components/sound';
import PlayerWin from './playerWin';
import MonsterWin from './monsterWin';
import Cast from '../cast';
import Battle from '../battle';
import Score from '../score';


export const music = new Howl({
  src: ['./music/game-win-over.mp3'],
  sprite: {
    player_win: [0, 3500],
    monster_win: [4000, 7000],
  },
  autoplay: false,
  loop: false,
  volume: 0.5,
});

const monsterWinAnimation = async () => {
  await MonsterWin.init();
  await pause(1000);
  await Score.init();
};

const playerWinAnimation = async () => {
  window.gameState.playerScore += 100;
  await PlayerWin.init();

  await pause(3000);
  await Battle.init();

  await pause(2000);
  await Cast.init();
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
    if (window.gameState.monsterHealth <= 0) {
      this.play('player_win');
      playerWinAnimation();
    } else {
      Sound.stop();
      this.play('monster_win');
      monsterWinAnimation();
    }
  }
}
