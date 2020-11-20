import 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';

export default class GameOver extends Phaser.Scene {
  constructor () {
    super('GameOver');
  }

  init (data) {
    this.stars = data[0];
    this.points = data[1];
    this.totalScore = (data[0] * 5) + data[1];
  }

  sumScores (points, text, op = 1) {
    let quotient = (Math.floor(points / 12)) * op;
    let times = 11
    let sum = 0;
    const delay = 80;
    if (points < 12) {
      quotient = 1;
      times = points - 1;  
    }
    if (op < 0) {
      sum = points;
    }
    this.time.addEvent({
      delay: delay,
      callback: () => {
        if (points > 0) {
          sum += quotient;
          text.setText(`${sum}`);
        }
      },
      repeat: times,
    });
    this.time.addEvent({
      delay: (delay * times) + delay,
      callback: () => {
        if (op > 0) {
          text.setText(`${points}`);
        } else {
          text.setText('0');
        }
      },
    });
  }

  create () {
    this.bg = this.add.image(config.width / 2, config.height / 2, 'mainBg').setScale(0.35);

    this.gameOver = this.add.image((config.width / 3) - 30, config.height / 2, 'gameOver').setScale(0.7);

    this.showPoints = this.add.image((config.width / 3) - 30, 200, 'scoreShow').setScale(0.7, 0.5);
    this.pointsIcon = this.add.image(170, 200, 'points').setScale(0.4);
    this.scorePoints = this.add.text(210, 190, '0', {
      font: '20px Arial',
      fill: '#ffffff',
      align: 'center',
      fontStyle: 'bold',
    });
    this.time.delayedCall(800, () => { this.sumScores(this.points, this.scorePoints) });
    
    this.showStars = this.add.image((config.width / 3) - 30, 280, 'scoreShow').setScale(0.7, 0.5);
    this.starsIcon = this.add.image(170, 280, 'stars').setScale(0.4);
    this.starPoints = this.add.text(210, 270, '0', {
      font: '20px Arial',
      fill: '#ffffff',
      align: 'center',
      fontStyle: 'bold',
    });
    this.starMult = this.add.text(250, 270, 'X5', {
      font: '20px Arial',
      fill: '#ffffff',
      align: 'center',
      fontStyle: 'bold',
    });
    this.time.delayedCall(2400, () => { this.sumScores(this.stars, this.starPoints) });
    
    this.total = this.add.image((config.width / 3) - 30, 380, 'total').setScale(0.6);
    this.showTotal = this.add.image((config.width / 3) - 30, 450, 'scoreShow').setScale(0.7, 0.5);
    this.scoreTotal = this.add.text(180, 438, '0', {
      font: '20px Arial',
      fill: '#ffffff',
      align: 'center',
      fontStyle: 'bold',
    });
    this.time.delayedCall(4500, () => { this.sumScores(this.totalScore, this.scoreTotal) });
    this.time.delayedCall(4500, () => { this.sumScores(this.stars, this.starPoints, -1) });
    this.time.delayedCall(4500, () => { this.sumScores(this.points, this.scorePoints, -1) });

    this.titleButton = new Button(this, config.width - 150, config.height/2 - 100, 'btn', 'btnH', 'Back to title', 'Title', '45px').setScale(0.4);
    this.ScoresButton = new Button(this, config.width - 150, config.height/2 + 100, 'btn', 'btnH', 'Submit Score', 'Title', '45px').setScale(0.4);
  }
}