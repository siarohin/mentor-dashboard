import $ from 'jquery';

import template from './index.template';
import './index.css';

export default class ChoosePlayerName {
  static draw() {
    $('#content').empty();

    const contentEl = document.querySelector('#content');
    contentEl.innerHTML = template;

    $('.js-player-name').focus();
  }

  constructor() {
    this.localPlayerName = '';
  }

  static getNewPlayerName() {
    this.draw();
    return new Promise((resolve) => {
      $('#choosePlayerName .js-form').on('submit', (e) => {
        e.preventDefault();

        const playerName = $('#choosePlayerName .js-player-name').val();
        $('#content').empty();
        resolve(playerName);
      });
    });
  }
}
