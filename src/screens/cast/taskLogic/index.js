import $ from 'jquery';
import uniqueRandomArray from 'unique-random-array';

import template from './index.template';
import './index.css';
// eslint-disable-next-line import/no-cycle
import Battle from '../../battle';
import vocabulary from './vocabulary';


export default class taskLogic {
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

    this.answer = randomTask.targetImage;
    this.generateLogicTask(randomTask);
  }

  static generateLogicTask(randomTask) {
    const question = document.querySelector('.modal-title');
    question.innerHTML = randomTask.question;

    const getImage = document.querySelector('.logic-img');

    $(randomTask.image).each((index, value) => {
      getImage.innerHTML += `
        <div class="logic-img__task-img" data-index="${index}" style="background-position: ${value}">
          <span class="task-img__text alert alert-dark">
            ${randomTask.imageAlt[index]}
          </span>
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
    $('#taskLogic').empty();
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
      window.gameState.monsterHealth -= 20;
      Battle.playerAttack(3000);
    } else {
      window.gameState.playerHealth -= 20;
      Battle.monsterAttack(3000);
    }
  }

  static play(playerAnswer) {
    this.updateState(playerAnswer);
    Battle.updateState();
  }

  static closeTask() {
    $('.logic-img').on('click keypress', (e) => {
      e.preventDefault();
      if (e.target.className === 'logic-img__task-img'
          || e.target.tagName === 'SPAN') {
        const playerAnswer = e.target;
        this.modalHide();
        this.play(playerAnswer);
      }
    });
  }
}
