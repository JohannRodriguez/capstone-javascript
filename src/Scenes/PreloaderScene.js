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
    this.load.image('btn', '/src/assets/ui/normal_btn.png');
    this.load.image('btnH', '/src/assets/ui/hover_btn.png');
    this.load.image('mscBtnOn', '/src/assets/ui/music_on_btn.png');
    this.load.image('mscBtnOff', '/src/assets/ui/music_off_btn.png');
    this.load.image('pause', '/src/assets/ui/pause_menu.png');
    this.load.image('gameOver', '/src/assets/ui/game_over.png');
    this.load.image('points', '/src/assets/ui/points.png');
    this.load.image('scoreContainer', '/src/assets/ui/score_container.png');
    this.load.image('scoreShow', '/src/assets/ui/score_show.png');
    this.load.image('stars', '/src/assets/ui/stars.png');
    this.load.image('total', '/src/assets/ui/total.png');

    // load background
    this.load.image('city', '/src/assets/background/glowing_city.png');
    this.load.image('sea', '/src/assets/background/water_reflection.png');
    this.load.image('sky', '/src/assets/background/space.png');
    this.load.image('mainBg', '/src/assets/background/game_bg.png');
    this.load.image('bgB', '/src/assets/background/BG_back.png');

    // load audio
    this.load.audio('bgMusic', ['/src/assets/music.mp3']);

    // load enemies
    this.load.image('clob', '/src/assets/enemies/clob.png');
    this.load.image('kingClob', '/src/assets/enemies/king_clob.png');
    this.load.image('star', '/src/assets/collectables/star.png')

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
    this.load.image('dead1', '/src/assets/character/Dead (1).png');
    this.load.image('dead2', '/src/assets/character/Dead (2).png');
    this.load.image('dead3', '/src/assets/character/Dead (3).png');
    this.load.image('dead4', '/src/assets/character/Dead (4).png');
    this.load.image('dead5', '/src/assets/character/Dead (5).png');
    this.load.image('dead6', '/src/assets/character/Dead (6).png');
    this.load.image('dead7', '/src/assets/character/Dead (7).png');
    this.load.image('dead8', '/src/assets/character/Dead (8).png');
    this.load.image('dead9', '/src/assets/character/Dead (9).png');
    this.load.image('dead10', '/src/assets/character/Dead (10).png');
    this.load.image('dead11', '/src/assets/character/Dead (12).png');
    this.load.image('dead12', '/src/assets/character/Dead (12).png');
    this.load.image('dead13', '/src/assets/character/Dead (13).png');
    this.load.image('dead14', '/src/assets/character/Dead (14).png');
    this.load.image('dead15', '/src/assets/character/Dead (15).png');
    this.load.image('dead16', '/src/assets/character/Dead (16).png');
    this.load.image('dead17', '/src/assets/character/Dead (17).png');
    this.load.image('dead18', '/src/assets/character/Dead (18).png');
    this.load.image('dead19', '/src/assets/character/Dead (19).png');
    this.load.image('dead20', '/src/assets/character/Dead (20).png');
    this.load.image('dead21', '/src/assets/character/Dead (21).png');
    this.load.image('dead22', '/src/assets/character/Dead (22).png');
    this.load.image('dead23', '/src/assets/character/Dead (23).png');
    this.load.image('dead24', '/src/assets/character/Dead (24).png');
    this.load.image('dead25', '/src/assets/character/Dead (25).png');
    this.load.image('dead26', '/src/assets/character/Dead (26).png');
    this.load.image('dead27', '/src/assets/character/Dead (27).png');
    this.load.image('dead28', '/src/assets/character/Dead (28).png');
    this.load.image('dead29', '/src/assets/character/Dead (29).png');
    this.load.image('dead30', '/src/assets/character/Dead (30).png');

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
    this.anims.create({
      key: 'dead',
      frames: [
          { key: 'dead1' },
          { key: 'dead2' },
          { key: 'dead3' },
          { key: 'dead4' },
          { key: 'dead5' },
          { key: 'dead6' },
          { key: 'dead7' },
          { key: 'dead8' },
          { key: 'dead9' },
          { key: 'dead10' },
          { key: 'dead11' },
          { key: 'dead12' },
          { key: 'dead13' },
          { key: 'dead14' },
          { key: 'dead15' },
          { key: 'dead17' },
          { key: 'dead18' },
          { key: 'dead19' },
          { key: 'dead20' },
          { key: 'dead21' },
          { key: 'dead22' },
          { key: 'dead23' },
          { key: 'dead24' },
          { key: 'dead25' },
          { key: 'dead26' },
          { key: 'dead27' },
          { key: 'dead28' },
          { key: 'dead29' },
          { key: 'dead30' }
      ],
      frameRate: 40,
      repeat: 0
    });
  }

  ready () {
    // this.scene.start('GameOver');
    this.scene.start('Title');
    this.readyCount++;
    if (this.readyCount === 2) {
      this.scene.start('Title');
    }
  }
};
