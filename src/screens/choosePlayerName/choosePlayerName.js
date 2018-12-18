import $ from 'jquery';
import { Howl } from 'howler';

import template from './choosePlayerName.template';
import './choosePlayerName.css';

export const secondSound = new Howl({
  src: ['./music/select-name.wav'],
  autoplay: false,
  loop: true,
  volume: 0.5,
});

export class ChoosePlayerName {
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
