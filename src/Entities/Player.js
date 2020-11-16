import Entity from './Entity';

export default class Player extends Entity {
    constructor (scene, x, y, key) {
      super(scene, x, y, key, 'player');
      this.setData('speed', 300);
      this.setData('health', 3);
      this.setData('score', 0);
    }

    moveUp() {
      this.body.velocity.y = -this.getData('speed');
      this.anims.play('playerBack', true);
    }
  
    moveDown() {
      this.body.velocity.y = this.getData('speed');
      this.anims.play('playerFront', true);
    }
  
    moveLeft() {
      this.body.velocity.x = -this.getData('speed');
      this.anims.play('playerLeft', true);
    }
  
    moveRight() {
      this.body.velocity.x = this.getData('speed');
      this.anims.play('playerRight', true);
    }
  
    update () {
      this.body.setVelocity(0, 0);
      this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width);
      this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height);
    }
  }