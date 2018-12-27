import $ from 'jquery';

import template from './battle.template';
import './battle.css';
import { pause } from '../../utils';

// eslint-disable-next-line import/no-cycle
import Cast from '../cast/cast';
import GameOver from '../gameOver/gameOver';
import PlayerAttack from './playerAttack/playerAttack';
import MonsterAttack from './monsterAttack/monsterAttack';


class Battle {
  static init(gameState) {
    this.draw(gameState);
    this.update(gameState);
  }

  static draw(gameState) {
    const contentEl = document.querySelector('#content');
    contentEl.innerHTML = template;

    $('.model-player').removeClass('model-player_jump');
    $('.model-player').addClass('model-player_wait');

    $('.player-name').text(gameState.playerName);
    $('.monster-name').text(gameState.monsterName);
  }

  static playerAttack(time) {
    PlayerAttack.init(time);
  }

  static monsterAttack(time) {
    MonsterAttack.init(time);
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
      window.gameState.monsterHealth -= 100;
      this.playerAttack(3000);
    } else {
      window.gameState.playerHealth -= 100;
      this.monsterAttack(3000);
    }

    updateState();
  }
}

export default Battle;
