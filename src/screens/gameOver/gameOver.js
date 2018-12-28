import $ from 'jquery';
import { Howl } from 'howler';

import './gameOver.css';

import Sound from '../../components/sound/sound';
import { pause } from '../../utils';

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
  static init(gameState) {
    this.whoDied(gameState);
  }

  static play(sprite) {
    if (!$('.nav-sound').hasClass('sound-off')) {
      music.play(sprite);
    }
  }

  static stop() {
    music.stop();
  }

  static whoDied(gameState) {
    if (gameState.monsterHealth === 0) {
      Sound.stop();
      this.monsterDied();
    } else {
      Sound.stop();
      this.play('gameover');
      this.playerDied();
    }
  }

  static playerDied() {
    const showAnimation = async () => {
      const contentEl = document.querySelector('.js-player-card');
      if ($('.model-player_died').length < 1) {
        contentEl.insertAdjacentHTML('afterbegin',
          '<div class=\'card-body model-player_died\'></div>');
      }

      $('.model-player').hide();
      $('.model-player_died').show();
      $('.model-monster-bird').hide();

      await (pause(1000));
      $('.model-monster').removeClass('model-monster_animation');
      $('.monster-eyes').removeClass('monster-eyes_animation');

      await (pause(4000));
      console.log('We gonna do something');
    };

    showAnimation();
  }

  static monsterDied() {
    const showAnimation = async () => {
      const contentEl = document.querySelector('.js-player-card');
      if ($('.model-monster_died').length < 1) {
        contentEl.insertAdjacentHTML('afterbegin',
          '<div class=\'card-body model-monster_died\'></div>');
      }

      $('.model-monster-pregenerate').addClass('model-monster-pregenerate_bombed');
      await (pause(2000));
      $('.model-monster').hide();
      $('.model-monster_died').show();

      await (pause(2000));
      $('.model-player').removeClass('model-player_wait');
      $('.model-player').addClass('model-player_jump');
      $('.model-monster-bird').hide();
      $('.model-player').removeClass('model-player_animation');

      await (pause(4000));
      console.log('We gonna do something');
    };

    showAnimation();
  }
}

export default GameOver;
