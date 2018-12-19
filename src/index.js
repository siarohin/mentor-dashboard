import 'regenerator-runtime/runtime';
import 'bootstrap';
import $ from 'jquery';

import { GameState, setGameState } from './game';

import Nav from './components/navigation/navigation';

import './index.css';
import ModalDialog from './components/modal-dialog/modal-dialog';
import Home from './screens/home/home';
import ChoosePlayerName from './screens/choosePlayerName/choosePlayerName';
import Battle from './screens/battle/battle';
import Cast from './screens/cast/cast';

import { pause } from './utils';

const setPlayerName = async (gameState) => {
  const playerName = await ChoosePlayerName.getNewPlayerName();
  gameState.setPlayerName(playerName);

  Nav.update(gameState);
};

const getBattleResult = async (gameState) => {
  await setPlayerName(gameState);

  Battle.draw(gameState);

  // start animation
  await pause(3000);

  const chosenCast = await Cast.getPlayerCast();

  // for debug - WIP
  // TODO: need to remove
  alert('round finished!', chosenCast); // eslint-disable-line no-alert
};


const startApp = () => {
  window.$ = $; // for debug

  const gameState = new GameState();
  window.gameState = gameState; // antipatter - need use carefully!
  setGameState(gameState);

  Nav.draw();
  Home.draw();
  Home.play();
  ModalDialog.draw();

  $('.nav-sound').on('click', (e) => {
    e.preventDefault();
    if (soundEl.classList.contains('sound-off')) {
      Home.stop();
    } else {
      Home.play();
    }
  });

  const soundEl = document.querySelector('.nav-sound');

  $('.js-start-game').on('click', async () => {
    Home.stop();
    ChoosePlayerName.play();
    if (soundEl.classList.contains('sound-off')) {
      ChoosePlayerName.stop();
    }
    $('.nav-sound').on('click', (e) => {
      e.preventDefault();

      if (soundEl.classList.contains('sound-off')) {
        ChoosePlayerName.stop();
      } else {
        Home.stop();
        ChoosePlayerName.play();
      }
    });

    await getBattleResult(gameState);
  });

  $('.js-choose-player-name-nav').on('click', async (e) => {
    e.preventDefault();

    await setPlayerName(gameState);
  });
};

startApp();
