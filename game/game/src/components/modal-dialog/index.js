import template from './index.template';
import './index.css';

class ModalDialog {
  static draw() {
    const contentEl = document.querySelector('.wrapper');
    contentEl.insertAdjacentHTML('beforeend', template);
  }
}

export default ModalDialog;
