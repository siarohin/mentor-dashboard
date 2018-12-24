import 'regenerator-runtime/runtime';
import 'bootstrap';
import $ from 'jquery';

import { GameState, setGameState } from './game';

import Navigation from './components/navigation/navigation';

import './index.css';
import ModalDialog from './components/modal-dialog/modal-dialog';
import Home from './screens/home/home';
import ChoosePlayerName from './screens/choosePlayerName/choosePlayerName';
import ChooseMonsterName from './screens/chooseMonsterName/chooseMonsterName';
import Battle from './screens/battle/battle';
import Cast from './screens/cast/cast';

import { pause } from './utils';


const setPlayerName = async (gameState) => {
  const playerName = await ChoosePlayerName.getNewPlayerName();
  gameState.setPlayer(playerName);
  Navigation.update(gameState);
};

const setMonsterName = async (gameState) => {
  const monsterName = await ChooseMonsterName.getNewMonsterName();
  gameState.setMonster(monsterName);
  Navigation.update(gameState);
};

const getBattleResult = async (gameState) => {
  await setPlayerName(gameState);
  await setMonsterName(gameState);

  Battle.init(gameState);

  // start animation
  await pause(3000);

  await Cast.init();

  // for debug - WIP
  // TODO: need to remove
  // alert('round finished!', chosenCast);
};


const startApp = () => {
  window.$ = $;
  const gameState = new GameState();
  window.gameState = gameState;
  setGameState(gameState);

  Navigation.draw();
  Home.draw();
  Home.play();
  ModalDialog.draw();


  const soundEl = document.querySelector('.nav-sound');
  function playMusicFirst() {
    if (soundEl.classList.contains('sound-off')) {
      Home.stop();
    } else {
      Home.play();
    }
  }

  function playMusicNext() {
    Home.stop();
    ChoosePlayerName.play();
    if (soundEl.classList.contains('sound-off')) {
      ChoosePlayerName.stop();
    }
  }


  $('.nav-sound').on('click', (e) => {
    e.preventDefault();
    playMusicFirst();
  });

  $('.js-start-game').on('click', async () => {
    playMusicNext();

    $('.nav-sound').on('click', (e) => {
      e.preventDefault();
      playMusicNext();
    });

    await getBattleResult(gameState);
  });

  // $('.js-choose-player-name-nav').on('click', async (e) => {
  //   e.preventDefault();

  //   await setPlayerName(gameState);
  // });
};

startApp();
