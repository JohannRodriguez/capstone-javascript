import 'phaser';

export default class Helper {
  constructor (scene) {
    this.scene = scene
  }

  newText(width, height, text, font = 20) {
    return this.scene.add.text(width, height, text, {
        font: `${font}px Arial`,
        fill: '#ffffff',
        align: 'center',
        fontStyle: 'bold',
    });
  }
}