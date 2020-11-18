import 'phaser';
import config from '../Config/config';

export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
  }

  moveBg () {
    this.time.addEvent({
      delay: 32080,
      callback: () => {
        this.bgCity2.setX(config.width);
      },
      loop: true,
    })
  }

  create () {
    this.platform = this.physics.add.staticImage(config.width / 2, config.height + 300, 'sea');

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
    this.player = this.physics.add.sprite(60, config.height - 100, 'run1').play('run');
    this.player.setScale(0.2, 0.2);
    this.player.body.setGravityY(300);

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
        element.setX(1000);
      }
    });

   if (this.obs.x < 20) {
     this.obs.setX(config.width + 100);
   }

   if (this.jumpKey.isDown && this.player.body.touching.down) {
     this.player.setVelocityY(-220);
   }
  }
};