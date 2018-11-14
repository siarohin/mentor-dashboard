(function createWrapper() {
  let wrapper = document.createElement('div');

  wrapper.id = 'wrapper';
  wrapper.innerHTML = `<header>
    <div class="search-bar">
      <form id="search" method="get" onsubmit="searchResult(); return false;">
      <input type="search" autofocus="autofocus" autocomplete="off" placeholder="Search">
      </form>
    </div>
  </header>
  <div class="content">
    <div class="slider">

    </div>
  </div>
  <footer>
    <div class="points">

    </div>
  </footer>`;

  document.body.prepend(wrapper);
})();

// set max Results of Elements
const maxResult = 15;

// search phrase
let searchValue;

// width of block
const GLOBAL_BLOCK_SETTING = 340;

// for video id
let arrId = [];

// number of blocks
let counterOfBlocks;

// number of points
let numberOfPoints;

// calculate number of blocks
function calculateOfBlocks() {
  return counterOfBlocks = Math.floor(document.body.querySelector('#wrapper').clientWidth / GLOBAL_BLOCK_SETTING);
}

// calculate number of points
function calculateNumberOfPoints() {
  calculateOfBlocks();
  return numberOfPoints = Math.ceil(maxResult / counterOfBlocks);
}

// delete sliders
function deleteSliders() {
  document.querySelector('.slider').innerHTML = '';
}

// delete points
function deletePoints() {
  document.querySelector('.points').innerHTML = '';
}

// draw points
function drawPoints() {
  calculateNumberOfPoints();
  calculateOfBlocks();

  // set id to points
  let arrSliceId = [];
  for (let i = 0; i < arrId.length; i += counterOfBlocks) {
    arrSliceId.push(arrId[i]);
  }

  // count points
  for (let i = 0; i < numberOfPoints; i++) {
    let point = `<a href="#${arrSliceId[i]}">${i+1}</a>`;
    document.querySelector('.points').innerHTML += point;
  };

  isVisible();
  clickPoint();
  return false;
}

// pointListener
function clickPoint() {
  let a = document.querySelectorAll('.points > a');
  for (let i = 0; i < a.length; i++)
  a[i].addEventListener('click', function() {
    changePoints(this)
  });
}

// get user search phrase
function getSearchValue() {
  return searchValue = document.querySelector('#search')[0].value;
}

function searchResult() {
  // clear location hash
  window.location.hash = '';

  // get user search phrase
  getSearchValue();

  // send response to api
  fetch('https://www.googleapis.com/youtube/v3/search?key=AIzaSyCAznfTwZKs8R47J-_PkpBrHYaRvcCmKwY&type=video&part=snippet&maxResults=' + maxResult + '&q=' + searchValue) // get Elements result
  .then(function(response) {
    return response.json();
  })
  .then(function(sliderBlock) {
    // delete all sliders blocks
    deleteSliders();
    // delete pointers blocks
    deletePoints();
    // reset video id
    arrId.length = 0;

    for (let i = 0; i < sliderBlock.pageInfo.resultsPerPage; i++) {
      // save video id
      arrId.push(sliderBlock.items[i].id.videoId);

      // create blocks
      document.querySelector('.slider').innerHTML += `<div id="${arrId[i]}">
      <img src="${sliderBlock.items[i].snippet.thumbnails.high.url}" alt="">
      <a href="https://www.youtube.com/watch?v=${sliderBlock.items[i].id.videoId}" target="_blank" title="${sliderBlock.items[i].snippet.title}">${sliderBlock.items[i].snippet.title}</a>
      <ul>
        <li>${sliderBlock.items[i].snippet.channelTitle}</li>
        <li>${(sliderBlock.items[i].snippet.publishedAt).substring(0,10)}</li>
      </ul>
      <p>${sliderBlock.items[i].snippet.description}</p>
      </div>`;
    }

      fetch('https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCAznfTwZKs8R47J-_PkpBrHYaRvcCmKwY&id=' + [...arrId] + '&part=snippet,statistics') // get Elements statistic
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
      drawPoints();
      clickSlider();
  });
}

// change number of points on resize window
window.onresize = function() {
  deletePoints();

  // if block has been drawed -> draw points
  if (document.querySelector('.slider').children.length > 0) {
    drawPoints();
  }
}

// click on points
function changePoints(element) {
  // old active (has been active)
  let current = document.querySelector('.active');

  // reset all
  let links = document.querySelectorAll('.active');
    for (let i = 0; i < links.length; i++) {
      links[i].classList.remove('active');
  }

  // set active
  element.className = 'active';

  // new active > old active? -> set direction (to Left or to Right)
  if (element.innerText > current.innerText) {
    transformToLeft(); }
  if (element.innerText < current.innerText) {
    transformToRight();
  }
  return false;
}

// set moving animation to left
function transformToLeft() {
  let div = document.querySelector('.slider');

  div.classList.add('moving-left');

  setTimeout(() => {
    div.classList.remove('moving-left');
  }, 1000);
}

// set moving animation to right
function transformToRight() {
  let div = document.querySelector('.slider');

  div.classList.add('moving-right');

  setTimeout(() => {
    div.classList.remove('moving-right');
  }, 1000);
}

// Is div visible? set <a class = 'active'>
function isVisible() {
  setTimeout(() => {

  const target = document.querySelectorAll('.slider > div');

  // get position of window
  windowPosition = {
  top: window.pageYOffset + 200,
  left: window.pageXOffset,
  right: window.pageXOffset + document.documentElement.clientWidth,
  bottom: window.pageYOffset + document.documentElement.clientHeight - 200,
  };

  for (let i = 0; i < target.length; i++) {

    // get position of element
    let targetPosition = {
        top: window.pageYOffset + target[i].getBoundingClientRect().top,
        left: window.pageXOffset + target[i].getBoundingClientRect().left,
        right: window.pageXOffset + target[i].getBoundingClientRect().right,
        bottom: window.pageYOffset + target[i].getBoundingClientRect().bottom,
      };

    // if element is visible
    if (targetPosition.bottom > windowPosition.top &&
      targetPosition.top < windowPosition.bottom &&
      targetPosition.right > windowPosition.left &&
      targetPosition.left < windowPosition.right) {

      let active = `#${target[i].id}`;
      let link = document.querySelectorAll('.points > a');
      for (let j = 0; j < link.length; j++) {
        if (link[j].hash === active) {
          link[j].className = 'active';
        }
      }

    }
  }

  }, 0);
}


function clickSlider() {
  let slider = document.querySelectorAll('.slider > div');

  for (let i = 0; i < slider.length; i++)
  slider[i].addEventListener('click', function() {
    calculateOfBlocks();
    // alert('Нажат блок с id ' + this.id);
    // alert('Всего блоков на странице ' + counterOfBlocks);
    
    // click to nextPage
    document.querySelector('.points > .active').nextSibling.click();
  });
}

