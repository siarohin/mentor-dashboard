import $ from 'jquery';

import { pause } from '../../utils';


class GameOver {
  static whoDied(gameState) {
    if (gameState.monsterHealth === 0) {
      console.log('Monster died');
    } else {
      this.playerDied();
    }
  }

  static playerDied() {
    const showAnimation = async () => {
      const contentEl = document.querySelector('.js-player-card');
      if ($('.model-player_died').length < 1) {
        contentEl.insertAdjacentHTML('afterbegin',
          '<div class=\'card-body model-player_died\'>player died</div>');
      }

      $('.model-player').hide();
      $('.model-player_died').show();

      await (pause(2000));
      console.log('We gonna do something');
    };

    showAnimation();
  }
}

export default GameOver;
