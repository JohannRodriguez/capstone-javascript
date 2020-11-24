import Entity from './Entity';

export default class Player extends Entity {
  constructor (scene, x, y, key) {
    super(scene, x, y, key, 'player');
    this.setData('score', 0);
    this.setData('dJump', true);
    this.setData('stars', 0);
    this.setData('points', 0);
    this.play('run');
    this.body.setGravityY(220);
    this.body.setSize(110, 400);
    this.body.setOffset(180, 50);
  }
}