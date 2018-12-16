export default `
<nav class="navbar navbar-expand-md navbar-dark bg-dark">
  <div class="collapse navbar-collapse" id="navbarsExampleDefault">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <a class="nav-link" href="#">Landing</a>
      </li>

      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Settings</a>
        <div class="dropdown-menu" aria-labelledby="dropdown01">
          <button type="button" class="dropdown-item  btn btn-primary js-choose-player-name-nav">Select name</button>
          <a class="dropdown-item" href="#">Another action</a>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
    </ul>
    <div class="js-show-player-name js-choose-player-name-nav"></div>
  </div>
</nav>
`;
