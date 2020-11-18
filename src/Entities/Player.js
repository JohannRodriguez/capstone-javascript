import Entity from './Entity';

export default class Player extends Entity {
    constructor (scene, x, y, key) {
      super(scene, x, y, key, 'player');
      this.setData('score', 0);
      this.setData('dJump', true)
      this.play('run');
    }
  }