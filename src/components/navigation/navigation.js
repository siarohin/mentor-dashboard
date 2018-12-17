import $ from 'jquery';

import template from './navigation.template';
import './navigation.css';

class Header {
  static draw() {
    const contentEl = document.querySelector('body');
    contentEl.insertAdjacentHTML('afterbegin', template);

    const soundEl = document.querySelector('.nav-sound');
    soundEl.addEventListener('click', (e) => {
      e.preventDefault();

      if (soundEl.classList.contains('sound-off')) {
        soundEl.classList.remove('sound-off');
      } else {
        soundEl.classList.add('sound-off');
      }
    });
  }

  static update(gameState) {
    $('.js-show-player-name').text(gameState.playerName);
  }
}

export default Header;
