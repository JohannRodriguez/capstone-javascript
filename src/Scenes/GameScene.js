import 'phaser';
import config from '../Config/config';
import Player from '../Entities/Player';
import Helper from '../Helpers/GeneralHelper';

export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
  }

  stopMovement(parents) {
    for (let i = 0; i < parents.length; i++) {
      parents[i].children.iterate(element => {
        element.setVelocityX(0);
      });
    }
  }

  starReset(star, player, picked = true) {
    if (player.getData('isDead') === false) {
      if (picked === true) {
        star.body.enable = false;
        player.setData('stars', (player.getData('stars') + 1));
        this.starsPoints.setText(`${player.getData('stars')}`);
      }
      star.setX(Phaser.Math.Between(800, 5000));
      star.setY(Phaser.Math.Between(350, 500));
      star.body.reset(star.x, star.y);
      star.body.enable = true;
      star.body.setVelocityX(-250);
    }
  }

  hit (player) {
    if (player.getData('isDead') === false) {
      player.anims.play('dead', true);
      player.body.setVelocityX(250);
      player.body.setAccelerationX(-120);
      this.starsGroup.children.iterate(star => {
        star.body.setVelocityX(-80);
      })
      this.time.addEvent({
        delay: 2100,
        callback: () => {
          player.body.setAccelerationX(0);
          player.body.setVelocityX(0);
        }
      });
      this.stopMovement([this.enemies, this.bgSeaGroup, this.bgCityGroup]);
      this.time.addEvent({
        delay: 4500,
        callback: () => {
          this.scene.start('GameOver', [this.player.getData('stars'),this.player.getData('points')]);
        }
      });
    }
    player.setData('isDead', true);
  }

  create () {
    // Create needed tools
    this.helper = new Helper(this);

    // Display background
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


    this.enemyHold = [];
    this.activeEnemies = 0;

    this.pointsContainer = this.add.image(10, 10, 'scoreContainer').setOrigin(0, 0);
    this.pointsContainer.setScale(0.5);
    this.pointsIcon = this.add.image(25, 30, 'points');
    this.pointsIcon.setScale(0.4);
    this.starsContainer = this.add.image(config.width - 10, 10, 'scoreContainer').setOrigin(1, 0);
    this.starsContainer.setScale(0.5);
    this.starsIcon = this.add.image(config.width - 140, 30, 'stars');
    this.starsIcon.setScale(0.4);
    this.starsPoints = this.add.text(config.width - 110, 19, '0', {
      font: '20px Arial',
      fill: '#ffffff',
      align: 'center',
      fontStyle: 'bold',
    });
    this.scorePoints = this.add.text(60, 19, '0', {
      font: '20px Arial',
      fill: '#ffffff',
      align: 'center',
      fontStyle: 'bold',
    });

    // Create enemies
    this.enemies = this.add.group();
    for (let i = 0; i < 2; i++) {
      const clobKing = this.physics.add.sprite(config.width + 100, config.height - 85, 'kingClob');
      clobKing.setScale(0.14, 0.14);
      this.enemies.add(clobKing);
      this.enemyHold.push(clobKing);
    }
    for (let i = 0; i < 3; i++) {
      const clob = this.physics.add.sprite(config.width + 100, config.height - 85, 'clob');
      clob.setScale(0.14, 0.14);
      this.enemies.add(clob);
      this.enemyHold.push(clob);
    }

    // Create stars
    this.starsGroup = this.add.group();
    for (let i = 0; i < 3; i++) {
      const star = this.physics.add.sprite(Phaser.Math.Between(2000, 6000), Phaser.Math.Between(350, 500), 'star');
      star.setScale(0.14, 0.14);
      star.setVelocityX(-250);
      this.starsGroup.add(star);
    }

    // Create player
    this.player = new Player(this, 60, config.height - 100, 'run').setScale(0.2, 0.2);
    
    // Enemies respawn
    this.time.addEvent({
      delay: Phaser.Math.Between(2000, 3300),
      callback: () => {
        if (this.player.getData('isDead') === false) {
          const num = Math.floor(Math.random() * (this.enemyHold.length - this.activeEnemies));
          const enemy = this.enemyHold[num];
          enemy.setVelocityX(-250);
          this.activeEnemies += 1;
          this.enemyHold.push(this.enemyHold.splice(this.enemyHold.indexOf(enemy), 1)[0]);
        }
      },
      loop: true,
    });

    // Acumulate points over time
    this.time.addEvent({
      delay: 300,
      callback: () => {
        if (this.player.getData('isDead') === false) {
          this.player.setData('points', (this.player.getData('points') + 1));
          this.scorePoints.setText(`${this.player.getData('points')}`);
        }
      },
      loop: true,
    });

    this.physics.add.collider(this.player, this.platform);
    this.physics.add.overlap(this.player, this.enemies, this.hit, null, this);
    this.physics.add.overlap(this.starsGroup, this.player, this.starReset, null, this);

    this.jumpKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

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
      if (enemy.x < -100) {
        enemy.setVelocityX(0);
        enemy.setX(config.width + 10 + (enemy.width * 0.14));
        this.activeEnemies -= 1;
      }
    });

    this.starsGroup.children.iterate(star => {
      if (star.x < - 50) {
        this.starReset(star, this.player, false);
      }
    });

    if (this.player.body.onFloor() && this.player.getData('isDead') === false) {
      this.player.anims.play('run', true);
      this.player.setData('dJump', true);
    }

    if (this.jumpKey.isDown && this.player.body.onFloor() && this.player.getData('isDead') === false) {
      this.player.body.setVelocityY(-190);
      this.player.anims.play('jump', true);
    }

    if (Phaser.Input.Keyboard.JustDown(this.jumpKey) && this.player.getData('dJump') === true && !this.player.body.onFloor() && this.player.getData('isDead') === false) {
      this.player.setData('dJump', false);
      this.player.anims.stop();
      this.player.anims.play('jump', true);
      this.player.body.setVelocityY(-170);
    }
  }
};