/* eslint-disable max-len */
export default `
<div class="home-scene home-scene_flex home-scene_move">
  <section id="choosePlayerName">
    <div class="card text-white bg-dark mb-3 text-center" style="width: 18rem;">
      <div class="card-header">Введи свое имя</div>
      <div class="card-body">
        <form class="js-form">
          <input type="text" class="form-control js-player-name" required="" maxlength="15">
          <button type="submit" class="button btn btn-success js-form__button">Готово</button>
        </form>
      </div>
    </div>
    <div class="model-player model-player_run"></div>
  </section>
</div>
`;
