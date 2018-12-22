export class GameState {
  constructor() {
    this.playerName = '';
    this.playerHealth = '';
    this.monsterHealth = '';
  }

  setPlayer(name = '', playerHealth = 100) {
    this.playerName = name;
    this.playerHealth = playerHealth;
  }

  setMonster(name = '', monsterHealth = 100) {
    this.monsterName = name;
    this.monsterHealth = monsterHealth;
  }
}

let gameState = null;

export const setGameState = (state) => {
  gameState = state;
};

export const getGameState = () => gameState;
