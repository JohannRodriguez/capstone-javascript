export default class GameHelper extends Phaser.Scene {
  constructor(scene) {
    super(scene);
    this.scene = scene;
  }

  stopMovement(parents) {
    // Stop Background when player dies
    for (let i = 0; i < parents.length; i += 1) {
      parents[i].children.iterate(element => {
        element.setVelocityX(0);
      });
    }
  }

  newText(width, height, text, font = 20) {
    return this.scene.add.text(width, height, text, {
      font: `${font}px Arial`,
      fill: '#ffffff',
      align: 'center',
      fontStyle: 'bold',
    });
  }

  populateGroup(group, times, x, y, img, orX, orY, scX, scY, vel, iTimes = false, arrPush = null) {
    for (let i = 0; i < times; i += 1) {
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