import $ from 'jquery';
import uniqueRandomArray from 'unique-random-array';

import template from './taskMath.template';
import './taskMath.css';

import Cast from '../cast';


class taskMath {
  static draw() {
    const contentEl = document.querySelector('#spels .modal-body');
    contentEl.innerHTML = template;

    const title = document.querySelector('.modal-title');
    title.innerHTML = 'I have a simple mathematics task for you:';

    $('#spels').modal({
      keyboard: false,
      backdrop: 'static',
    });

    this.generateOperation();
    this.selectCast();
  }

  static generateOperation() {
    const dataSource = ['+', '-', '*'];
    const randomOperation = uniqueRandomArray(dataSource);
    const operation = randomOperation();

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
    if (+this.playerAnswer === this.answer) {
      return true;
    } return false;
  }

  static empty() {
    $('#taskMath').empty();
  }

  static selectCast() {
    $('.btn-answer').on('click', () => {
      $('#spels').modal('hide');
      this.playerAnswer = document.querySelector('.input-answer').value;
      console.log(this.checkResult()); // for test only
    });

    return new Promise((resolve) => {
      $('#spels').on('hidden.bs.modal', () => {
        resolve(taskMath.draw());
      });
    });
  }
}

export default taskMath;
