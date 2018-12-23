import $ from 'jquery';

import template from './cast.template';
import taskMath from './taskMath/taskMath';


class Cast {
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

  static getPlayerCast() {
    this.draw();

    $('#cast').on('click', (e) => {
      if (e.target.id === 'taskMath') {
        $('#spels').modal('hide');
      }
    });

    return new Promise((resolve) => {
      $('#spels').on('hidden.bs.modal', () => {
        resolve(taskMath.draw());
      });
    });
  }
}

export default Cast;
