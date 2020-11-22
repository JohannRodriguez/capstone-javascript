import 'phaser';

export default class GameHelper extends Phaser.Scene {
  constructor (scene) {
    super(scene);
    this.scene = scene
  }

  populateGroup(group, times, x, y, img, orX, orY, sc, vel) {
    for (let i = 0; i < times; i++) {
      const bgSea = this.scene.physics.add.image(x, y, img);
      bgSea.setOrigin(orX, orY);
      bgSea.setScale(sc);
      bgSea.setVelocityX(vel);
      group.add(bgSea);
    }
  }
}