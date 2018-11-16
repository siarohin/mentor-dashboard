// set max results of blocks
const maxResult = 15;

// width of slider
const GLOBAL_BLOCK_SETTING = 340;

// video id
let youtubeId = [];


/* Init Content */
(function createWrapper() {
  let wrapper = document.createElement('div');

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
})();


/* Search Result */
function searchResult() {
  // user search phrase
  let searchValue = document.querySelector('form')[0].value;

  // send response to api
  fetch('https://www.googleapis.com/youtube/v3/search?key=AIzaSyCAznfTwZKs8R47J-_PkpBrHYaRvcCmKwY&type=video&part=snippet&maxResults=' + maxResult + '&q=' + searchValue) // get Elements result
  .then(function(response) {
    return response.json();
  })
  .then(function(sliderBlock) {

    deleteSlider();

    // reset video id
    youtubeId.length = 0;

    for (let i = 0; i < sliderBlock.pageInfo.resultsPerPage; i++) {
      // save video id
      youtubeId.push(sliderBlock.items[i].id.videoId);

      // create blocks
      document.querySelector('.slider').innerHTML += `<div id="${youtubeId[i]}">
      <img src="${sliderBlock.items[i].snippet.thumbnails.high.url}" alt="">
      <a href="https://www.youtube.com/watch?v=${sliderBlock.items[i].id.videoId}" target="_blank" title="${sliderBlock.items[i].snippet.title}">${sliderBlock.items[i].snippet.title}</a>
      <ul>
        <li>${sliderBlock.items[i].snippet.channelTitle}</li>
        <li>${(sliderBlock.items[i].snippet.publishedAt).substring(0,10)}</li>
      </ul>
      <p>${sliderBlock.items[i].snippet.description}</p>
      </div>`;
    }

      fetch('https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCAznfTwZKs8R47J-_PkpBrHYaRvcCmKwY&id=' + [...youtubeId] + '&part=snippet,statistics') // get Elements statistic
      .then(function(res) {
        return res.json();
      })
      .then(function(reviewCount) {
        for (let i = 0; i < reviewCount.pageInfo.resultsPerPage; i++) {
          let li = document.createElement('li');
          document.querySelector('.slider').getElementsByTagName('ul')[i].append(li);
          li.innerHTML = reviewCount.items[i].statistics.viewCount;
        }
      });

      generateNavigation();
      listenNavigation();
      moveSlider();

  }, false);
}


/* Generate Navigation */
function generateNavigation() {

  // delete navigation
  if (document.querySelector('nav')) {
    document.querySelector('nav').innerHTML = '';
  }

  // number of slider
  let countSlider = Math.floor(document.body.querySelector('#wrapper').clientWidth / GLOBAL_BLOCK_SETTING);

  // number of navigation
  let countNavigation = Math.ceil(maxResult / countSlider);

  // set id to navigation
  let navigationId = [];
  for (let i = 0; i < youtubeId.length; i += countSlider) {
    navigationId.push(youtubeId[i]);
  }

  // show navigation
  for (let i = 0; i < countNavigation; i++) {
    let navigation = `<a href="#${navigationId[i]}">${i+1}</a>`;
    document.querySelector('nav').innerHTML += navigation;
  }

  setNavigation();
}

/* Delete Slider */
function deleteSlider() {
  document.querySelector('.slider').innerHTML = '';
}

/* Listen search Form */
function listenSearchForm() {
  let form = document.querySelector('form');
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    searchResult();
  });
}

/* Listen on resize Window */
window.onresize = () => {
  // if slider generated -> generate navigation
  if (document.querySelector('.slider').children.length > 0) {
    generateNavigation();
  }
}


/* Set Active Navigation without click */
/* is slider visible? --> set active navigation */
/* use in function generateNavigation */
function setNavigation() {
  setTimeout(() => {
  const slider = document.querySelectorAll('.slider > div');

  // window_controll.height = window.height - header.height - nav.height
  const header = document.querySelector('header');
  const nav = document.querySelector('nav');

  // get position of window_controll
  windowPosition = {
    top: window.pageYOffset + header.offsetHeight + nav.offsetHeight,
    left: window.pageXOffset,
    right: window.pageXOffset + document.documentElement.clientWidth,
    bottom: window.pageYOffset + document.documentElement.clientHeight - header.offsetHeight - nav.offsetHeight,
  };

  for (let i = 0; i < slider.length; i++) {

    // get position of slider
    let sliderPosition = {
      top: window.pageYOffset + slider[i].getBoundingClientRect().top,
      left: window.pageXOffset + slider[i].getBoundingClientRect().left,
      right: window.pageXOffset + slider[i].getBoundingClientRect().right,
      bottom: window.pageYOffset + slider[i].getBoundingClientRect().bottom,
      };

    // is slider visible? -> it's active navigation
    if (sliderPosition.bottom > windowPosition.top &&
      sliderPosition.top < windowPosition.bottom &&
      sliderPosition.right > windowPosition.left &&
      sliderPosition.left < windowPosition.right) {

    // set navigation.href = slider.id
      let sliderId = `#${slider[i].id}`;
      let navigation = document.querySelectorAll('nav > a');

      for (let j = 0; j < navigation.length; j++) {
        if (navigation[j].hash === sliderId) {
          navigation[j].className = 'active';
        }
      }

    }

  }

  }, 0);
}


/* Transform Slider on click Slider */
function moveSlider() {
  let slider = document.querySelector('.slider');

  slider.onmousedown = function(event) {
    let startPosition = event.pageX;
    listenSlider(slider, startPosition);
  }
}

function listenSlider(slider, startPosition) {

  slider.onmouseup = function(event) {

    let finishPosition = event.pageX;
    let distance = finishPosition - startPosition;

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


/* Listen Navigation on click */
function listenNavigation() {
  let navigation = document.querySelector('nav');
  if (navigation) {

    navigation.onclick = function(event) {
      let elementNavigation = event.target;
      if (elementNavigation.tagName != 'A') return;
      transformSlider(elementNavigation);
    };

  }
}


/* Transform Slider on click Navigation */
let transformSlider = function(elementNavigation) {

  // current active
  let currentNavigation = document.querySelector('.active');

  // reset all styles
  let allNavigation = document.querySelectorAll('.active');
    for (let i = 0; i < allNavigation.length; i++) {
      allNavigation[i].classList.remove('active');
  }

  // new active
  elementNavigation.className = 'active';

  // new active > old active? -> transform (to Left or to Right)
  if (Number(elementNavigation.innerText) > Number(currentNavigation.innerText)) {
    transformTo('left');
  }
  if (Number(elementNavigation.innerText) < Number(currentNavigation.innerText)) {
    transformTo('right');
  }

  function transformTo(where) {
    let div = document.querySelector('.slider');

    div.classList.add(`to-${where}`);

    setTimeout(() => {
      div.classList.remove(`to-${where}`);
    }, 1000);
  }

}