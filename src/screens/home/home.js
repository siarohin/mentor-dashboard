import { Howl } from 'howler';

import template from './home.template';
import './home.css';

const home = new Howl({
  src: ['./music/intro.wav'],
  autoplay: false,
  loop: true,
  volume: 0.5,
});
export default class Home {
  static draw() {
    const contentEl = document.querySelector('#content');
    contentEl.insertAdjacentHTML('beforeend', template);
  }

  static play() {
    return home.play();
  }

  static stop() {
    return home.stop();
  }
}
