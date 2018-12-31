import $ from 'jquery';
import uniqueRandomArray from 'unique-random-array';

import template from './index.template';
import './index.css';
// eslint-disable-next-line import/no-cycle
import Battle from '../../battle';
import vocabulary from './vocabulary';


export default class taskTransl {
  static init() {
    this.draw();
    this.generateRandom();
    this.modalShow();
    this.closeTask();
  }

  static get data() {
    return vocabulary;
  }

  static draw() {
    const contentEl = document.querySelector('#spels .modal-body');
    contentEl.innerHTML = template;

    const title = document.querySelector('.modal-title');
    title.innerHTML = 'Do you know English? Let\'s check!';

    $('#spels').modal({
      keyboard: false,
      backdrop: 'static',
    });
  }

  static generateRandom() {
    const dataSource = this.data;

    const randomTask = uniqueRandomArray(dataSource)();
    const getWord = randomTask.word;
    const getTranslation = randomTask.translation;

    this.answer = getTranslation;
    this.generateTranslTask(getWord);
  }

  static generateTranslTask(getWord) {
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

  static empty() {
    $('#taskTransl').empty();
  }

  static modalShow() {
    $('#spels').modal('show');
  }

  static modalHide() {
    $('#spels').modal('hide');
  }

  static updateState() {
    // if true -> playerAttack, if false -> monsterAttack
    if (this.checkResult()) {
      window.gameState.monsterHealth -= 100;
      Battle.playerAttack(3000);
    } else {
      window.gameState.playerHealth -= 100;
      Battle.monsterAttack(3000);
    }
  }

  static play() {
    this.updateState();
    Battle.updateState();
  }

  static closeTask() {
    $('.input-group').on('click keypress', (e) => {
      if ((e.key === 'Enter' && e.type === 'keypress')
      || (e.target.type === 'button' && e.type === 'click')) {
        this.modalHide();
        this.play();
      }
    });
  }
}
