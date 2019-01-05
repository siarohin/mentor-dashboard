import $ from 'jquery';

import template from './index.template';
import './index.css';
import Sound from '../sound';

export default class Header {
  static draw() {
    $('.navbar').empty();

    const contentEl = document.querySelector('.wrapper');
    contentEl.insertAdjacentHTML('afterbegin', template);

    $('.js-sound').on('click', (e) => {
      e.preventDefault();

      if ($('.nav-sound').hasClass('sound-off')) {
        $('.nav-sound').removeClass('sound-off');
        $('.tooltip-sound').addClass('tooltip-sound_on');
        Sound.setState(true);
      } else {
        $('.nav-sound').addClass('sound-off');
        $('.tooltip-sound').removeClass('tooltip-sound_on');
        Sound.setState(false);
      }
    });
  }

  static update(gameState) {
    $('.js-show-player-name')
      .html(`
      Сейчас ${gameState.playerName} сражается с ${gameState.monsterName}
        <div class="triangle-topright">
          <span class="triangle-topright__score">
            ${window.gameState.playerScore / 100}
          </span>
        </div>`);

    $('.triangle-topright').hide();

    if (window.gameState.playerScore > 0) {
      $('.triangle-topright').show();
    }
  }
}
