/* eslint-disable import/no-cycle */
import $ from 'jquery';

import template from './index.template';

import taskMath from './taskMath';
import taskTransl from './taskTransl';
import { pause } from '../../utils/utils';

export default class Cast {
  static init() {
    this.draw();
    this.initCast();
    this.getPlayerCast();
  }

  static initCast() {
    $('#taskMath').text('Математика');
    $('#taskTransl').text('Перевод слов');
    $('#taskCompare').text('Compare');
    $('#taskWriting').text('Writing');
    $('#taskListen').text('Listening');
    $('#taskSpeaking').text('Speaking');
  }

  static draw() {
    const contentEl = document.querySelector('#spels .modal-body');
    contentEl.innerHTML = template;

    const title = document.querySelector('.modal-title');
    title.innerHTML = 'Выбери заклинание. Зеленые &ndash; наносят урон, желтые &ndash; лечат твоего героя.';

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
      if (e.target.id === 'taskMath') {
        this.modalHide();
        getTask(taskMath);
      }
      if (e.target.id === 'taskTransl') {
        this.modalHide();
        getTask(taskTransl);
      }
    });
  }
}
