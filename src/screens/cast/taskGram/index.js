import $ from 'jquery';
import uniqueRandomArray from 'unique-random-array';

import template from './index.template';
import './index.css';
// eslint-disable-next-line import/no-cycle
import Battle from '../../battle';
import vocabulary from './vocabulary';


export default class taskGram {
  static get healthPoint() {
    const health = 40;
    return health;
  }

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

    $('#spels').modal({
      keyboard: false,
      backdrop: 'static',
    });
  }

  static generateRandom() {
    const dataSource = this.data;
    const randomTask = uniqueRandomArray(dataSource)();

    const groupQuestion = randomTask.word;
    const question = uniqueRandomArray(groupQuestion)();

    const title = document.querySelector('.modal-title');
    title.innerHTML = `Кажется, в слове <span class="modal-title__span">${question}</span> чего-то не хватает. Нажми ниже на букву, которая пропущена.`;

    this.answer = randomTask.rightLetter;
    this.generateGramTask(randomTask);
  }

  static generateGramTask(randomTask) {
    const contentEl = document.querySelector('.logic-gram');

    $(randomTask.letter).each((index, value) => {
      contentEl.innerHTML += `
        <div class="logic-gram__task-gram" data-index="${index}">
          ${value}
        </div>
      `;
    });
  }

  static checkResult(playerAnswer) {
    this.playerAnswer = playerAnswer.textContent.trim();

    if (this.answer === this.playerAnswer) {
      return true;
    } return false;
  }

  static empty() {
    $('#taskGram').empty();
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

  static play(playerAnswer) {
    this.updateState(playerAnswer);
    Battle.updateState();
  }

  static closeTask() {
    $('.logic-gram').on('click keypress', (e) => {
      e.preventDefault();
      if (e.target.className === 'logic-gram__task-gram') {
        const playerAnswer = e.target;

        this.modalHide();
        this.play(playerAnswer);
      }
    });
  }
}
