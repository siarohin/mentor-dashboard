/* eslint-disable import/prefer-default-export */
import * as sliders from './sliders';


/* Listen search Form */
export function listen() {
  const form = document.querySelector('form');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form[0].value.match(/^[=!а-яА-ЯёЁa-zA-Z0-9-+ ]+$/)) {
      document.querySelector('.search-bar').classList.add('search-bar__error');
    } else {
      document.querySelector('.search-bar').classList.remove('search-bar__error');
      sliders.remove();
      sliders.idStorage.length = 0;
      sliders.render();
    }
  });
}
