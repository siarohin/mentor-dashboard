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

    arrID.push(sliderBlock.items[i].id.videoId); // save Elements ID
    
    // create Elements block

    document.querySelector('.slider').innerHTML += `<div class="">
    <img src="${sliderBlock.items[i].snippet.thumbnails.high.url}" alt="">
    <a href="https://www.youtube.com/watch?v=${sliderBlock.items[i].id.videoId}" title="">${sliderBlock.items[i].snippet.title}</a>
    <ul>
      <li>${sliderBlock.items[i].snippet.channelTitle}</li>
      <li>${sliderBlock.items[i].snippet.publishedAt}</li>
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


let pointsItem = `<a class="active " href="" title="">1</a>`;

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
    ${pointsItem}
  </div>
</footer>`;

document.body.prepend(wrapper);