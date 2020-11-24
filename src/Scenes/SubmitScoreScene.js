import config from '../Config/config';
import ScoreBoard from '../ScoreBoard';
import { inputValidation } from '../Helpers/GeneralHelper';
import Helper from '../Helpers/GameHelper';


export default class SubmitScore extends Phaser.Scene {
  constructor () {
    super('SubmitScore');
  }
   
  init (data) {
    this.score = data;
  }
 
  async create () {
    // Create needed tools
    this.helper = new Helper(this);
    this.scoreBoard = new ScoreBoard;

    // Display background
    this.bg = this.add.image(config.width / 2, config.height / 2, 'mainBg').setScale(0.35);
    
    // Display loading animation
    this.loadTxt = this.helper.newText((config.width / 2) - 40, 100, 'Loading...');
    this.load = this.add.sprite(config.width / 2, 150, 'load').setScale(0.5);
    this.load.play('loadAnim');

    // Fetch scoreboard and hide loading once is ready
    this.scores = await this.scoreBoard.getScores();
    this.load.visible  = false;
    this.loadTxt.visible  = false;

    this.subScore = false;
    
    // Display user score
    this.scoreShow = this.add.image(config.width / 2, 100, 'scoreShow').setScale(0.5);
    this.scoreTxt = this.helper.newText((config.width / 2) - 60, 90, `Score: ${this.score}`);

    // Display form to submit score
    this.form = this.add.dom(config.width / 2, 350).createFromCache('nameForm');
    this.alertTxt = this.helper.newText(300, 300, '');
    this.submitBtn = this.add.image(config.width / 2, 450, 'btn').setInteractive();
    this.submitBtn.setScale(0.4);
    this.submitTxt = this.helper.newText((config.width / 2) - 65, 420, 'Submit', 40);

    // Submit button interactions
    this.submitBtn.on('pointerover', () => {
      this.submitBtn.setTexture('btnH');
    });
    this.submitBtn.on('pointerout', () => {
      this.submitBtn.setTexture('btn');
    });
    this.submitBtn.on('pointerdown', () => {
      const usrInput = document.getElementById('nameField');
      const validation = inputValidation(usrInput.value, this.scores.result);
      if (this.subScore === true) {
        this.scene.start('Title');
      } else {
        if (validation === 'Your score will be submited shortly, you can return now') {
          this.submision = this.scoreBoard.submitScore(usrInput.value, this.score);
          usrInput.value = '';
          this.alertTxt.setText(validation);
          this.alertTxt.x -= 150;
          this.submitTxt.setText('Menu');
          this.submitTxt.x += 12;
          this.subScore = true;
        } else {
          this.alertTxt.setText(validation);
          this.time.delayedCall(1500, () => { this.alertTxt.setText('') });
        }
      }
    });

  }
}