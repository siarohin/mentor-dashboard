import uniqueRandomArray from 'unique-random-array';

const monsterClass = ['random-1', 'random-2', 'random-3'];
const monsterBody = uniqueRandomArray(monsterClass);
const monsterEyes = uniqueRandomArray(monsterClass);
const monsterHair = uniqueRandomArray(monsterClass);
const monsterMouth = uniqueRandomArray(monsterClass);

export default `
<section id="battle">
<div class="row battle-scene">
  <div class="col-sm">
    <h2 class="card-title player-name"></h2>
    <div class="progress">
      <div class="player-health progress-bar bg-danger" role="progressbar"></div>
    </div>
    <div id="player">
      <div class="player-card js-player-card">
        <div class="card-body model-player"></div>
      </div>
    </div>
  </div>
  <div class="col-sm">
    <h2 class="card-title monster-name"></h2>
    <div class="progress">
      <div class="monster-health progress-bar bg-danger" role="progressbar"></div>
    </div>
    <div class="model-monster-pregenerate"></div>
    <div id="monster">
      <div class="monster-card">

        <div class="model-monster-bird">
          <div class="model-monster-bird__fly"></div>
        </div>

        <div class="card-body model-monster model-monster_animation">
          <div class="model-monster monster-body ${monsterBody()}"></div>
          <div class="model-monster monster-eyes monster-eyes_top monster-eyes_animation ${monsterEyes()}"></div>
          <div class="model-monster monster-hair ${monsterHair()}"></div>
          <div class="model-monster monster-mouth monster-mouth_top ${monsterMouth()}"></div>
        </div>
      </div>
    </div>
  </div>

</div>
</section>
`;
