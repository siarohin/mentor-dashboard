/* eslint-disable import/no-cycle */
import $ from 'jquery';

import template from './index.template';
import './index.css';

import taskMath from './taskMath';
import taskTransl from './taskTransl';
import taskLogic from './taskLogic';
import taskGram from './taskGram';
import taskSpeakOut from './taskSpeakOut';
import taskMystery from './taskMystery';
import { pause, getButtonFocus } from '../../utils/utils';


export default class Cast {
  static init() {
    this.draw();
    getButtonFocus();
    this.keyControl();
    this.initCast();
    this.getPlayerCast();
  }

  static initCast() {
    /* eslint-disable max-len */
    $('#taskMath').html(`Посчитать <span data-name="taskMath" class="badge badge-light">
      сила ${taskMath.healthPoint}</span>`);
    $('#taskTransl').html(`Перевести слово <span data-name="taskTransl" class="badge badge-light">
      сила ${taskTransl.healthPoint}</span>`);
    $('#taskLogic').html(`Найти лишнее <span data-name="taskLogic" class="badge badge-light">
      сила ${taskLogic.healthPoint}</span>`);
    $('#taskGram').html(`Вставить букву <span data-name="taskGram" class="badge badge-light">
      сила ${taskGram.healthPoint}</span>`);
    $('#taskSpeakOut').html(`Повторить имя <span data-name="taskSpeakOut" class="badge badge-light">
      сила ${taskSpeakOut.healthPoint}</span>`);

    $('#taskMystery').html(`Залечить раны <span data-name="taskMystery" class="badge badge-light">
      сила ${taskMystery.healthPoint}</span>`);
  }

  static draw() {
    $('#spels .modal-body').empty();
    const contentEl = document.querySelector('#spels .modal-body');
    contentEl.innerHTML = template;

    const title = document.querySelector('.modal-title');
    title.innerHTML = `Выбери задание-заклинание. Зеленые &ndash; наносят урон, желтое &ndash; лечит твоего героя.
      Чем больше сила, тем больший урон наносит заклинание.`;

    $('#spels').modal({
      keyboard: false,
      backdrop: 'static',
    });
  }

  static empty() {
    $('#cast').empty();
  }

  static modalShow() {
    $('#spels').modal('show');
  }

  static modalHide() {
    $('#spels').modal('hide');
  }

  static getPlayerCast() {
    const getTask = async (task) => {
      await pause(500);
      task.init();
      this.modalShow();
    };

    $('#cast').on('click', (e) => {
      if (e.target.id === 'taskMath'
      || e.target.getAttribute('data-name') === 'taskMath') {
        this.modalHide();
        getTask(taskMath);
      }
      if (e.target.id === 'taskTransl'
      || e.target.getAttribute('data-name') === 'taskTransl') {
        this.modalHide();
        getTask(taskTransl);
      }
      if (e.target.id === 'taskLogic'
      || e.target.getAttribute('data-name') === 'taskLogic') {
        this.modalHide();
        getTask(taskLogic);
      }
      if (e.target.id === 'taskGram'
      || e.target.getAttribute('data-name') === 'taskGram') {
        this.modalHide();
        getTask(taskGram);
      }
      if (e.target.id === 'taskSpeakOut'
      || e.target.getAttribute('data-name') === 'taskSpeakOut') {
        this.modalHide();
        taskSpeakOut.load();
        getTask(taskSpeakOut);
      }
      if (e.target.id === 'taskMystery'
      || e.target.getAttribute('data-name') === 'taskMystery') {
        this.modalHide();
        getTask(taskMystery);
      }
    });
  }

  static keyControl() {
    $('#cast').on('keydown', 'button', (e) => {
      if (e.key === 'ArrowDown') {
        $(e.target).next('button').focus();
      }
      if (e.key === 'ArrowUp') {
        $(e.target).prev('button').focus();
      }
    });
  }
}
