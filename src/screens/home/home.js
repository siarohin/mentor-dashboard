import { Howl } from 'howler';

import template from './home.template';
import './home.css';

const music = new Howl({
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
    return music.play();
  }

  static stop() {
    return music.stop();
  }
}
