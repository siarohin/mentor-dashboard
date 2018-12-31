import $ from 'jquery';
import uniqueRandomArray from 'unique-random-array';

import template from './index.template';
import './index.css';
// eslint-disable-next-line import/no-cycle
import Battle from '../../battle';


export default class taskMath {
  static init() {
    this.draw();
    this.generateRandom();
    this.modalShow();
    this.closeTask();
  }

  static get data() {
    return ['+', '-', '*'];
  }

  static draw() {
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

    this.generateMathTask(operation);
  }

  static generateMathTask(operation) {
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

  static empty() {
    $('#taskMath').empty();
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
      window.gameState.monsterHealth -= 20;
      Battle.playerAttack(3000);
    } else {
      window.gameState.playerHealth -= 20;
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
