import $ from 'jquery';

import template from './index.template';
import './index.css';
import Sound from '../sound';

class Header {
  static draw() {
    $('.navbar').remove();
    const contentEl = document.querySelector('body');
    contentEl.insertAdjacentHTML('afterbegin', template);

    $('.nav-sound').on('click', (e) => {
      e.preventDefault();
      let state = 'off';

      if ($('.nav-sound').hasClass('sound-off')) {
        $('.nav-sound').removeClass('sound-off');
        state = 'on';
      } else {
        $('.nav-sound').addClass('sound-off');
        state = 'off';
      }

      Sound.setState(state);
    });
  }

  static update(gameState) {
    $('.js-show-player-name')
      .text(`Сейчас ${gameState.playerName} сражается с ${gameState.monsterName}`);
  }
}

export default Header;
