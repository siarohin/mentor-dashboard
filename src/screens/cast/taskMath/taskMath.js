import $ from 'jquery';

import template from './taskMath.template';
import Cast from '../cast';


class taskMath {
  static draw() {
    const contentEl = document.querySelector('#spels .modal-body');
    contentEl.innerHTML = template;

    const title = document.querySelector('.modal-title');
    title.innerHTML = 'MathTask';

    $('#spels').modal({
      keyboard: false,
      backdrop: 'static',
    });

    taskMath.selectCast();
  }

  static empty() {
    $('#taskMath').empty();
  }

  static selectCast() {
    $('#taskMath').on('click', (e) => {
      if (e.target.id === 'io') {
        $('#spels').modal('hide');
      }
    });

    return new Promise((resolve) => {
      $('#spels').on('hidden.bs.modal', () => {
        resolve(Cast.getPlayerCast());
      });
    });
  }
}

export default taskMath;
