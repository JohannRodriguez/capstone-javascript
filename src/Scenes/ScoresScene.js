import config from '../Config/config';
import Button from '../Objects/Button';
import ScoreBoard from '../ScoreBoard';

export default class ScoresScene extends Phaser.Scene {
  constructor () {
    super('Scores');
  }

  async create () {
    this.add.image(config.width / 2, config.height / 2, 'bgB');
    this.bgGroup = this.add.group();
    for (let i = 0; i < 2; i++) {
      const bg = this.physics.add.image(config.width / 2, 630 * i, 'mainBg');
      bg.setOrigin(0.5, 0);
      bg.setScale(0.35);
      bg.setVelocityY(-80);
      this.bgGroup.add(bg);
    }

    // Loading
    this.loadTxt = this.add.text((config.width / 2) - 40, 100, 'Loading...', {
      font: '20px Arial',
      fill: '#ffffff',
      align: 'center',
      fontStyle: 'bold',
    });
    this.load = this.add.sprite(config.width / 2, 150, 'load').setScale(0.5);
    this.load.play('loadAnim');

    // Fetch ScoreBoard
    this.scoreBoard = new ScoreBoard;
    this.scores = await this.scoreBoard.getScores();
    this.load.visible  = false;
    this.loadTxt.visible  = false;

    this.Txt = this.add.text((config.width / 2) - 115, 50, 'High Scores:', {
      font: '40px Arial',
      fill: '#ffffff',
      align: 'center',
      fontStyle: 'bold',
    });
    this.sortedArr = this.scores.result.sort((a, b) => {
      if (a.score < b.score) {
        return 1;
      }
      if (a.score > b.score) {
        return -1;
      }
      return 0;
    });

    // Show Scores
    this.i = 0;
      this.time.addEvent({
        delay: 400,
        callback: () => {
          if (this.sortedArr[this.i]) {
            this.userTxt = this.add.text((config.width / 2) - 150, (35 * this.i) + 120, (this.i + 1) + '-', {
              font: '20px Arial',
              fill: '#ffffff',
              align: 'center',
              fontStyle: 'bold',
            });
            this.userTxt = this.add.text((config.width / 2) - 100, (35 * this.i) + 120, this.sortedArr[this.i].user, {
              font: '20px Arial',
              fill: '#ffffff',
              align: 'center',
              fontStyle: 'bold',
            });
            this.scoreTxt = this.add.text((config.width / 2) + 70, (35 * this.i) + 120, this.sortedArr[this.i].score, {
              font: '20px Arial',
              fill: '#ffffff',
              align: 'center',
              fontStyle: 'bold',
            });
          }
          this.i++;
        },
        repeat: 9,
      });
    

    // Title button
    this.scoreButton = new Button(this, config.width/2, config.height/2 + 250, 'btn', 'btnH', 'Menu', 'Title');
    this.scoreButton.setScale(0.4);
  }
  update () {
    this.bgGroup.children.iterate(element => {
      if (element.y < -config.height) {
        element.setY(660);
      }
    });
  }
}