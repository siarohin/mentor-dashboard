import $ from 'jquery';

import template from './index.template';
import './index.css';
import { getNameInputFocus } from '../../utils/utils';

export default class ChoosePlayerName {
  static draw() {
    $('#content').empty();

    const contentEl = document.querySelector('#content');
    contentEl.innerHTML = template;

    getNameInputFocus();
    this.keyControl();
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

  static keyControl() {
    $('#choosePlayerName').on('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        $('.js-form__button').focus();
      }
      if (e.key === 'ArrowUp') {
        $('.js-player-name').focus();
      }
    });
  }
}
