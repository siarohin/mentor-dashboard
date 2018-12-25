import { Howl } from 'howler';


const music = new Howl({
  src: ['./music/intro.mp3'],
  sprite: {
    first: [0, 3900],
    second: [3900, 7700],
  },
  autoplay: false,
  loop: true,
  volume: 0.5,
});

export default class Sound {
  constructor(state = '') {
    this.state = state;
  }

  static init() {
    const sprite = 'first';
    this.state = 'on';
    this.play(sprite);
  }

  static play(sprite) {
    this.sprite = sprite;
    if (this.state === 'on') {
      this.stop();
      music.play(this.sprite);
    }
  }

  static stop() {
    music.stop();
  }

  static update() {
    if (this.state === 'off') {
      this.stop();
    } else {
      this.play(this.sprite);
    }
  }

  static setState(state) {
    this.state = state;
    this.update();
  }
}
