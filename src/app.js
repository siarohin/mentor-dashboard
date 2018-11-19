import * as navigations from './js/navigations';
import * as search from './js/search';


/* Init Content */
(function createWrapper() {
  const wrapper = document.createElement('div');

  wrapper.id = 'wrapper';
  wrapper.innerHTML = `<header>
    <div class="search-bar">
      <form method="get">
      <input type="search" autofocus="autofocus" autocomplete="off" placeholder="Search">
      </form>
    </div>
  </header>
  <div class="content">
    <div class="slider">
    </div>
  </div>
  <nav class="navigation">
  </nav>`;

  document.body.prepend(wrapper);
  search.listen();
}());


/* Listen on resize Window */
window.onresize = () => {
  // if slider generated -> generate navigation
  if (document.querySelector('.slider').children.length > 0) {
    navigations.generate();
    navigations.dotted();
  }
};
