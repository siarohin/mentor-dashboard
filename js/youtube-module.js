const maxResult = 12; // set max Results of Elements

let valueUser; // user search phrase

const GLOBAL_BLOCK_SETTING = 320; // width of block

function searchResult() {

let valueUser = document.querySelector('#search')[0].value; // get User request from input


fetch('https://www.googleapis.com/youtube/v3/search?key=AIzaSyCAznfTwZKs8R47J-_PkpBrHYaRvcCmKwY&type=video&part=snippet&maxResults=' + maxResult + '&q=' + valueUser) // get Elements result
.then(function(response) {
  return response.json();
})
.then(function(sliderBlock) {

let arrID = []; // for Elements ID

  for (let i = 0; i < sliderBlock.pageInfo.resultsPerPage; i++) {
    document.querySelector('.slider').innerHTML = ''; // Reset Elements
  }

  for (let i = 0; i < sliderBlock.pageInfo.resultsPerPage; i++) {

    arrID.push(sliderBlock.items[i].id.videoId); // save Elements ID

    let numberID = i + 1; // set ID to block

    // create Elements block

    document.querySelector('.slider').innerHTML += `<div id="${numberID}">
    <img src="${sliderBlock.items[i].snippet.thumbnails.high.url}" alt="">
    <a href="https://www.youtube.com/watch?v=${sliderBlock.items[i].id.videoId}" target="_blank" title="${sliderBlock.items[i].snippet.title}">${sliderBlock.items[i].snippet.title}</a>
    <ul>
      <li>${sliderBlock.items[i].snippet.channelTitle}</li>
      <li>${(sliderBlock.items[i].snippet.publishedAt).substring(0,10)}</li>
    </ul>
    <p>${sliderBlock.items[i].snippet.description}</p>
    </div>`;

  }

    fetch('https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCAznfTwZKs8R47J-_PkpBrHYaRvcCmKwY&id=' + [arrID].join(',') + '&part=snippet,statistics') // get Elements statistic
    .then(function(res) {
      return res.json();
    })
    .then(function(reviewCount) {

      for (let i = 0; i < reviewCount.pageInfo.resultsPerPage; i++) {

        let li = document.createElement('li');
        document.querySelector('.slider').getElementsByTagName('ul')[i].append(li);
        li.innerHTML = reviewCount.items[i].statistics.viewCount; // create Elements statistic
      }

    });

    resetPoints(); // reset points
    drawPoints(); // drawing points

});

function resetPoints() {
    document.querySelector('.points').innerHTML = '';
}

function drawPoints() {
  let counterOfBlocks = Math.floor(document.body.querySelector('#wrapper').clientWidth / GLOBAL_BLOCK_SETTING); // number of blocks

  let numberOfPoints = Math.ceil(maxResult / counterOfBlocks); // number of points on the page

  resetPoints();

  for (let i = 1; i < numberOfPoints + 1; i++) {
    let point = `<a class="" onclick="changePoints(this)">${i}</a>`;
    document.querySelector('.points').innerHTML += point;
  }

  return false;
}


window.onresize = function() {  // change number of points on resize window
  drawPoints();
}

}


// click on points

function changePoints(element) {
  this.element = element;

  // reset all
  let links = document.querySelectorAll('.active');
    for (let i = 0; i < links.length; i++) {
      links[i].classList.remove('active');
  }

  // set active
  element.className = 'active';

	return false;
}


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