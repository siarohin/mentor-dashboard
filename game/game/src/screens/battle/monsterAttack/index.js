import $ from 'jquery';
import { Howl } from 'howler';

import { pause } from '../../../utils/utils';
import './index.css';

const music = new Howl({
  src: ['./music/yeah-ooh.mp3'],
  sprite: {
    ooh: [3000, 1500],
    boom: [6000, 1500],
  },
  autoplay: false,
  preload: false,
  loop: false,
  volume: 0.5,
});


export default class MonsterAttack {
  static play(sprite) {
    if (!$('.nav-sound').hasClass('sound-off')) {
      music.play(sprite);
    }
  }

  static stop() {
    music.stop();
  }

  static load() {
    music.load();
  }

  static init(time) {
    const playSound = async () => {
      if (!$('.nav-sound').hasClass('sound-off')) {
        this.play('ooh');
        await (pause(700));
        this.play('boom');
      }
    };

    const showAnimation = async () => {
      const contentEl = document.querySelector('.js-player-card');
      if ($('.model-player_attacked').length < 1) {
        contentEl.insertAdjacentHTML('afterbegin',
          '<div class=\'card-body model-player_attacked\'></div>');
      }

      $('.model-monster-bird').addClass('model-monster-bird_attack');
      $('.model-player').hide();
      $('.model-player_attacked').show();

      await (pause(time));
      $('.model-player').show();
      $('.model-player_attacked').hide();
      $('.model-monster-bird').removeClass('model-monster-bird_attack');
    };

    playSound();
    showAnimation();
  }
}
