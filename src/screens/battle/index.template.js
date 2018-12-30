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
    </div>
  </div>
</div>
</section>
`;