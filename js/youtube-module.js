// set max results of blocks
const maxResult = 15;

// width of slider
const GLOBAL_BLOCK_SETTING = 340;

// search user phrase
let searchValue;

// for video id
let youtubeId = [];

// number of blocks
let countSlider;

// number of navigation
let countNavigation;


/* Generate Functions */

// show init content
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


/* Search Functions */

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
    deleteNavigation();
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
  }, false);
}


// show navigation
function generateNavigation() {
  calculateNavigation();
  calculateSlider();

  // set id to navigation
  let navigationId = [];
  for (let i = 0; i < youtubeId.length; i += countSlider) {
    navigationId.push(youtubeId[i]);
  }

  // count navigation
  for (let i = 0; i < countNavigation; i++) {
    let navigation = `<a href="#${navigationId[i]}">${i+1}</a>`;
    document.querySelector('.navigation').innerHTML += navigation;
  };

  isVisible();
  listenNavigation();
  listenHeader();
  moveSlider();
}


/* Calculate Functions */

// calculate slider
function calculateSlider() {
  return countSlider = Math.floor(document.body.querySelector('#wrapper').clientWidth / GLOBAL_BLOCK_SETTING);
}

// calculate navigation
function calculateNavigation() {
  calculateSlider();
  return countNavigation = Math.ceil(maxResult / countSlider);
}


/* Delete Functions */

// delete slider
function deleteSlider() {
  document.querySelector('.slider').innerHTML = '';
}

// delete navigation
function deleteNavigation() {
  document.querySelector('.navigation').innerHTML = '';
}


/* Listener Function */

// listen navigation
function listenNavigation() {
  let navigation = document.querySelectorAll('.navigation > a');
  for (let i = 0; i < navigation.length; i++)
  navigation[i].addEventListener('click', function() {
    changePoints(this);
  });
}

// listen search form
function listenSearchForm() {
  let form = document.querySelector('form');
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    searchResult();
  });
}

// listen on resize window
window.onresize = function() {
  deleteNavigation();

  // if block has been drawed -> draw points
  if (document.querySelector('.slider').children.length > 0) {
    generateNavigation();
  }
}

// listen header
function listenHeader() {
  let header = document.querySelector('header');
  header.addEventListener('mouseup', moved);

  function moved(event) {
    event.stopPropagation();
  }
}

// is slider visible? --> set active navigation
function isVisible() {
  setTimeout(() => {

  const slider = document.querySelectorAll('.slider > div');

  const header = document.querySelector('header');
  const nav = document.querySelector('nav');

  // get position of window
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

    // if slider is visible
    if (sliderPosition.bottom > windowPosition.top &&
      sliderPosition.top < windowPosition.bottom &&
      sliderPosition.right > windowPosition.left &&
      sliderPosition.left < windowPosition.right) {

    // set navigation.href = slider.id
      let sliderId = `#${slider[i].id}`;
      let navigation = document.querySelectorAll('.navigation > a');

      for (let j = 0; j < navigation.length; j++) {
        if (navigation[j].hash === sliderId) {
          navigation[j].className = 'active';
        }
      }

    }
  }

  }, 0);
}

/* Change Functions */

// move slider
function moveSlider() {
  let slider = document.querySelectorAll('.slider > div');
  let lastX;

  for (let i = 0; i < slider.length; i++) {
    slider[i].addEventListener('mousedown', clickSlider);
  }

  function clickSlider(event) {
    if (event.which === 1) {
      lastX = event.pageX;
      addEventListener('mouseup', moved);
    }
  }

  function moved(event) {
    if (event.which != 1) {
      removeEventListener('mouseup', moved);
    } else {
      // distance between mousedown and mouseout (X)
      let dist = event.pageX - lastX;

      // Math.abs(dist) is fixed short distance
      if (dist < 0 && Math.abs(dist) > 100) {
        // if nextPage exist
        if (document.querySelector('.navigation > .active').nextSibling) {
        document.querySelector('.navigation > .active').nextSibling.click();
        }
      }
      if (dist > 0 && Math.abs(dist) > 100) {
        // if previousPage exist
        if (document.querySelector('.navigation > .active').previousSibling) {
        document.querySelector('.navigation > .active').previousSibling.click();
        }
      }
    }
  }
}

// change navigation
function changePoints(element) {
  // old active
  let current = document.querySelector('.active');

  // reset all
  let links = document.querySelectorAll('.active');
    for (let i = 0; i < links.length; i++) {
      links[i].classList.remove('active');
  }

  // set active
  element.className = 'active';

  // new active > old active? -> set direction (to Left or to Right)
  if (Number(element.innerText) > Number(current.innerText)) {
    transformToLeft(); }
  if (Number(element.innerText) < Number(current.innerText)) {
    transformToRight();
  }
}

// set animation to left
function transformToLeft() {
  let div = document.querySelector('.slider');

  div.classList.add('moving-left');

  setTimeout(() => {
    div.classList.remove('moving-left');
  }, 1000);
}

// set animation to right
function transformToRight() {
  let div = document.querySelector('.slider');

  div.classList.add('moving-right');

  setTimeout(() => {
    div.classList.remove('moving-right');
  }, 1000);
}
