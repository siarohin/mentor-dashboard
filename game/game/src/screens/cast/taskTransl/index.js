import $ from 'jquery';
import uniqueRandomArray from 'unique-random-array';

import template from './index.template';
import './index.css';
// eslint-disable-next-line import/no-cycle
import Battle from '../../battle';
import vocabulary from './vocabulary';
import { getInputFocus, keyControlLeftRightInBut } from '../../../utils/utils';


export default class taskTransl {
  static get healthPoint() {
    const health = 30;
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
    title.innerHTML = `Знаешь мой язык? Я говорю на английском!
      Попробуй, переведи на русский:`;

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
    const getImage = randomTask.image;

    this.answer = getTranslation;
    this.generateTask(getWord, getImage);
  }

  static generateTask(getWord, getImage) {
    const vocabularyKey = document.querySelector('.vocabulary-key');
    vocabularyKey.textContent = getWord;

    const vocabularryImg = document.querySelector('.vocabulary-img');
    $(vocabularryImg).css('background-position', ` ${getImage}`);
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

  static updateState() {
    // if true -> playerAttack, if false -> monsterAttack
    if (this.checkResult()) {
      window.gameState.monsterHealth -= this.healthPoint;
      Battle.playerAttack(3000);
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
