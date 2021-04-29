
class TutorialText extends Entity {
  constructor(scene, mainScene) {
    super(null);
    this.scene = scene;
    this.mainScene = mainScene;
    currState.addListener(this, () => this.onStateChanged());
    this.mainScene.addListener(() => this.onStateChanged());

    let cam = this.scene.cameras.main;
    const W = cam.displayWidth;
    const H = cam.displayHeight;
    let x = W - 50;
    let y = 50;

    const textStyle = {
      font: "36px ProggySquare", fill: "#fff",
      stroke: "#000", strokeThickness: 0,
      shadow: { offsetX: 2, offsetY: 2, stroke: false, fill: true },
      wordWrap: { width: 450, useAdvancedWrap: true }
    };

    this.mainText = new Entity(this.scene.add.text(x, y,
      "", textStyle));
    this.mainText.setParent(this);
    this.mainText.gameObject.setOrigin(1, 0);
    this.mainText.gameObject.depth = 1;

    console.log(this.mainText.gameObject.height);

    this.halfPad = 10;

    this.bgRect = new Entity(this.scene.add.rectangle(x + this.halfPad, y - this.halfPad, 100, 100, 0x0088ff));
    this.bgRect.setParent(this);
    this.bgRect.gameObject.setOrigin(1, 0);
    this.bgRect.gameObject.depth = 0;

    this.onStateChanged();

    window.__setTutorialText = (x) => this.setText(x);
  }

  destroy() {
    super.destroy();
    currState.removeListener(this);
  }

  async animTextTo(text) {
    if (text == this.prevAnimTargetText) return;
    this.prevAnimTargetText = text;
    for (let i = 0; i < text.length; i++) {
      // Did another anim start before we finished? Yield to that.
      if (this.prevAnimTargetText != text) return;
      this.setText(text.substring(0, i + 1));
      await sleep(40);
    }
  }

  setText(text) {
    const textObj = this.mainText.gameObject;
    textObj.text = text;
    const bgObj = this.bgRect.gameObject;
    bgObj.setSize(
      textObj.width + 2 * this.halfPad,
      textObj.height + 2 * this.halfPad);
    // For some reason, need to call this each time
    bgObj.setOrigin(1, 0);
  }

  update() {
  }

  onStateChanged() {
    console.assert(!this.destroyed);
    if (currState.numSugars == 0) {
      if (this.mainScene.isCellMode()) {
        this.animTextTo('Need more sugar! Tap "ZOOM OUT" at the bottom.');
      }
      else {
        this.animTextTo('Tap a sugar to eat it. Go on. You know you want to.');
      }
    }
    else {
      if (!this.mainScene.isCellMode()) {
        this.animTextTo('Yum! Now click your cell to zoom in.');
      }
      else {
        if (!currState.builtER) {
          if (currState.activeMenuName != 'nucleus') {
            this.animTextTo('Now tap the nucleus. It’s just right there.');
          }
          else {
            this.animTextTo('Create the ER!');
          }
        }
        else {
          if (currState.activeMenuName != 'er') {
            this.animTextTo('Tap the Endo… Endo-what now? Endoplasmic Ret--wow ok that’s a lot.');
          }
          else {
            if (currState.numRibosomes == 0) {
              this.animTextTo('Build some ribosomes!');
            }
            else if (currState.numRibosomes < MAX_RIBOSOMES) {
              this.animTextTo('Keep going. Make ribo-some more!');
            }
          }
        }
      }
    }
  }
}