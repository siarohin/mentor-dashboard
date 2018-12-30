export class GameState {
  constructor() {
    this.playerName = '';
    this.playerHealth = '';
    this.playerScore = 0;
  }

  setPlayer(name = '', playerHealth = 100) {
    this.playerName = name;
    this.playerHealth = playerHealth;
  }

  getScore(score = 0) {
    this.playerScore = score;
  }
}

let gameState = null;

export const setGameState = (state) => {
  gameState = state;
};

export const getGameState = () => gameState;
