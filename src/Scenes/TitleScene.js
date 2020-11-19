import 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';

export default class TitleScene extends Phaser.Scene {
  constructor () {
    super('Title');
  }

  create () {
    // Background
    this.add.image(config.width / 2, config.height / 2, 'bgB');
    this.bgGroup = this.add.group();
    for (let i = 0; i < 2; i++) {
      const bg = this.physics.add.image(config.width / 2, 630 * -i, 'mainBg');
      bg.setOrigin(0.5, 0);
      bg.setScale(0.35);
      bg.setVelocityY(80);
      this.bgGroup.add(bg);
    }

    // Game
    this.gameButton = new Button(this, config.width/2, config.height/2 - 100, 'btn', 'btnH', 'New Game', 'Game');
    this.gameButton.setScale(0.4);

    // Options
    this.optionsButton = new Button(this, config.width/2, config.height/2, 'btn', 'btnH', 'Options', 'Options');
    this.optionsButton.setScale(0.4);

    // Credits
    this.creditsButton = new Button(this, config.width/2, config.height/2 + 100, 'btn', 'btnH', 'Credits', 'Credits');
    this.creditsButton.setScale(0.4);

    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }

  update () {
    this.bgGroup.children.iterate(element => {
      if (element.y > config.height) {
        element.setY(-660);
      }
    });
  }

  centerButton (gameObject, offset = 0) {
    Phaser.Display.Align.In.Center(
      gameObject,
      this.add.zone(config.width/2, config.height/2 - offset * 100, config.width, config.height)
    );
  }

  centerButtonText (gameText, gameButton) {
    Phaser.Display.Align.In.Center(
      gameText,
      gameButton
    );
  }
};
