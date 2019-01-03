import $ from 'jquery';

import template from './index.template';
import './index.css';
import Sound from '../sound';

class Header {
  static draw() {
    $('.navbar').empty();

    const contentEl = document.querySelector('.wrapper');
    contentEl.insertAdjacentHTML('afterbegin', template);

    $('.js-sound').on('click', (e) => {
      e.preventDefault();

      if ($('.nav-sound').hasClass('sound-off')) {
        $('.nav-sound').removeClass('sound-off');
        $('.tooltip-sound').hide();
        Sound.setState(true);
      } else {
        $('.nav-sound').addClass('sound-off');
        $('.tooltip-sound').show();
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
