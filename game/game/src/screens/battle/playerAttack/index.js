import $ from 'jquery';
import { Howl } from 'howler';

import { pause } from '../../../utils/utils';
import './index.css';

const music = new Howl({
  src: ['./music/yeah-ooh.mp3'],
  sprite: {
    yeah: [0, 1500],
    yep: [5000, 1000],
  },
  autoplay: false,
  preload: false,
  loop: false,
  volume: 0.5,
});


export default class PlayerAttack {
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

  static init(time, statusAnimation = true) {
    this.statusAnimation = statusAnimation;
    const playSound = async () => {
      await this.play('yeah');
      await (pause(500));
      if (this.statusAnimation) {
        await (this.play('yep'));
      }
    };

    const showAnimation = async () => {
      const contentEl = document.querySelector('.js-player-card');
      if ($('.model-player_attack').length < 1) {
        contentEl.insertAdjacentHTML('afterbegin',
          '<div class=\'card-body model-player_attack\'></div>');
      }

      $('.model-player').hide();
      $('.model-player_attack').show();
      $('.model-monster').addClass('model-monster_attacked');

      await (pause(time));
      $('.model-player').show();
      $('.model-player_attack').hide();
      $('.model-monster').removeClass('model-monster_attacked');
    };

    playSound();
    if (this.statusAnimation) {
      showAnimation();
    }
  }
}
