import $ from 'jquery';
import { Howl } from 'howler';

import Sound from '../../components/sound';
import PlayerWin from './playerWin';
import MonsterWin from './monsterWin';

const music = new Howl({
  src: ['./music/game-over.mp3'],
  sprite: {
    gameover: [0, 7000],
  },
  autoplay: false,
  loop: false,
  volume: 0.5,
});


class GameOver {
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
      Sound.stop();
      this.playerWin();
    } else {
      Sound.stop();
      this.play('gameover');
      this.monsterWin();
    }
  }

  static monsterWin() {
    MonsterWin.init();
  }

  static playerWin() {
    PlayerWin.init();
  }
}

export default GameOver;
