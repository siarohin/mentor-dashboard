const maxResult = 12; // set max Results of Elements

let valueUser;


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

    // date Convert

    let dateConvert = sliderBlock.items[i].snippet.publishedAt;
    dateConvert = dateConvert.substring(0,10);

    // nameConvert

    let nameConvert = sliderBlock.items[i].snippet.title;
    nameConvert = nameConvert.trim();

    let numberID = i + 1; // set Elements ID

    // create Elements block

    document.querySelector('.slider').innerHTML += `<div id="${numberID}">
    <img src="${sliderBlock.items[i].snippet.thumbnails.high.url}" alt="">
    <a href="https://www.youtube.com/watch?v=${sliderBlock.items[i].id.videoId}" target="_blank" title="${nameConvert}">${nameConvert}</a>
    <ul>
      <li>${sliderBlock.items[i].snippet.channelTitle}</li>
      <li>${dateConvert}</li>
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

});

}



let wrapper = document.createElement('div');

wrapper.id = 'wrapper';
wrapper.innerHTML = `<header>
  <div class="search-bar">
    <form id="search" method="get" onsubmit="searchResult(); getPoints(); return false;">
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






function getPoints() {
  let counterOfBlocks = Math.floor(document.body.querySelector('#wrapper').clientWidth / 320); // number of blocks

  let numberOfPoints = Math.ceil(maxResult / counterOfBlocks); // number of points on the page


  for (let i = 1; i < numberOfPoints + 1; i++) {
    let point = `<a class="active " href="" title="">${i}</a>`;
    document.querySelector('.points').innerHTML += point;
  }

}


// change number of points on resize window

window.onresize = function() {
  document.querySelector('.points').innerHTML = '';
  getPoints();
}