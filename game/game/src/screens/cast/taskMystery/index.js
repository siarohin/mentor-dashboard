import $ from 'jquery';
import uniqueRandomArray from 'unique-random-array';

import template from './index.template';
import './index.css';
// eslint-disable-next-line import/no-cycle
import Battle from '../../battle';
import vocabulary from './vocabulary';
import { getInputFocus, keyControlLeftRightInBut } from '../../../utils/utils';


export default class taskMystery {
  static get healthPoint() {
    const health = 100;
    return health;
  }

  static init() {
    this.draw();
    this.generateRandom();
    this.modalShow();
    getInputFocus();
    keyControlLeftRightInBut();
    this.closeTask();
  }

  static get data() {
    return vocabulary;
  }

  static draw() {
    $('#spels .modal-body').empty();

    const contentEl = document.querySelector('#spels .modal-body');
    contentEl.innerHTML = template;

    const title = document.querySelector('.modal-title');
    title.innerHTML = `Отгадай мою загадку.
      Но если ты ответишь неправильно, то ты проиграешь!`;

    $('#spels').modal({
      keyboard: false,
      backdrop: 'static',
    });
  }

  static generateRandom() {
    const dataSource = this.data;

    const randomTask = uniqueRandomArray(dataSource)();
    const getWord = randomTask.question;
    const getTranslation = randomTask.answer;

    this.answer = getTranslation;
    this.generateTask(getWord);
  }

  static generateTask(getWord) {
    const vocabularyKey = document.querySelector('.vocabulary-key');
    vocabularyKey.textContent = getWord;
  }

  static checkResult() {
    this.playerAnswer = document.querySelector('.input-answer').value
      .toLowerCase()
      .trim();

    // ES7 includes
    if ((this.answer).includes(this.playerAnswer)) {
      return true;
    } return false;
  }

  static modalShow() {
    $('#spels').modal('show');
  }

  static modalHide() {
    $('#spels').modal('hide');
  }

  static limitHealth() {
    if (window.gameState.playerHealth > 100) {
      window.gameState.playerHealth = 100;
    }
  }

  static updateState() {
    // if true -> playerAttack, if false -> monsterAttack
    if (this.checkResult()) {
      window.gameState.playerHealth += this.healthPoint;
      this.limitHealth();
      Battle.playerAttack(3000, false);
    } else {
      window.gameState.playerHealth -= this.healthPoint;
      Battle.monsterAttack(3000);
    }
  }

  static play() {
    this.updateState();
    Battle.updateState();
  }

  static closeTask() {
    $('.input-group').on('click keypress', (e) => {
      if ((e.key === 'Enter' && e.type === 'keypress'
        && e.target.type === 'text')
      || (e.target.type === 'button' && e.type === 'click')) {
        this.modalHide();
        this.play();
      }
    });
  }
}
