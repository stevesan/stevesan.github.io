class HudScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'hud',
      active: true
    });
    currState.addListener(this, () => this.onStateChanged());
  }

  destroy() {
    super.destroy();
    currState.removeListener(this);
  }

  preload() {
    this.load.setBaseURL('../assets');
    this.load.audio('click', 'sounds/click.wav');
  }

  create() {
    const textStyle = {
      font: "42px ProggySquare", fill: "#8f8",
      stroke: "#000", strokeThickness: 0,
      shadow: { offsetX: 2, offsetY: 2, stroke: false, fill: true }
    };
    this.sugarText = this.add.text(50, 50, "", textStyle);
    this.clickAudio = this.sound.add('click', { volume: 0.3 });
    this.onStateChanged();
  }

  update(time, dtMs) {
  }

  onStateChanged() {
    this.sugarText.text = 'SUGAR: ';
    for (let i = 0; i < currState.numSugars; i++) {
      this.sugarText.text += '*';
    }
  }
}
