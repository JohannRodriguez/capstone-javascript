import 'phaser';

export default class PreloaderScene extends Phaser.Scene {
  constructor () {
    super('Preloader');
  }

  init () {
    this.readyCount = 0;
  }

  async preload () {
				if (game.sound.context.state === 'suspended') {
					game.sound.context.resume();
				}
    // display progress bar
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);

    var assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    assetText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on('progress', function (value) {
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    // update file progress text
    this.load.on('fileprogress', function (file) {
      assetText.setText('Loading asset: ' + file.key);
    });

    // remove progress bar when complete
    this.load.on('complete', function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    }.bind(this));

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    // load ui
    this.load.image('blueButton1', '/src/assets/ui/blue_button02.png');
    this.load.image('blueButton2', '/src/assets/ui/blue_button03.png');
    this.load.image('phaserLogo', '/src/assets/logo.png');
    this.load.image('box', '/src/assets/ui/grey_box.png');
    this.load.image('checkedBox', '/src/assets/ui/blue_boxCheckmark.png');

    // load background
    this.load.image('city', '/src/assets/background/glowing_city.png');
    this.load.image('sea', '/src/assets/background/water_reflection.png')

    // load audio
    this.load.audio('bgMusic', ['/src/assets/music.mp3']);

    // load main character
    this.load.image('run1', '/src/assets/character/Run (1).png');
    this.load.image('run2', '/src/assets/character/Run (2).png');
    this.load.image('run3', '/src/assets/character/Run (3).png');
    this.load.image('run4', '/src/assets/character/Run (4).png');
    this.load.image('run5', '/src/assets/character/Run (5).png');
    this.load.image('run6', '/src/assets/character/Run (6).png');
    this.load.image('run7', '/src/assets/character/Run (7).png');
    this.load.image('run8', '/src/assets/character/Run (8).png');
    this.load.image('run9', '/src/assets/character/Run (9).png');
    this.load.image('run10', '/src/assets/character/Run (10).png');
    this.load.image('run11', '/src/assets/character/Run (11).png');
    this.load.image('run12', '/src/assets/character/Run (12).png');
    this.load.image('run13', '/src/assets/character/Run (13).png');
    this.load.image('run14', '/src/assets/character/Run (14).png');
    this.load.image('run15', '/src/assets/character/Run (15).png');
    this.load.image('run16', '/src/assets/character/Run (16).png');
    this.load.image('run17', '/src/assets/character/Run (17).png');
    this.load.image('run18', '/src/assets/character/Run (18).png');
    this.load.image('run19', '/src/assets/character/Run (19).png');
    this.load.image('run20', '/src/assets/character/Run (20).png');
    this.load.image('jump1', '/src/assets/character/Jump (1).png');
    this.load.image('jump2', '/src/assets/character/Jump (2).png');
    this.load.image('jump3', '/src/assets/character/Jump (3).png');
    this.load.image('jump4', '/src/assets/character/Jump (4).png');
    this.load.image('jump5', '/src/assets/character/Jump (5).png');
    this.load.image('jump6', '/src/assets/character/Jump (6).png');
    this.load.image('jump7', '/src/assets/character/Jump (7).png');
    this.load.image('jump8', '/src/assets/character/Jump (8).png');
    this.load.image('jump9', '/src/assets/character/Jump (9).png');
    this.load.image('jump10', '/src/assets/character/Jump (10).png');
    this.load.image('jump11', '/src/assets/character/Jump (12).png');
    this.load.image('jump12', '/src/assets/character/Jump (12).png');
    this.load.image('jump13', '/src/assets/character/Jump (13).png');
    this.load.image('jump14', '/src/assets/character/Jump (14).png');
    this.load.image('jump15', '/src/assets/character/Jump (15).png');
    this.load.image('jump16', '/src/assets/character/Jump (16).png');
    this.load.image('jump17', '/src/assets/character/Jump (17).png');
    this.load.image('jump18', '/src/assets/character/Jump (18).png');
    this.load.image('jump19', '/src/assets/character/Jump (19).png');
    this.load.image('jump20', '/src/assets/character/Jump (20).png');
    this.load.image('jump21', '/src/assets/character/Jump (21).png');
    this.load.image('jump22', '/src/assets/character/Jump (22).png');
    this.load.image('jump23', '/src/assets/character/Jump (23).png');
    this.load.image('jump24', '/src/assets/character/Jump (24).png');
    this.load.image('jump25', '/src/assets/character/Jump (25).png');
    this.load.image('jump26', '/src/assets/character/Jump (26).png');
    this.load.image('jump27', '/src/assets/character/Jump (27).png');
    this.load.image('jump28', '/src/assets/character/Jump (28).png');
    this.load.image('jump29', '/src/assets/character/Jump (29).png');
    this.load.image('jump30', '/src/assets/character/Jump (30).png');
   

  }

  create () {
    this.anims.create({
      key: 'run',
      frames: [
          { key: 'run1' },
          { key: 'run2' },
          { key: 'run3' },
          { key: 'run4' },
          { key: 'run5' },
          { key: 'run6' },
          { key: 'run7' },
          { key: 'run8' },
          { key: 'run9' },
          { key: 'run10' },
          { key: 'run11' },
          { key: 'run12' },
          { key: 'run13' },
          { key: 'run14' },
          { key: 'run15' },
          { key: 'run17' },
          { key: 'run18' },
          { key: 'run19' },
          { key: 'run20' }
      ],
      frameRate: 30,
      repeat: -1
    });
    this.anims.create({
      key: 'jump',
      frames: [
          { key: 'jump1' },
          { key: 'jump2' },
          { key: 'jump3' },
          { key: 'jump4' },
          { key: 'jump5' },
          { key: 'jump6' },
          { key: 'jump7' },
          { key: 'jump8' },
          { key: 'jump9' },
          { key: 'jump10' },
          { key: 'jump11' },
          { key: 'jump12' },
          { key: 'jump13' },
          { key: 'jump14' },
          { key: 'jump15' },
          { key: 'jump17' },
          { key: 'jump18' },
          { key: 'jump19' },
          { key: 'jump20' },
          { key: 'jump21' },
          { key: 'jump22' },
          { key: 'jump23' },
          { key: 'jump24' },
          { key: 'jump25' },
          { key: 'jump26' },
          { key: 'jump27' },
          { key: 'jump28' },
          { key: 'jump29' },
          { key: 'jump30' }
      ],
      frameRate: 40,
      repeat: 1
    });
  }

  ready () {
    this.scene.start('Title');
    this.readyCount++;
    if (this.readyCount === 2) {
      this.scene.start('Title');
    }
  }
};
