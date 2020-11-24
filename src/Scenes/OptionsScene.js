import Button from '../Objects/Button';
import config from '../Config/config';

export default class OptionsScene extends Phaser.Scene {
  constructor () {
    super('Options');
  }

  create () {
    this.model = this.sys.game.globals.model;
    this.add.image(config.width / 2, config.height / 2, 'bgB');
    this.bgGroup = this.add.group();
    for (let i = 0; i < 2; i++) {
      const bg = this.physics.add.image(config.width / 2, 630 * -i, 'mainBg');
      bg.setOrigin(0.5, 0);
      bg.setScale(0.35);
      bg.setVelocityY(80);
      this.bgGroup.add(bg);
    }

    this.text = this.add.text(300, 100, 'Options', { fontSize: 40 });
    this.musicButton = this.add.image(200, 200, 'mscBtnOn');
    this.musicButton.setScale(0.3);
    this.musicText = this.add.text(250, 190, 'Music Enabled', { fontSize: 24 });

    this.musicButton.setInteractive();

    this.musicButton.on('pointerdown', function () {
      this.model.musicOn = !this.model.musicOn;
      this.updateAudio();
    }.bind(this));

    this.menuButton = new Button(this, 400, 500, 'btn', 'btnH', 'Menu', 'Title');
    this.menuButton.setScale(0.4);

    this.updateAudio();
  }

  update () {
    this.bgGroup.children.iterate(element => {
      if (element.y > config.height) {
        element.setY(-660);
      }
    });
  }

  updateAudio() {
    if (this.model.musicOn === false) {
      this.musicButton.setTexture('mscBtnOff');
      this.sys.game.globals.bgMusic.stop();
      this.model.bgMusicPlaying = false;
    } else {
      this.musicButton.setTexture('mscBtnOn');
      if (this.model.bgMusicPlaying === false) {
        this.sys.game.globals.bgMusic.play();
        this.model.bgMusicPlaying = true;
      }
    }
  }
};