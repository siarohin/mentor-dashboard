import $ from 'jquery';

import template from './choosePlayerName.template';
import './choosePlayerName.css';

export default class ChoosePlayerName {
  static draw() {
    const contentEl = document.querySelector('#content');
    contentEl.innerHTML = template;
  }

  static empty() {
    $('#choosePlayerName').empty();
  }

  constructor() {
    this.localPlayerName = '';
  }

  static getNewPlayerName() {
    ChoosePlayerName.draw();
    return new Promise((resolve) => {
      $('#choosePlayerName .js-form').on('submit', (e) => {
        e.preventDefault();

        const playerName = $('#choosePlayerName .js-player-name').val();

        ChoosePlayerName.empty();

        resolve(playerName);
      });
    });
  }
}
