import $ from 'jquery';

import template from './index.template';
import './index.css';
import Sound from '../sound';

class Header {
  static draw() {
    $('.navbar').empty();

    const contentEl = document.querySelector('body');
    contentEl.insertAdjacentHTML('afterbegin', template);

    $('.nav-sound').on('click', (e) => {
      e.preventDefault();

      if ($('.nav-sound').hasClass('sound-off')) {
        $('.nav-sound').removeClass('sound-off');
        Sound.setState(true);
      } else {
        $('.nav-sound').addClass('sound-off');
        Sound.setState(false);
      }
    });
  }

  static update(gameState) {
    $('.js-show-player-name')
      .text(`Сейчас ${gameState.playerName}
        сражается с ${gameState.monsterName}`);
  }
}

export default Header;
