/* eslint-disable import/no-cycle */
import $ from 'jquery';
import template from './index.template';
import './index.css';
import { pause } from '../../utils/utils';
import Cast from '../cast';
import GameOver from '../gameOver';
import PlayerAttack from './playerAttack';
import MonsterAttack from './monsterAttack';
import { GenerateMonster, GenerateMonsterName } from '../generateMonster';


const castInit = async () => {
  await (pause(1000));
  Cast.init();
};

const gameOverInit = async () => {
  await pause(1000);
  GameOver.init();
};

export default class Battle {
  static init() {
    const initScene = async () => {
      await this.draw();
      await GenerateMonsterName.init();
      await GenerateMonster.init();
      await MonsterAttack.load();
      await PlayerAttack.load();
      await this.update();
    };
    initScene();
  }

  static draw() {
    $('#content').empty();

    const contentEl = document.querySelector('#content');
    contentEl.innerHTML = template;

    $('.model-player').removeClass('model-player_jump');
    $('.model-player').addClass('model-player_wait');

    $('.player-name').text(window.gameState.playerName);
    $('.monster-name').text(window.gameState.monsterName);
  }

  static empty() {
    $('#battle').empty();
  }

  static update() {
    $('.player-health').text(window.gameState.playerHealth);
    $('.player-health').css('width', `${window.gameState.playerHealth / 2}%`);

    $('.monster-health').text(window.gameState.monsterHealth);
    $('.monster-health').css('width', `${window.gameState.monsterHealth / 2}%`);
  }

  static updateState() {
    const updateHealth = async () => {
      await (pause(2000));
      this.update();
      this.ifGameContinue();
    };
    updateHealth();
  }

  static ifGameContinue() {
    if (window.gameState.monsterHealth > 0
      && window.gameState.playerHealth > 0) {
      this.gameContinue();
    } else {
      this.gameOver();
    }
  }

  static gameContinue() {
    castInit();
  }

  static gameOver() {
    $('.model-monster-pregenerate')
      .removeClass('model-monster-pregenerate_bombed');
    gameOverInit();
  }

  static playerAttack(time, statusAnimation) {
    PlayerAttack.init(time, statusAnimation);
  }

  static monsterAttack(time) {
    MonsterAttack.init(time);
  }
}
