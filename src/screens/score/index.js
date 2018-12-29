let playerScore = null;

const initPlayScore = () => {
  if (window.gameState) {
    playerScore = {
      name: window.gameState.playerName,
      result: window.gameState.playerScore,
    };
  }
};


export default class Score {
  static init() {
    const initScore = async () => {
      await initPlayScore();
      await this.setStorage();
    };
    initScore();
  }

  static setStorage() {
    if (localStorage.getItem('bhRODHhb5u2W')) {
      const score = JSON.parse(localStorage.getItem('bhRODHhb5u2W'));
      score.push(playerScore);
      score.sort((left, right) => right.result - left.result);
      if (score.length > 5) {
        score.pop();
      }
      localStorage.setItem('bhRODHhb5u2W', JSON.stringify(score));
    } else {
      localStorage.setItem('bhRODHhb5u2W', JSON.stringify([playerScore]));
    }
  }
}
