import * as navigations from './navigations';
// eslint-disable-next-line import/no-cycle
import * as sliders from './sliders';
import { isContinue } from './settings';


/* Transform Slider on click Slider */
export function clickSlider() {
  const slider = document.querySelector('.slider');

  function listenSlider(clickStartLocation) {
    slider.onmouseup = (event) => {
      const clickEndLocation = event.pageX;
      const distance = clickEndLocation - clickStartLocation;

      if (distance < 0 && Math.abs(distance) > 100 && event.which === 1) {
        if (document.querySelector('nav > .active').nextSibling) {
          document.querySelector('nav > .active').nextSibling.click();
        }
      }

      if (distance > 0 && Math.abs(distance) > 100 && event.which === 1) {
        if (document.querySelector('nav > .active').previousSibling) {
          document.querySelector('nav > .active').previousSibling.click();
        }
      }

      navigations.dotted();
    };
  }

  slider.onmousedown = (event) => {
    const clickStartLocation = event.pageX;
    listenSlider(clickStartLocation);
  };
}


/* Transform Slider on click Navigation */
export function clickNavigation() {
  const navigation = document.querySelector('nav');

  const transformSlider = (elementNavigation) => {
    // current active
    const currentNavigation = document.querySelector('.active');
    // reset all styles
    const allNavigation = document.querySelectorAll('.active');

    for (let i = 0; i < allNavigation.length; i += 1) {
      allNavigation[i].classList.remove('active');
    }

    // new active
    elementNavigation.classList.add('active');
    function transformTo(where) {
      const div = document.querySelector('.slider');
      div.classList.add(`to-${where}`);
      setTimeout(() => {
        div.classList.remove(`to-${where}`);
      }, 1000);
    }

    // new active > old active? -> transform (to Left or to Right)
    if (Number(elementNavigation.innerText) > Number(currentNavigation.innerText)) {
      transformTo('left');
    }
    if (Number(elementNavigation.innerText) < Number(currentNavigation.innerText)) {
      transformTo('right');
    }
  };

  if (navigation) {
    navigation.onclick = (event) => {
      const elementNavigation = event.target;
      if (elementNavigation.tagName === 'A') {
        transformSlider(elementNavigation);
        navigations.dotted();

        // it's an alternative to use href="#"
        // we're using attribute data-href="...", so we have a clear window.location.href
        const id = elementNavigation.dataset.href;
        document.getElementById(id).scrollIntoView(true);

        // if we ckick on the last navigation -> loading sliders
        if (elementNavigation === document.querySelector('nav').lastElementChild) {
          isContinue.continue = true;
          isContinue.position = elementNavigation;

          sliders.render();
        }
      }
    };
  }
}


/* Transform Slider on touch Slider */
export function touchSlider() {
  let initialPoint;

  const slider = document.querySelector('.slider');

  slider.ontouchstart = (event) => {
    const startPoint = event.changedTouches[0];
    initialPoint = startPoint;
  };

  slider.ontouchend = (event) => {
    const finalPoint = event.changedTouches[0];

    const distance = Math.abs(initialPoint.pageX - finalPoint.pageX);

    if (distance > 20) {
      if (finalPoint.pageX < initialPoint.pageX) {
        if (document.querySelector('nav > .active').nextSibling) {
          document.querySelector('nav > .active').nextSibling.click();
        }
      } else if (document.querySelector('nav > .active').previousSibling) {
        document.querySelector('nav > .active').previousSibling.click();
      }
    }
  };
}
