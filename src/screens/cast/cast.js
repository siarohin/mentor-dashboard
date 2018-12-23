import $ from 'jquery';

import template from './cast.template';


class Cast {
  static draw() {
    const contentEl = document.querySelector('#spels .modal-body');
    contentEl.innerHTML = template;

    $('#spels').modal({
      keyboard: false,
      backdrop: 'static',
    });
  }

  static empty() {
    $('#cast').empty();
  }

  static getPlayerCast() {
    Cast.draw();
    const currentCast = 'only_one_cast';

    return new Promise((resolve) => {
      $('#spels').on('hidden.bs.modal', () => {
        resolve(currentCast);
      });
    });
  }
}

export default Cast;
