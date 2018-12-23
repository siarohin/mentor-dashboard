import $ from 'jquery';
import { Howl } from 'howler';

import template from './choosePlayerName.template';
import './choosePlayerName.css';

const music = new Howl({
  src: ['./music/select-name.wav'],
  autoplay: false,
  loop: true,
  volume: 0.5,
});
export default class ChoosePlayerName {
  static draw() {
    const contentEl = document.querySelector('#content');
    contentEl.innerHTML = template;
  }

  static play() {
    return music.play();
  }

  static stop() {
    return music.stop();
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
        ChoosePlayerName.stop();

        const playerName = $('#choosePlayerName .js-player-name').val();

        ChoosePlayerName.empty();

        resolve(playerName);
      });
    });
  }
}
