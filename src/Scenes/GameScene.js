import 'phaser';
import config from '../Config/config';

export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
  }

  create () {
    this.obs = this.physics.add.image(config.width/2, config.height/2, 'checkedBox');
    this.obs.setVelocityX(-200);
  }

  update () {
   if (this.obs.x < 20) {
     this.obs.setX(config.width + 100);
   }
  }

  
};