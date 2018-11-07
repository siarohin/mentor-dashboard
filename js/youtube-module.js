/* <div id="wrapper">
  <header>
    <div class="search-bar">
      <input id="search" type="text" name="search" value="" autocomplete="off" placeholder="Search">
    </div>
  </header>

  <div class="content">
    <div class="slider">
          
          <div class="">
            <img src="./images/hqdefault.jpg" alt="">
            <a href="" title="">RS School. JavaScript Modules</a>
            <ul>
              <li>Lorem ipsum dolor sit, amet consectetur</li>
              <li>24-07-2018</li>
              <li>1205300</li>
            </ul>
            <p>NodeJS has a really great amount of 3rd party libraries. Anything you can imagine, you can find it in NPM. But the grammar of JavaScript sucks, which make it really hard to maintain a large scale NodeJS application.</p>
          </div>
          
    </div>
  </div>

  <footer>
    <div class="points">
      <a class="active hidden" href="" title="">1</a>
    </div>
  </footer>
</div> */

fetch('https://www.googleapis.com/youtube/v3/search?key=AIzaSyCAznfTwZKs8R47J-_PkpBrHYaRvcCmKwY&type=video&part=snippet&maxResults=3&q=JAVA') // get Elements result
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








let searchInput = `<form id="search" method="get">
<input type="search" autofocus="autofocus" autocomplete="off" placeholder="Search">
</form>`;

let pointsItem = `<a class="active " href="" title="">1</a>`;

let wrapper = document.createElement('div');

wrapper.id = 'wrapper';
wrapper.innerHTML = `<header>
  <div class="search-bar">
    ${searchInput}
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