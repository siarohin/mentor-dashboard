import { Howl } from 'howler';
import $ from 'jquery';


export const music = new Howl({
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
  static init() {
    this.soundState = false;
    const sprite = 'first';
    this.play(sprite);
  }

  static play(sprite) {
    this.sprite = sprite;
    if (this.soundState === true) {
      this.stop();
      music.play(this.sprite);
    }
  }

  static stop() {
    music.stop();
  }

  static update(soundState) {
    if (soundState === false) {
      this.stop();
    } else {
      this.play(this.sprite);
    }
  }

  static setState(soundState) {
    this.soundState = soundState;
    this.update(soundState);
  }
}
