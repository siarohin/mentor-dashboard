import * as navigations from './navigations';


/* Listen on resize Window */
// eslint-disable-next-line import/prefer-default-export
export function resize() {
  window.onresize = () => {
  // if slider generated -> generate navigation
    if (document.querySelector('.slider').children.length > 0) {
      navigations.generate();
      navigations.dotted();
    }
  };
}
