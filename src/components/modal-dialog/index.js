import template from './index.template';

class ModalDialog {
  static draw() {
    const contentEl = document.querySelector('body');
    contentEl.insertAdjacentHTML('beforeend', template);
  }
}

export default ModalDialog;
