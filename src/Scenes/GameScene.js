import 'phaser';
import config from '../Config/config';
import Player from '../Entities/Player';

export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
  }

  create () {
    this.platform = this.physics.add.staticImage(config.width / 2, config.height + 220, 'sea');

    this.bgSeaGroup = this.add.group();
    for (let i = 0; i < 2; i++) {
      const bgSea = this.physics.add.image(1247.025 * i, config.height, 'sea');
      bgSea.setOrigin(0, 1);
      bgSea.setScale(0.325, 0.325);
      bgSea.setVelocityX(-250);
      this.bgSeaGroup.add(bgSea);
    }
    this.bgCityGroup = this.add.group();
    for (let i = 0; i < 2; i++) {
      const bgCity = this.physics.add.image(801.933 * i, 0, 'city');
      bgCity.setOrigin(0, 0);
      bgCity.setScale(0.209, 0.325);
      bgCity.setVelocityX(-30);
      this.bgCityGroup.add(bgCity);
    }

    this.obs = this.physics.add.image(config.width/2, config.height/2, 'checkedBox');
    this.obs.setVelocityX(-200);
    this.player = new Player(this, 60, config.height - 100, 'run').setScale(0.2, 0.2);
    this.player.body.setGravityY(220);

    this.physics.add.collider(this.player, this.platform);

    this.jumpKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }

  update () {
    this.bgCityGroup.children.iterate(element => {
      if (element.x <= -element.width * 0.209) {
        element.setX(config.width);
      }
    });

    this.bgSeaGroup.children.iterate(element => {
      if (element.x <= -element.width * 0.325) {
        element.setX(800);
      }
    });

    if (this.obs.x < 20) {
      this.obs.setX(config.width + 100);
    }

    if (this.player.body.touching.down) {
      this.player.anims.play('run', true);
      this.player.setData('dJump', true);
    }

    if (this.jumpKey.isDown && this.player.body.touching.down) {
      this.player.body.setVelocityY(-210);
      this.player.anims.play('jump', true);
    }

    if (Phaser.Input.Keyboard.JustDown(this.jumpKey) && this.player.getData('dJump') === true && !this.player.body.touching.down) {
      this.player.setData('dJump', false);
      this.player.anims.stop();
      this.player.anims.play('jump', true);
      this.player.body.setVelocityY(-180);
    }
  }
};