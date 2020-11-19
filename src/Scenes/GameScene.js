import 'phaser';
import config from '../Config/config';
import Player from '../Entities/Player';

export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
  }

  hit (player) {
    if (player.getData('isDead') === false) {
      player.anims.play('dead', true);
    }
    player.setData('isDead', true);
  }

  create () {
    this.platform = this.physics.add.staticImage(config.width / 2, config.height + 300, 'sea');
    this.sky = this.add.image(config.width / 2, config.height / 2, 'sky').setScale(0.45);

    this.bgSeaGroup = this.add.group();
    for (let i = 0; i < 3; i++) {
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

    this.enemies = this.add.group();
    for (let i = 0; i < 1; i++) {
      const clob = this.physics.add.sprite(Phaser.Math.Between(2000, 4000), config.height - 85, 'clob');
      clob.setScale(0.15, 0.15);
      clob.setVelocityX(-250);
      this.enemies.add(clob);
    }

    this.player = new Player(this, 60, config.height - 100, 'run').setScale(0.2, 0.2);
    this.player.body.setGravityY(220);
    this.player.body.setSize(110, 400);
    this.player.body.setOffset(180, 50);

    this.physics.add.collider(this.player, this.platform);

    this.jumpKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.physics.add.overlap(this.player, this.enemies, this.hit, null, this);
  }

  update () {
    this.bgCityGroup.children.iterate(element => {
      if (element.x <= -element.width * 0.209) {
        element.setX(config.width);
      }
    });

    this.bgSeaGroup.children.iterate(element => {
      if (element.x <= -(element.width * 0.325)) {
        element.setX(700);
      }
    });

    this.enemies.children.iterate(enemy => {
      if (enemy.x < -20) {
        enemy.setX(Phaser.Math.Between(900, 4000));
      }
    });
    

    if (this.player.body.touching.down && this.player.getData('isDead') === false) {
      this.player.anims.play('run', true);
      this.player.setData('dJump', true);
    }

    if (this.jumpKey.isDown && this.player.body.touching.down && this.player.getData('isDead') === false) {
      this.player.body.setVelocityY(-190);
      this.player.anims.play('jump', true);
    }

    if (Phaser.Input.Keyboard.JustDown(this.jumpKey) && this.player.getData('dJump') === true && !this.player.body.touching.down) {
      this.player.setData('dJump', false);
      this.player.anims.stop();
      this.player.anims.play('jump', true);
      this.player.body.setVelocityY(-170);
    }
  }
};