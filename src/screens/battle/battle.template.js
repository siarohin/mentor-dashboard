export default `
<section id="battle">
<div class="row battle-scene">

  <div class="col-sm">
    <h2 class="card-title player-name"></h2>
    <div class="player-health"></div>
      <div id="player">
        <div class="player-card js-player-card">
          <div class="card-body model-player__battle">
          </div>
        </div>
      </div>
    </div>
  <div class="col-sm">
    <h2 class="card-title monster-name"></h2>
    <div class="monster-health"></div>
    <div id="monster">
      <div class="monster-card">
        <div class="card-body model-monster__battle">
          <div class="model-monster__battle monster-body random-1"></div>
          <div class="model-monster__battle monster-eyes random-1"></div>
          <div class="model-monster__battle monster-hair random-1"></div>
          <div class="model-monster__battle monster-mouth random-1"></div>
        </div>
      </div>
    </div>
  </div>

</div>
</section>
`;
