import $ from 'jquery';
import { Howl } from 'howler';

import template from './battle.template';
import './battle.css';
import { pause } from '../../utils';

const music = new Howl({
  src: ['./music/yeah-ooh.mp3'],
  sprite: {
    yeah: [0, 1500],
    ooh: [3000, 1500],
    yep: [5000, 1000],
    boom: [6000, 1500],
  },
  autoplay: false,
  loop: false,
  volume: 0.5,
});


class Battle {
  static init(gameState) {
    this.draw(gameState);
    this.update(gameState);
  }

  static draw(gameState) {
    const contentEl = document.querySelector('#content');
    contentEl.innerHTML = template;

    $('.player-name').text(gameState.playerName);
    $('.monster-name').text(gameState.monsterName);
  }

  static play(sprite) {
    music.play(sprite);
  }

  static stop() {
    music.stop();
  }

  static playerAttack(time) {
    const playSound = async () => {
      if (!$('.nav-sound').hasClass('sound-off')) {
        await this.play('yeah');
        await (pause(500));
        await (this.play('yep'));
      }
    };

    const showAnimation = async () => {
      await (pause(time));
      $('.model-player').show();
      $('.model-player_attack').hide();
      $('.model-monster').removeClass('model-monster_attacked');
    };

    const contentEl = document.querySelector('.js-player-card');

    if ($('.model-player_attack').length < 1) {
      contentEl.insertAdjacentHTML('afterbegin', '<div class=\'card-body model-player_attack\'></div>');
    }

    $('.model-player').hide();
    $('.model-player_attack').show();
    $('.model-monster').addClass('model-monster_attacked');

    playSound();
    showAnimation(time);
  }


  static monsterAttack(time) {
    const playSound = async () => {
      if (!$('.nav-sound').hasClass('sound-off')) {
        await this.play('ooh');
        await (pause(800));
        await (this.play('boom'));
      }
    };

    const showAnimation = async () => {
      await (pause(time));
      $('.model-player').show();
      $('.model-player_attacked').hide();
      $('.model-monster-bird').removeClass('model-monster-bird_attack');
    };

    const contentEl = document.querySelector('.js-player-card');

    if ($('.model-player_attacked').length < 1) {
      contentEl.insertAdjacentHTML('afterbegin', '<div class=\'card-body model-player_attacked\'></div>');
    }

    $('.model-monster-bird').addClass('model-monster-bird_attack');
    $('.model-player').hide();
    $('.model-player_attacked').show();

    playSound();
    showAnimation(time);
  }

  static empty() {
    $('#battle').empty();
  }

  static update(gameState) {
    $('.player-health').text(gameState.playerHealth);
    $('.player-health').css('width', `${gameState.playerHealth / 2}%`);

    $('.monster-health').text(gameState.monsterHealth);
    $('.monster-health').css('width', `${gameState.monsterHealth / 2}%`);
  }
}

export default Battle;
