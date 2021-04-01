
var config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  scene: [
    MainScene,
    HudScene,
  ]
};

var game = new Phaser.Game(config);