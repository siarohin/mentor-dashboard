import $ from 'jquery';
import { pause } from '../../../utils';

class PlayerWin {
  static init() {
    const showAnimation = async () => {
      $('.model-monster-pregenerate').addClass('model-monster-pregenerate_bombed');

      await (pause(300));
      $('.model-monster').hide();

      await (pause(300));
      $('.model-monster-pregenerate').removeClass('model-monster-pregenerate_bombed');

      await (pause(100));
      $('.model-monster-pregenerate').addClass('model-monster-pregenerate_bombed');

      await (pause(100));
      $('.model-monster-bird').hide();

      await (pause(1000));
      $('.model-player').removeClass('model-player_wait');
      $('.model-player').addClass('model-player_jump');
      $('.model-player').removeClass('model-player_animation');

      await (pause(3000));
      $('.model-player').removeClass('model-player_jump');
      console.log('We gonna do something');
    };
    showAnimation();
  }
}

export default PlayerWin;
