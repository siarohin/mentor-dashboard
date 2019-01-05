import $ from 'jquery';
import uniqueRandomArray from 'unique-random-array';

import template from './index.template';
import './index.css';
// eslint-disable-next-line import/no-cycle
import Battle from '../../battle';
import vocabulary from './vocabulary';
import { getButtonFocus, keyControlLeftRight } from '../../../utils/utils';


export default class taskFunnyLogic {
  static get healthPoint() {
    const health = 30;
    return health;
  }

  static init() {
    this.draw();
    this.generateRandom();
    this.modalShow();
    getButtonFocus();
    keyControlLeftRight();
    this.closeTask();
  }

  static get data() {
    return vocabulary;
  }

  static draw() {
    $('#spels .modal-body').empty();

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

    this.answer = randomTask.targetAnswer;
    this.generateFunnyLogicTask(randomTask);
  }

  static generateFunnyLogicTask(randomTask) {
    const question = document.querySelector('.modal-title');
    question.innerHTML = randomTask.question;

    const getImage = document.querySelector('.logic-img_funny');

    $(randomTask.answer).each((index, value) => {
      getImage.innerHTML += `
        <button class="logic-img_funny__task-img" data-index="${index}">
        ${value}
        </button>
      `;
    });
  }

  static checkResult(playerAnswer) {
    this.playerAnswer = playerAnswer.textContent.trim();

    if (this.answer === this.playerAnswer) {
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

  static play(playerAnswer) {
    this.updateState(playerAnswer);
    Battle.updateState();
  }

  static closeTask() {
    $('.logic-img_funny').on('click keypress', (e) => {
      e.preventDefault();
      if (e.target.className === 'logic-img_funny__task-img') {
        const playerAnswer = e.target;
        this.modalHide();
        this.play(playerAnswer);
      }
    });
  }
}
