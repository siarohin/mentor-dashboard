import * as settings from './settings';


/* Set Active Navigation without click */
/* is slider visible? --> set active navigation */
/* use in function generate () */
function setNavigation() {
  const slider = document.querySelectorAll('.slider > div');

  // window_controll.height = window.height - header.height - nav.height
  const header = document.querySelector('header');
  const nav = document.querySelector('nav');
  const waste = header.offsetHeight + nav.offsetHeight;

  // get position of window_controll
  const windowPosition = {
    top: window.pageYOffset + waste,
    left: window.pageXOffset,
    right: window.pageXOffset + document.documentElement.clientWidth,
    bottom: window.pageYOffset + document.documentElement.clientHeight - waste,
  };

  for (let i = 0; i < slider.length; i += 1) {
    // get position of slider
    const sliderPosition = {
      top: window.pageYOffset + slider[i].getBoundingClientRect().top,
      left: window.pageXOffset + slider[i].getBoundingClientRect().left,
      right: window.pageXOffset + slider[i].getBoundingClientRect().right,
      bottom: window.pageYOffset + slider[i].getBoundingClientRect().bottom,
    };

    // is slider visible? -> it's active navigation
    if (
      sliderPosition.bottom > windowPosition.top
      && sliderPosition.top < windowPosition.bottom
      && sliderPosition.right > windowPosition.left
      && sliderPosition.left < windowPosition.right
    ) {
      // set navigation.href = slider.id
      const sliderId = `#${slider[i].id}`;
      const navigation = document.querySelectorAll('nav > a');

      for (let j = 0; j < navigation.length; j += 1) {
        if (navigation[j].hash === sliderId) {
          navigation[j].className = 'active';
        }
      }
    }
  }
}


/* Generate Navigation */
export const generate = function generateNavigation() {
  // delete navigation
  if (document.querySelector('nav')) {
    document.querySelector('nav').innerHTML = '';
  }

  // number of slider
  const countSlider = Math.floor(document.body.querySelector('#wrapper').clientWidth / settings.GLOBAL_BLOCK_SETTING);

  // number of navigation
  const countNavigation = Math.ceil(settings.youtube.length / countSlider);

  // set id to navigation
  const navigationId = [];
  for (let i = 0; i < settings.youtube.length; i += countSlider) {
    navigationId.push(settings.youtube[i]);
  }

  // show navigation
  for (let i = 0; i < countNavigation; i += 1) {
    const navigation = `<a href="#${navigationId[i]}">${i + 1}</a>`;
    document.querySelector('nav').innerHTML += navigation;
  }

  setNavigation();
};


/* Dotted Navigation */
export const dotted = function dottedNavigation() {
  const navigation = document.querySelectorAll('nav > a');
  const active = document.querySelector('nav > .active');

  const firstNavigation = document.querySelector('nav').firstChild;
  const lastNavigation = document.querySelector('nav').lastChild;

  const nextNavigation = active.nextSibling || active;
  const prevNavigation = active.previousSibling || active;

  for (let i = 0; i < navigation.length; i += 1) {
    navigation[i].classList.add('hide');
  }

  firstNavigation.classList.remove('hide');
  lastNavigation.classList.remove('hide');
  active.classList.remove('hide');

  firstNavigation.classList.add('first-navigation');
  lastNavigation.classList.add('last-navigation');

  nextNavigation.classList.remove('hide');
  prevNavigation.classList.remove('hide');

  if (lastNavigation === active
    || lastNavigation.previousSibling === active
    || lastNavigation.previousSibling.previousSibling === active) {
    lastNavigation.classList.remove('last-navigation');
  }

  if (firstNavigation === active || firstNavigation.nextSibling === active
    || firstNavigation.nextSibling.nextSibling === active) {
    firstNavigation.classList.remove('first-navigation');
  }

  if (firstNavigation === active) {
    nextNavigation.classList.remove('hide');
    if (nextNavigation.nextSibling !== null) {
      nextNavigation.nextSibling.classList.remove('hide');
      if (nextNavigation.nextSibling.nextSibling !== null) {
        nextNavigation.nextSibling.nextSibling.classList.remove('hide');
      }
    }
  }

  if (firstNavigation.nextSibling === active) {
    if (nextNavigation.nextSibling !== null) {
      nextNavigation.nextSibling.classList.remove('hide');
    }
  }

  if (lastNavigation === active) {
    prevNavigation.classList.remove('hide');
    if (prevNavigation.previousSibling !== null) {
      prevNavigation.previousSibling.classList.remove('hide');
      if (prevNavigation.previousSibling.previousSibling !== null) {
        prevNavigation.previousSibling.previousSibling.classList.remove('hide');
      }
    }
  }

  if (lastNavigation.previousSibling === active) {
    if (prevNavigation.previousSibling !== null) {
      prevNavigation.previousSibling.classList.remove('hide');
    }
  }

  if (navigation.length <= 5) {
    firstNavigation.classList.remove('first-navigation');
    lastNavigation.classList.remove('last-navigation');
  }
};
