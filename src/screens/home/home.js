import template from './home.template';
import './home.css';

export default class Home {
  static draw() {
    const contentEl = document.querySelector('#content');
    contentEl.insertAdjacentHTML('beforeend', template);
  }
}
