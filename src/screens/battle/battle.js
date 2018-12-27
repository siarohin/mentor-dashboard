import $ from 'jquery';
import { Howl } from 'howler';

import template from './battle.template';
import './battle.css';
import { pause } from '../../utils';

// eslint-disable-next-line import/no-cycle
import Cast from '../cast/cast';
import GameOver from '../gameOver/gameOver';

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
    if (!$('.nav-sound').hasClass('sound-off')) {
      music.play(sprite);
    }
  }

  static stop() {
    music.stop();
  }

  static playerAttack(time) {
    const playSound = async () => {
      await this.play('yeah');
      await (pause(500));
      await (this.play('yep'));
    };

    const showAnimation = async () => {
      const contentEl = document.querySelector('.js-player-card');
      if ($('.model-player_attack').length < 1) {
        contentEl.insertAdjacentHTML('afterbegin',
          '<div class=\'card-body model-player_attack\'></div>');
      }

      $('.model-player').hide();
      $('.model-player_attack').show();
      $('.model-monster').addClass('model-monster_attacked');

      await (pause(time));
      $('.model-player').show();
      $('.model-player_attack').hide();
      $('.model-monster').removeClass('model-monster_attacked');
    };

    playSound();
    showAnimation(time);
  }

  static monsterAttack(time) {
    const playSound = async () => {
      if (!$('.nav-sound').hasClass('sound-off')) {
        this.play('ooh');
        await (pause(800));
        this.play('boom');
      }
    };

    const showAnimation = async () => {
      const contentEl = document.querySelector('.js-player-card');
      if ($('.model-player_attacked').length < 1) {
        contentEl.insertAdjacentHTML('afterbegin',
          '<div class=\'card-body model-player_attacked\'></div>');
      }

      $('.model-monster-bird').addClass('model-monster-bird_attack');
      $('.model-player').hide();
      $('.model-player_attacked').show();

      await (pause(time));
      $('.model-player').show();
      $('.model-player_attacked').hide();
      $('.model-monster-bird').removeClass('model-monster-bird_attack');
    };

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

  static ifGameContinue(gameState) {
    if (gameState.monsterHealth > 0 && gameState.playerHealth > 0) {
      this.gameContinue();
    } else {
      this.gameOver();
    }
  }

  static gameContinue() {
    const castInit = async () => {
      await (pause(1000));
      Cast.init();
    };
    castInit();
  }

  static gameOver() {
    const dieInit = async () => {
      await (pause(1000));
      GameOver.init(window.gameState);
    };
    dieInit();
  }

  static playScene(taskName) {
    const updateState = async () => {
      await (pause(2000));
      this.update(window.gameState);
      this.ifGameContinue(window.gameState);
    };

    // if true -> playerAttack, if false -> monsterAttack
    if (taskName.checkResult()) {
      window.gameState.monsterHealth -= 20;
      this.playerAttack(3000);
    } else {
      window.gameState.playerHealth -= 100;
      this.monsterAttack(3000);
    }

    updateState();
  }
}

export default Battle;
