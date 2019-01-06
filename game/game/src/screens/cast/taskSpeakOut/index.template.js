/* eslint-disable max-len */
export default `
<section id="taskSpeakOut">

  <section class="speakOut-preloader">
    Подожди, загружаю аудио...
    <div class="sk-double-bounce">
      <div class="sk-child sk-double-bounce-1"></div>
      <div class="sk-child sk-double-bounce-2"></div>
    </div>
  </section>

  <section class="speakOut-content">
    <div class="js-speakOut d-flex flex-row align-items-center alert alert-warning task-body" role="alert">
      <div class="js-speakOut__description"></div>
      <button class="js-speakOut__audio-button"></button>
    </div>
    <div class="input-group">
      <input type="text" class="form-control input-answer" placeholder="Твой ответ">
      <div class="input-group-append">
        <button class="btn btn-outline-secondary btn-answer" type="button">Проверить</button>
      </div>
    </div>
  </sectiton>

</section>
`;
