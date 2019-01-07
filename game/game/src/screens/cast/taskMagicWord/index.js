import $ from 'jquery';
import uniqueRandomArray from 'unique-random-array';

import template from './index.template';
import './index.css';
// eslint-disable-next-line import/no-cycle
import Battle from '../../battle';
import vocabulary from './vocabulary';
/* eslint-disable-next-line max-len */
import { getInputFocus, keyControlLeftRightInBut, shuffleRandom, pause } from '../../../utils/utils';


export default class taskMagicWord {
  static get healthPoint() {
    const health = 80;
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
    title.innerHTML = `Я загадал для тебя слово и перемешал в нем все буквы.
      Попробуй, отгадай.`;

    $('#spels').modal({
      keyboard: false,
      backdrop: 'static',
    });
  }

  static generateRandom() {
    const dataSource = this.data;
    const randomTask = uniqueRandomArray(dataSource)();

    const arrayOfWords = randomTask.word;
    const magicWord = uniqueRandomArray(arrayOfWords)();

    $('.magic-word-topic').text(`Тема: ${randomTask.topic}`);

    this.answer = magicWord;
    this.generateTask(magicWord);
  }

  static generateTask(magicWord) {
    const magicWordLetters = magicWord.split('');
    const contentEl = document.querySelector('.magic-word');

    // copy letterrs from magicWord
    const saveData = magicWordLetters.slice(0);

    // shuffle random all letters
    saveData.sort(shuffleRandom);

    // if magicWord String === shuffle magicWord String, sort again
    while (saveData.join() === magicWordLetters.join()) {
      saveData.sort(shuffleRandom);
    }

    $(saveData).each((index) => {
      contentEl.innerHTML += `
        <div class="magic-word__task-magic-word user-select-none">
          ${saveData[index]}
        </div>
      `;
    });

    saveData.length = 0;
  }

  static checkResult() {
    this.playerAnswer = document.querySelector('.input-answer').value
      .toLowerCase()
      .trim();

    // ES7 includes
    if ((this.answer === this.playerAnswer)) {
      return true;
    } return false;
  }

  static modalShow() {
    $('#spels').modal('show');
  }

  static modalHide() {
    $('#spels').modal('hide');
  }

  static updateState(playerAnswer) {
    // if true -> playerAttack, if false -> monsterAttack
    if (this.checkResult(playerAnswer)) {
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
