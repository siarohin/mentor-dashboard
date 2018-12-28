import $ from 'jquery';

import template from './index.template';
import './index.css';

export default class Home {
  static draw() {
    const contentEl = document.querySelector('#content');
    contentEl.insertAdjacentHTML('beforeend', template);

    $('.model-player').addClass('model-player_jump');
  }
}
