import 'phaser';

export default class GameHelper extends Phaser.Scene {
  constructor (scene) {
    super(scene);
    this.scene = scene
  }

  spawnReset () {
    const chance = Phaser.Math.Between(1, 100);
    if (chance <= 15) {
      return 600;
    } else if (chance <= 35) {
      return 2200;
    } else if (chance <= 70) {
      return 3000;
    } else {
      return 3500
    }
  }

  populateGroup(group, times, x, y, img, orX, orY, scX, scY, vel, iTimes = false, arrPush = undefined) {
    for (let i = 0; i < times; i++) {
      let element = '';
      if (iTimes === true) {
        element = this.scene.physics.add.image(x * i, y, img);
      } else {
        element = this.scene.physics.add.image(x, y, img);
      }
      element.setOrigin(orX, orY);
      element.setScale(scX, scY);
      element.setVelocityX(vel);
      group.add(element);
      if (arrPush) {
        arrPush.push(element);
      }
    }
  }
}