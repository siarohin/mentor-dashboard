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
import Sound from './components/sound/sound';

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
};


const startApp = () => {
  window.$ = $;
  const gameState = new GameState();
  window.gameState = gameState;
  setGameState(gameState);

  Navigation.draw();
  Home.draw();
  Sound.init();
  ModalDialog.draw();

  $('.js-start-game').on('click', async () => {
    Sound.play('second');
    await getBattleResult(gameState);
  });

  // $('.js-choose-player-name-nav').on('click', async (e) => {
  //   e.preventDefault();

  //   await setPlayerName(gameState);
  // });
};

startApp();
