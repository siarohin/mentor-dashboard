import { Howl } from 'howler';

import template from './home.template';
import './home.css';

export const homeSound = new Howl({
  src: ['./music/intro.wav'],
  autoplay: false,
  loop: true,
  volume: 0.5,
});

export class Home {
  static draw() {
    const contentEl = document.querySelector('#content');
    contentEl.insertAdjacentHTML('beforeend', template);
  }
}
