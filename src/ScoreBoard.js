export default class ScoreBoard {
  constructor() {
    this.key = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/5lEO0b8qNPXwMWWCwsKz/scores/';
  }

  async getScores() {
    const data = await fetch(this.key, { mode: 'cors' });
    return data.json();
  }

  async submitScore(user, score) {
    const object = { user, score };
    const response = await fetch(this.key, {
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify(object),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  }
}