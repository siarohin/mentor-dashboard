export default `
<section id="choosePlayerName">
  <div class="card text-white bg-dark mb-3 text-center" style="width: 18rem;">
    <div class="card-header">Please, select name to your hero</div>
    <div class="card-body">
      <form class="js-form">
        <input type="text" class="form-control js-player-name" required="" maxlength="15">
        <button type="submit" class="button btn btn-success">Ok, let's start</button>
      </form>
    </div>
  </div>
</section>
<div class="select-name">
  <div class="model-player__select-name"></div>
</div>
`;
