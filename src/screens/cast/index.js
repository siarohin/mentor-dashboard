import $ from 'jquery';

import template from './index.template';

// eslint-disable-next-line import/no-cycle
import taskMath from './taskMath';
import { pause } from '../../utils';

export default class Cast {
  static init() {
    this.draw();
    this.initCast();
    this.getPlayerCast();
  }

  static initCast() {
    $('#taskMath').text('Mathematics');
    $('#taskTransl').text('Translate');
    $('#taskCompare').text('Compare');
    $('#taskWriting').text('Writing');
    $('#taskListen').text('Listening');
    $('#taskSpeaking').text('Speaking');
  }

  static draw() {
    const contentEl = document.querySelector('#spels .modal-body');
    contentEl.innerHTML = template;

    const title = document.querySelector('.modal-title');
    title.innerHTML = 'Like, what\'s your best power?';

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
    });
  }
}
