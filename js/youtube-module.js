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

const HttpClient = function() {
  this.get = function(aUrl, aCallback) {

    let anHttpRequest = new XMLHttpRequest();

    anHttpRequest.onreadystatechange = function() {
      if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
      aCallback(anHttpRequest.responseText);
    }
    
    anHttpRequest.open( "GET", aUrl, true );
    anHttpRequest.send(null);
  }
}

  // let userValue = document.querySelector('input[type=search]').value;
  let userValue = 'JS';

  let Url = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyCAznfTwZKs8R47J-_PkpBrHYaRvcCmKwY&type=video&part=snippet&maxResults=12&q=' + userValue;

  let client = new HttpClient();

  client.get(Url, function(response) { 
    
  let sliderBlock = JSON.parse(response);

// Create Youtube blocks

  for (let i = 0; i < sliderBlock.pageInfo.resultsPerPage; i++) {

    document.querySelector('.slider').innerHTML += `<div class="">
    <img src="${sliderBlock.items[i].snippet.thumbnails.high.url}" alt="">
    <a href="https://www.youtube.com/watch?v=${sliderBlock.items[i].id.videoId}" title="">${sliderBlock.items[i].snippet.title}</a>
    <ul>
      <li>${sliderBlock.items[i].snippet.channelTitle}</li>
      <li>${sliderBlock.items[i].snippet.publishedAt}</li>
      <li></li>
    </ul>
    <p>${sliderBlock.items[i].snippet.description}</p>
    </div>`;

  }

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