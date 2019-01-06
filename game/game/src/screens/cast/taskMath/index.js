import $ from 'jquery';
import uniqueRandomArray from 'unique-random-array';

import template from './index.template';
import './index.css';
// eslint-disable-next-line import/no-cycle
import Battle from '../../battle';
import { getInputFocus, keyControlLeftRightInBut } from '../../../utils/utils';

export default class taskMath {
  static get healthPoint() {
    const health = 40;
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
    return ['+', '-', '*'];
  }

  static draw() {
    $('#spels .modal-body').empty();

    const contentEl = document.querySelector('#spels .modal-body');
    contentEl.innerHTML = template;

    const title = document.querySelector('.modal-title');
    title.innerHTML = 'Посчитай, сколько получится:';


    $('#spels').modal({
      keyboard: false,
      backdrop: 'static',
    });
  }

  static generateRandom() {
    const dataSource = this.data;
    const randomDataSource = uniqueRandomArray(dataSource);
    const operation = randomDataSource();

    this.generateTask(operation);
  }

  static generateTask(operation) {
    switch (operation) {
      case '+':
        this.firstNumber = Math.floor(Math.random() * 100);
        this.secondNumber = Math.floor(Math.random() * 100);
        this.answer = this.firstNumber + this.secondNumber;
        break;
      case '-':
        this.secondNumber = Math.floor(Math.random() * 100);
        this.firstNumber = Math.floor(Math.random() * 100) + this.secondNumber;
        this.answer = this.firstNumber - this.secondNumber;
        break;
      case '*':
        this.firstNumber = Math.floor(Math.random() * 100) + 1;
        this.secondNumber = Math.floor(Math.random() * 10) + 1;
        this.answer = this.firstNumber * this.secondNumber;
        break;
        // no default
    }

    const firstEl = document.querySelector('.first-number');
    const operationEl = document.querySelector('.operation');
    const secondEl = document.querySelector('.second-number');

    firstEl.textContent = this.firstNumber;
    operationEl.textContent = operation;
    secondEl.textContent = this.secondNumber;
  }

  static checkResult() {
    this.playerAnswer = document.querySelector('.input-answer').value;
    if (+this.playerAnswer === this.answer) {
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
