import imagesLoaded from 'imagesloaded';
import $ from 'jquery';
import template from './index.template';
import './index.css';

imagesLoaded.makeJQueryPlugin($);


const modelPlayer = new Image();
const modelMonster = new Image();
const modelBackground = new Image();
const modelPingMonster = new Image();
const modelFlyMonster = new Image();
const modelBombedSprites = new Image();
modelPlayer.src = '../../images/player.png';
modelMonster.src = '../../images/monster.png';
modelBackground.src = '../../images/vectorcity.png';
modelPingMonster.src = '../../images/ping_monster.png';
modelFlyMonster.src = '../../images/fly-monster.png';
modelBombedSprites.src = '../../images/bombed_sprites.png';

export default class Home {
  static init() {
    this.draw();
    this.readyScene();
  }

  static readyScene() {
    $(modelPlayer,
      modelMonster,
      modelBackground,
      modelPingMonster,
      modelFlyMonster,
      modelBombedSprites)
      .imagesLoaded().always(() => {
        this.drawButton();
      });
  }

  static draw() {
    const contentEl = document.querySelector('#content');
    contentEl.insertAdjacentHTML('beforeend', template);

    $('.home-scene-button').hide();
    $('.model-player').addClass('model-player_jump');
  }

  static drawButton() {
    $('.home-scene-button').show();
  }
}
