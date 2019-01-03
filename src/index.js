/* eslint-disable import/no-cycle */
import 'regenerator-runtime/runtime';
import 'bootstrap';
import $ from 'jquery';
import { GameState, setGameState } from './utils/game';
import Navigation from './components/navigation';
import './index.css';
import ModalDialog from './components/modal-dialog';
import Home from './screens/home';
import ChoosePlayerName from './screens/choosePlayerName';
import Battle from './screens/battle';
import Cast from './screens/cast';
import Sound from './components/sound';
import { pause } from './utils/utils';


const setPlayerName = async (gameState) => {
  const playerName = await ChoosePlayerName.getNewPlayerName();
  gameState.setPlayer(playerName);
  Navigation.update(gameState);
};

const getBattleResult = async (gameState) => {
  await setPlayerName(gameState);
  Battle.init(gameState);
  await pause(3000);
  await Cast.init();
};

const startApp = () => {
  const gameState = new GameState();
  window.gameState = gameState;
  setGameState(gameState);
  Navigation.draw();
  Home.init();
  Sound.init();
  ModalDialog.draw();

  $('.js-start-game').on('click', async (e) => {
    e.preventDefault();

    Sound.play('second');
    await getBattleResult(gameState);
  });
};

window.onload = () => {
  $('.preload').hide();
};

startApp();

export default startApp;
