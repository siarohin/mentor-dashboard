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

let searchInput = `<input type="search" id="site-search" name="search-name" autofocus="autofocus" autocomplete="off" placeholder="Search" aria-label="Search through youtube">`;

let sliderBlock = `<div class="">
<img src="./images/hqdefault.jpg" alt="">
<a href="" title="">RS School. JavaScript Modules</a>
<ul>
  <li>Lorem ipsum dolor sit, amet consectetur</li>
  <li>24-07-2018</li>
  <li>1205300</li>
</ul>
<p>NodeJS has a really great amount of 3rd party libraries. Anything you can imagine, you can find it in NPM. But the grammar of JavaScript sucks, which make it really hard to maintain a large scale NodeJS application.</p>
</div>`;

let pointsItem = `<a class="active " href="" title="">1</a>`;

let wrapper = document.createElement('div');

wrapper.id = 'wrapper';
wrapper.innerHTML = `<header>
  <div class="search-bar">
  <form action="" method="post">
    ${searchInput}
  </form>
  </div>
</header>
<div class="content">
  <div class="slider">
    ${sliderBlock}
  </div>
</div>
<footer>
  <div class="points">
    ${pointsItem}
  </div>
</footer>`;

document.body.prepend(wrapper);