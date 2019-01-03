/* eslint-disable import/no-cycle */
import $ from 'jquery';
import template from './index.template';
import './index.css';
import startApp from '../../index';
import { music } from '../gameOver/index';

let playerScore = null;

const initPlayScore = () => {
  if (window.gameState) {
    playerScore = {
      name: window.gameState.playerName,
      result: window.gameState.playerScore,
    };
  }
};

const playAgain = () => {
  music.stop();
  $('#content').empty();
  $('.navbar').remove();
  $('.modal-backdrop').remove();
  $('#spels').remove();
  startApp();
};


export default class Score {
  static init() {
    const initScore = async () => {
      await initPlayScore();
      await this.setStorage();
      await this.draw();
      await this.getResult();
      await this.modalShow();
      await this.startGame();
    };
    initScore();
  }

  static draw() {
    $('#spels .modal-body').empty();

    const contentEl = document.querySelector('#spels .modal-body');
    contentEl.innerHTML = template;

    const title = document.querySelector('.modal-title');
    title.innerHTML = '5 лучших результатов';

    $('#spels').modal({
      keyboard: false,
      backdrop: 'static',
    });
  }

  static modalShow() {
    $('#spels').modal('show');
  }

  static modalHide() {
    $('#spels').modal('hide');
  }

  static setStorage() {
    if (localStorage.getItem('bhRODHhb5u2W')) {
      const score = JSON.parse(localStorage.getItem('bhRODHhb5u2W'));
      score.push(playerScore);
      score.sort((left, right) => right.result - left.result);
      if (score.length > 5) {
        score.pop();
      }
      localStorage.setItem('bhRODHhb5u2W', JSON.stringify(score));
    } else {
      localStorage.setItem('bhRODHhb5u2W', JSON.stringify([playerScore]));
    }
  }

  static getResult() {
    const score = JSON.parse(localStorage.getItem('bhRODHhb5u2W'));
    score.forEach(item => this.createScore(item));
  }

  static createScore(item) {
    const contentEl = document.querySelector('.js-score');

    const scoreList = `
      <li class='list-group-item d-flex justify-content-between align-items-center'>
        ${item.name}

        <span class='badge badge-primary badge-pill bg-success'>
          ${item.result / 100}
        </span>

      </li>`;

    contentEl.innerHTML += scoreList;
  }

  static startGame() {
    $('.score-footer__button').on('click', (e) => {
      e.preventDefault();
      playAgain();
    });
  }
}
