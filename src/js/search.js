import * as sliders from './sliders';
import * as settings from './settings';


/* Reset slider, idStorage, nextToken */
export function reset() {
  sliders.remove();
  settings.idStorage.length = 0;
  settings.nextToken.length = 1;
}


/* Listen search Form */
export function listen() {
  const form = document.querySelector('form');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form[0].value.match(/^[=!а-яА-ЯёЁa-zA-Z0-9-+ ]+$/)) {
      document.querySelector('.search-bar').classList.add('search-bar__error');
    } else {
      document.querySelector('.search-bar').classList.remove('search-bar__error');
      reset();
      sliders.render();
    }
  });
}
