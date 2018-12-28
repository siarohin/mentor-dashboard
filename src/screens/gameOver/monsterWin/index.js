import $ from 'jquery';
import { pause } from '../../../utils';

import './index.css';

class MonsterWin {
  static init() {
    const showAnimation = async () => {
      const contentEl = document.querySelector('.js-player-card');
      if ($('.model-player_died').length < 1) {
        contentEl.insertAdjacentHTML('afterbegin',
          '<div class=\'card-body model-player_died\'></div>');
      }

      $('.model-player').hide();
      $('.model-player_died').show();
      $('.model-monster-bird').hide();

      await (pause(2000));
      $('.model-monster').removeClass('model-monster_animation');
      $('.monster-eyes').removeClass('monster-eyes_animation');

      await (pause(3000));
      console.log('We gonna do something');
    };

    showAnimation();
  }
}

export default MonsterWin;