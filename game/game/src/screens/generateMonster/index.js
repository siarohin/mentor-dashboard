import $ from 'jquery';
import { generatorMonsters, generatorNames } from '../../utils/utils';
import template from './index.template';
import Navigation from '../../components/navigation';

let monster = null;

const updateState = async () => {
  const monsterName = await generatorNames();
  window.gameState.monsterName = monsterName;
  window.gameState.monsterHealth = 100;
};


export class GenerateMonster {
  static init() {
    this.draw();
    this.getMonster();
  }

  static draw() {
    const contentEl = document.querySelector('#monster');
    contentEl.innerHTML = template;

    $('.model-monster-pregenerate')
      .addClass('model-monster-pregenerate_bombed');
  }

  static getMonster() {
    const createMonster = async () => {
      await generatorMonsters();
      monster = generatorMonsters();

      $('.monster-body').addClass(monster.body);
      $('.monster-eyes').addClass(monster.eyes);
      $('.monster-hair').addClass(monster.hair);
      $('.monster-mouth').addClass(monster.mouth);
    };
    createMonster();
  }
}


export class GenerateMonsterName {
  static init() {
    const monsterInit = async () => {
      await this.setMonsterState();
      await this.draw();
    };
    monsterInit();
  }

  static setMonsterState() {
    $('.monster-name').empty();
    updateState();
  }

  static draw() {
    $('.monster-name').text(window.gameState.monsterName);
    Navigation.update(window.gameState);
  }
}
