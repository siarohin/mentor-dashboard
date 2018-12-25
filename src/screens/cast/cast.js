import $ from 'jquery';

import template from './cast.template';
import taskMath from './taskMath/taskMath';
import { pause } from '../../utils';


class Cast {
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
    const getTask = async () => {
      this.modalHide();
      await (pause(500));

      taskMath.init();
      this.modalShow();
    };

    $('#cast').on('click', (e) => {
      if (e.target.id === 'taskMath') {
        getTask();
      }
    });
  }
}

export default Cast;
