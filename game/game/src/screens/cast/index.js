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
import taskFunnyLogic from './taskFunnyLogic';
import { pause, getButtonFocus } from '../../utils/utils';


const taskList = {
  taskName: [
    taskMath,
    taskTransl,
    taskLogic,
    taskGram,
    taskSpeakOut,
    taskFunnyLogic,
    taskMystery,
  ],
  id: [
    'taskMath',
    'taskTransl',
    'taskLogic',
    'taskGram',
    'taskSpeakOut',
    'taskFunnyLogic',
    'taskMystery',
  ],
  description: [
    'Посчитать',
    'Перевести слово',
    'Найти лишнее',
    'Вставить букву',
    'Повторить имя',
    'Отгадать загадку',
    'Залечить раны',
  ],
};

const showErorMessage = async (htmlElement) => {
  const saveElementHtml = htmlElement.innerHTML;
  $(htmlElement).text('У тебя полно здоровья! Выбирай зеленые задания.');
  await pause(3000);
  $(htmlElement).empty();
  $(htmlElement).html(saveElementHtml);
};

export default class Cast {
  static init() {
    this.draw();
    getButtonFocus();
    this.keyControl();
    this.initCast();
    this.getPlayerCast();
  }

  static initCast() {
    $(taskList.taskName).each((key) => {
      const task = taskList.taskName[key];
      const title = taskList.description[key];
      const id = taskList.id[key];

      $(`#${id}`)
        .html(`${title} <span data-name="${id}" class="badge badge-light">
          сила ${task.healthPoint}</span>`);
    });
  }

  static draw() {
    $('#spels .modal-body').empty();
    const contentEl = document.querySelector('#spels .modal-body');
    contentEl.innerHTML = template;

    $('.modal-title').html(`Выбери задание-заклинание.
      Зеленые &ndash; наносят урон, желтое &ndash; лечит твоего героя.
      Чем больше сила, тем больший урон наносит заклинание.`);

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

  static gamePause() {
    const setPauseCloseWindow = async () => {
      await $('.init-cast-button').show();
      this.modalHide();
      await $('.init-cast-button__button').focus();
    };
    setPauseCloseWindow();
  }

  static getPlayerCast() {
    const getTask = async (task) => {
      await pause(500);
      task.init();
      this.modalShow();
    };

    $('#cast').on('click', (e) => {
      $(taskList.taskName).each((key) => {
        const task = taskList.taskName[key];
        const id = taskList.id[key];
        if (e.target.id === id || e.target.getAttribute('data-name') === id) {
          if (window.gameState.playerHealth === 100 && task === taskMystery) {
            showErorMessage(e.target);
          } else {
            this.modalHide();
            getTask(task);
          }
        }
      });

      if (e.target.className === 'close-window') {
        e.preventDefault();
        this.gamePause();
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
