import $ from 'jquery';

import template from './navigation.template';
import './navigation.css';

class Header {
  static draw() {
    const contentEl = document.querySelector('body');
    contentEl.insertAdjacentHTML('afterbegin', template);
  }

  static update(gameState) {
    $('.js-show-player-name').text(gameState.playerName);
  }
}

export default Header;
