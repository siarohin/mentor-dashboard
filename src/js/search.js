import * as settings from './settings';
import * as navigations from './navigations';
import * as sliders from './sliders';
import * as transform from './transform';


/* Search Result */
export function searchResult() {
  // user search phrase
  const searchValue = document.querySelector('form')[0].value;

  // send response to api
  fetch(`${settings.url}/search?key=${settings.apiKey}&type=video&part=snippet&maxResults=${settings.MAX_RESULT}&q=${searchValue}`)
    .then(response => response.json())
    .then((sliderBlock) => {
      sliders.remove();

      // reset video id
      settings.youtube.length = 0;

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
          settings.youtube.push(sliderBlock.items[i].id.videoId);
        }

        // create blocks
        document.querySelector('.slider').innerHTML += `<div id="${settings.youtube[i]}">
      <img src="${sliderBlock.items[i].snippet.thumbnails.high.url}" alt="">
      <a href="//www.youtube.com/watch?v=${sliderBlock.items[i].id.videoId}" target="_blank" title="${sliderBlock.items[i].snippet.title}">${sliderBlock.items[i].snippet.title}</a>
      <ul>
        <li>${sliderBlock.items[i].snippet.channelTitle}</li>
        <li>${sliderBlock.items[i].snippet.publishedAt.substring(0, 10)}</li>
      </ul>
      <p>${sliderBlock.items[i].snippet.description}</p>
      </div>`;
      }

      fetch(`${settings.url}/videos?key=${settings.apiKey}&id=${[...settings.youtube]}&part=snippet,statistics`)
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
export function listen() {
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
