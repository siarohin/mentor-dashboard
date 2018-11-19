import * as settings from './js/settings';
import * as navigations from './js/navigations';
import * as transform from './js/transform';


/* Delete Slider */
function deleteSlider() {
  document.querySelector('.slider').innerHTML = '';
}


/* Search Result */
function searchResult() {
  // user search phrase
  const searchValue = document.querySelector('form')[0].value;

  // send response to api
  fetch(`https://www.googleapis.com/youtube/v3/search?key=${settings.apiKey}&type=video&part=snippet&maxResults=${settings.MAX_RESULT}&q=${searchValue}`)
    .then(response => response.json())
    .then((sliderBlock) => {
      deleteSlider();

      // reset video id
      settings.youtubeId.length = 0;
      let range;

      // if search result < MAX_RESULT
      if (sliderBlock.pageInfo.totalResults >= settings.MAX_RESULT) {
        range = settings.MAX_RESULT;
      } else if (sliderBlock.pageInfo.totalResults < settings.MAX_RESULT) {
        range = sliderBlock.pageInfo.totalResults;
      }

      for (let i = 0; i < range; i += 1) {
        // save video id
        if (sliderBlock.items[i].id.videoId) {
          settings.youtubeId.push(sliderBlock.items[i].id.videoId);
        }

        // create blocks
        document.querySelector('.slider').innerHTML += `<div id="${settings.youtubeId[i]}">
      <img src="${sliderBlock.items[i].snippet.thumbnails.high.url}" alt="">
      <a href="//www.youtube.com/watch?v=${sliderBlock.items[i].id.videoId}" target="_blank" title="${sliderBlock.items[i].snippet.title}">${sliderBlock.items[i].snippet.title}</a>
      <ul>
        <li>${sliderBlock.items[i].snippet.channelTitle}</li>
        <li>${sliderBlock.items[i].snippet.publishedAt.substring(0, 10)}</li>
      </ul>
      <p>${sliderBlock.items[i].snippet.description}</p>
      </div>`;
      }

      fetch(`https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCAznfTwZKs8R47J-_PkpBrHYaRvcCmKwY&id=${[...settings.youtubeId]}&part=snippet,statistics`)
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

      navigations.generate();
      transform.clickNavigation();
      transform.clickSlider();
      transform.touchSlider();

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
    if (!form[0].value.match(/^[=!а-яА-ЯёЁa-zA-Z0-9-+ ]+$/)) {
      document.querySelector('.search-bar').classList.add('search-bar__error');
    } else {
      document.querySelector('.search-bar').classList.remove('search-bar__error');
      searchResult();
    }
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
    navigations.generate();
    navigations.dotted();
  }
};
