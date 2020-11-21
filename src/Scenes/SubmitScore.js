import 'phaser';
import config from '../Config/config';
import ScoreBoard from '../ScoreBoard';

export default class SubmitScore extends Phaser.Scene {
  constructor () {
    super('SubmitScore');
  }
   
  init (data) {
    this.score = data;
  }
 
  async create () {
    this.bg = this.add.image(config.width / 2, config.height / 2, 'mainBg').setScale(0.35);
    
    this.loadTxt = this.add.text((config.width / 2) - 40, 100, 'Loading...', {
      font: '20px Arial',
      fill: '#ffffff',
      align: 'center',
      fontStyle: 'bold',
    });
    this.load = this.add.sprite(config.width / 2, 150, 'load').setScale(0.5);
    this.load.play('loadAnim');

    this.scoreBoard = new ScoreBoard;
    this.scores = await this.scoreBoard.getScores();
    this.load.visible  = false;
    this.loadTxt.visible  = false;
    this.subScore = false;
    

    this.scoreShow = this.add.image(config.width / 2, 100, 'scoreShow').setScale(0.5);
    this.scoreTxt = this.add.text((config.width / 2) - 60, 90, `Score: ${this.score}`, {
      font: '16px Arial',
      fill: '#ffffff',
      align: 'center',
      fontStyle: 'bold',
    });
    this.form = this.add.dom(config.width / 2, 350).createFromCache('nameForm');
    this.alertTxt = this.add.text(300, 300, '', {
      font: '20px Arial',
      fill: '#ffffff',
      align: 'center',
      fontStyle: 'bold',
    });
    this.submitBtn = this.add.image(config.width / 2, 450, 'btn').setInteractive();
    this.submitBtn.setScale(0.4);
    this.submitBtn.on('pointerover', () => {
      this.submitBtn.setTexture('btnH');
    });
    this.submitBtn.on('pointerout', () => {
      this.submitBtn.setTexture('btn');
    });
    this.scoreTxt = this.add.text((config.width / 2) - 65, 420, 'Submit', {
      font: '40px Arial',
      fill: '#ffffff',
      align: 'center',
      fontStyle: 'bold',
    });
    this.submitBtn.on('pointerdown', () => {
      const usrInput = document.getElementById('nameField').value;
      const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
      if (this.subScore === true) {
        this.scene.start('Title');
      } else {
        if (usrInput.length < 3) {
          this.alertTxt.setText('The name is too short');
          this.time.delayedCall(1500, () => { this.alertTxt.setText('') });
        } else if (usrInput.length > 12) {
          this.alertTxt.setText('The name is too long');
          this.time.delayedCall(1500, () => { this.alertTxt.setText('') });
        } else if (format.test(usrInput) === true) {
          this.alertTxt.setText("The name can't contain special characters");
          this.time.delayedCall(1500, () => { this.alertTxt.setText('') });
        } else {
          const arr = this.scores.result;
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].user === usrInput) {
              this.alertTxt.setText('Name is taken');
              return this.time.delayedCall(1500, () => { this.alertTxt.setText('') });
            }
          }
          this.submision = this.scoreBoard.submitScore(usrInput, this.score);
          this.alertTxt.setText('Score submitted correctly');
          this.scoreTxt.setText('Menu');
          this.scoreTxt.x += 12;
          this.subScore = true;
        }
      }
    });

  }
}