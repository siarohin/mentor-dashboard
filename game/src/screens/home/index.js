import $ from 'jquery';
import template from './index.template';
import './index.css';

export default class Home {
  static init() {
    this.draw();
  }

  static draw() {
    $('#content').empty();

    const contentEl = document.querySelector('#content');
    contentEl.insertAdjacentHTML('beforeend', template);
    $('.model-player').addClass('model-player_jump');
  }
}
