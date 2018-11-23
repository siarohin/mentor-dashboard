import * as settings from './settings';
import * as navigations from './navigations';
// eslint-disable-next-line import/no-cycle
import * as transform from './transform';


/* Search Result */
export function render() {
  const next = settings.nextToken;
  const nextPage = next[next.length - 1];

  // user search phrase
  const searchValue = document.querySelector('form')[0].value;

  // send response to api
  fetch(`${settings.url}/search?key=${settings.apiKey}&type=video&part=snippet&maxResults=${settings.MAX_RESULT}&pageToken=${nextPage}&q=${searchValue}`)
    .then(response => response.json())

    .then((sliderBlock) => {
      let range;

      // temporary id storage for the current request
      const temporaryIdStorage = [];
      settings.nextToken.push(sliderBlock.nextPageToken);


      // if search result != MAX_RESULT
      if (sliderBlock.pageInfo.totalResults >= settings.MAX_RESULT) {
        range = settings.MAX_RESULT;
      } else {
        range = sliderBlock.pageInfo.totalResults;
      }

      for (let i = 0; i < range; i += 1) {
        if (sliderBlock.items[i].id.videoId) {
          settings.idStorage.push(sliderBlock.items[i].id.videoId);
          temporaryIdStorage.push(sliderBlock.items[i].id.videoId);
        }
      }


      fetch(`${settings.url}/videos?key=${settings.apiKey}&id=${[...temporaryIdStorage]}&part=snippet,statistics`)
        .then(res => res.json())
        .then((reviewCount) => {
          for (let i = 0; i < range; i += 1) {
            // create blocks
            document.querySelector('.slider').innerHTML += `<div id="${sliderBlock.items[i].id.videoId}">
        <img src="${sliderBlock.items[i].snippet.thumbnails.high.url}" alt="">
        <a href="//www.youtube.com/watch?v=${sliderBlock.items[i].id.videoId}" target="_blank" title="${sliderBlock.items[i].snippet.title}">${sliderBlock.items[i].snippet.title}</a>
        <ul>
          <li>${sliderBlock.items[i].snippet.channelTitle}</li>
          <li>${sliderBlock.items[i].snippet.publishedAt.substring(0, 10)}</li>
          <li>${reviewCount.items[i].statistics.viewCount}</li>
        </ul>
        <p>${sliderBlock.items[i].snippet.description}</p>
        </div>`;
          }

          // clear temporary storage after we used render
          // id saved in the settings.idStorage --> using in navigation etc.
          temporaryIdStorage.length = 0;

          navigations.generate();
          transform.clickNavigation();
          transform.clickSlider();
          transform.touchSlider();
          navigations.dotted();
        });
    });
}


/* Delete Slider */
export const remove = () => {
  document.querySelector('.slider').innerHTML = '';
};
