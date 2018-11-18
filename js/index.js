// set max results of blocks
const MAX_RESULT = 15;

// width of slider
const GLOBAL_BLOCK_SETTING = 340;

// video id
const youtubeId = [];

/* Delete Slider */
function deleteSlider() {
  document.querySelector('.slider').innerHTML = '';
}


/* Set Active Navigation without click */
/* is slider visible? --> set active navigation */
/* use in function generateNavigation */
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
function generateNavigation() {
  // delete navigation
  if (document.querySelector('nav')) {
    document.querySelector('nav').innerHTML = '';
  }

  // number of slider
  const countSlider = Math.floor(document.body.querySelector('#wrapper').clientWidth / GLOBAL_BLOCK_SETTING);

  // number of navigation
  const countNavigation = Math.ceil(youtubeId.length / countSlider);

  // set id to navigation
  const navigationId = [];
  for (let i = 0; i < youtubeId.length; i += countSlider) {
    navigationId.push(youtubeId[i]);
  }

  // show navigation
  for (let i = 0; i < countNavigation; i += 1) {
    const navigation = `<a href="#${navigationId[i]}">${i + 1}</a>`;
    document.querySelector('nav').innerHTML += navigation;
  }

  setNavigation();
}


/* Dotted Navigation */
function dottedNavigation() {
  const navigation = document.querySelectorAll('nav > a');
  const active = document.querySelector('nav > .active');
  const dottedText = document.createTextNode('...');

  const firstNavigation = document.querySelector('nav').firstChild;
  const lastNavigation = document.querySelector('nav').lastChild;

  let nextNavigation = active.nextSibling || active;
  let prevNavigation = active.previousSibling || active;

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

  if (lastNavigation === active || lastNavigation.previousSibling === active || lastNavigation.previousSibling.previousSibling === active) {
    lastNavigation.classList.remove('last-navigation');
  }

  if (firstNavigation === active || firstNavigation.nextSibling === active || firstNavigation.nextSibling.nextSibling === active) {
    firstNavigation.classList.remove('first-navigation');
  }

  if (firstNavigation === active) {
    nextNavigation.classList.remove('hide');
    nextNavigation.nextSibling.classList.remove('hide');
    nextNavigation.nextSibling.nextSibling.classList.remove('hide');
  }

  if (firstNavigation.nextSibling === active) {
    nextNavigation.nextSibling.classList.remove('hide');
  }

  if (lastNavigation === active) {
    prevNavigation.classList.remove('hide');
    prevNavigation.previousSibling.classList.remove('hide');
    prevNavigation.previousSibling.previousSibling.classList.remove('hide');
  }

  if (lastNavigation.previousSibling === active) {
    prevNavigation.previousSibling.classList.remove('hide');
  }

  if (navigation.length <= 5) {
    firstNavigation.classList.remove('first-navigation');
    lastNavigation.classList.remove('last-navigation');
  }

}


/* Transform Slider on click Slider */
function moveSlider() {
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
    };
  }

  slider.onmousedown = (event) => {
    const clickStartLocation = event.pageX;
    listenSlider(clickStartLocation);
  };
}


/* Transform Slider on click Navigation */
function listenNavigation() {
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
        dottedNavigation();
      }
    };
  }
}


/* Transform Slider on touch Slider */
function touchSlider() {
  let initialPoint;

  const slider = document.querySelector('.slider');

  slider.addEventListener('touchstart', (event) => {
    const startPoint = event.changedTouches[0];
    initialPoint = startPoint;
  }, false);

  slider.addEventListener('touchend', (event) => {
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
  });
}


/* Search Result */
function searchResult() {
  // user search phrase
  const searchValue = document.querySelector('form')[0].value;

  // send response to api
  fetch(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyCAznfTwZKs8R47J-_PkpBrHYaRvcCmKwY&type=video&part=snippet&maxResults=${MAX_RESULT}&q=${searchValue}`)
    .then(response => response.json())
    .then((sliderBlock) => {
      deleteSlider();

      // reset video id
      youtubeId.length = 0;

      for (let i = 0; i < sliderBlock.pageInfo.resultsPerPage; i += 1) {
        // save video id
        youtubeId.push(sliderBlock.items[i].id.videoId);

        // create blocks
        document.querySelector('.slider').innerHTML += `<div id="${youtubeId[i]}">
      <img src="${sliderBlock.items[i].snippet.thumbnails.high.url}" alt="">
      <a href="//www.youtube.com/watch?v=${sliderBlock.items[i].id.videoId}" target="_blank" title="${sliderBlock.items[i].snippet.title}">${sliderBlock.items[i].snippet.title}</a>
      <ul>
        <li>${sliderBlock.items[i].snippet.channelTitle}</li>
        <li>${sliderBlock.items[i].snippet.publishedAt.substring(0, 10)}</li>
      </ul>
      <p>${sliderBlock.items[i].snippet.description}</p>
      </div>`;
      }

      fetch(`https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCAznfTwZKs8R47J-_PkpBrHYaRvcCmKwY&id=${[...youtubeId]}&part=snippet,statistics`)
        .then(res => res.json())
        .then((reviewCount) => {
          for (let i = 0; i < reviewCount.pageInfo.resultsPerPage; i += 1) {
            const li = document.createElement('li');
            document
              .querySelector('.slider')
              .getElementsByTagName('ul')[i]
              .append(li);
            li.innerHTML = reviewCount.items[i].statistics.viewCount;
          }
        });

      generateNavigation();
      listenNavigation();
      moveSlider();
      touchSlider();

      // init navigation position
      if (document.querySelector('nav > a')) {
        document.querySelector('nav > a').click();
      }
    }, false);
}


/* Listen search Form */
function listenSearchForm() {
  const form = document.querySelector('form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    searchResult();
  });
}


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
  listenSearchForm();
}());


/* Listen on resize Window */
window.onresize = () => {
  // if slider generated -> generate navigation
  if (document.querySelector('.slider').children.length > 0) {
    generateNavigation();
    dottedNavigation();
  }
};
