import $ from 'jquery';

import template from './battle.template';
import './battle.css';

class Battle {
  static init(gameState) {
    this.draw(gameState);
    this.update(gameState);
  }

  static draw(gameState) {
    const contentEl = document.querySelector('#content');
    contentEl.innerHTML = template;

    $('.player-name').text(gameState.playerName);
    $('.monster-name').text(gameState.monsterName);
  }

  static playerAttack(time) {

    const contentEl = document.querySelector('.js-player-card');

    if ($('.model-player__attack').length < 1) {
      contentEl.insertAdjacentHTML('afterbegin', '<div class=\'card-body model-player__attack\'></div>');
    }

    $('.model-player__battle').hide();
    $('.model-player__attack').show();

    setTimeout(() => {
      $('.model-player__battle').show();
      $('.model-player__attack').hide();
    }, time);
  }

  static empty() {
    $('#battle').empty();
  }

  static update(gameState) {
    $('.player-health').text(gameState.playerHealth);
    $('.player-health').css('width', `${gameState.playerHealth / 2}%`);

    $('.monster-health').text(gameState.monsterHealth);
    $('.monster-health').css('width', `${gameState.monsterHealth / 2}%`);
  }
}

export default Battle;
