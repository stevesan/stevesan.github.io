class BaseMenu extends Entity {
  constructor(scene, state) {
    super(null);
    this.scene = scene;
    this.state = state;
    this.state.addListener(this, () => this.onStateChanged());

    this.buttonEnts = new Map();

    this.onStateChanged();
  }

  destroy() {
    super.destroy();
    this.state.removeListener(this);
  }

  getTitle() { return 'Some Menu'; }

  getButtons() { return []; }

  onStateChanged() {
    console.assert(!this.destroyed);

    let cam = this.scene.cameras.main;
    const W = cam.displayWidth;
    const H = cam.displayHeight;
    let x = 0.03;
    let y = 0.2;
    const dy = 0.05;
    const textStyle = {
      font: "36px ProggySquare", fill: "#fff",
      stroke: "#000", strokeThickness: 0,
      shadow: { offsetX: 2, offsetY: 2, stroke: false, fill: true }
    };

    const scene = this.scene;
    if (!this.header) {
      this.header = new Entity(scene.add.text(x * W, y * H,
        this.getTitle(),
        textStyle));
      this.header.setParent(this);
    }

    for (let button of this.getButtons()) {
      y += dy;
      let buttonEnt = this.buttonEnts.get(button['id']);
      if (!buttonEnt) {
        console.log(`adding text item for button ${button['id']}`);
        const text = scene.add.text(x * W, y * H, '', textStyle);
        text.setInteractive();
        text.on('pointerdown', () => {
          throb(scene, buttonEnt.gameObject, 1.05);
          scene.clickAudio.play();
          if (button['enabled']()) {
            button['onClick']();
          }
        });
        text.on('pointerover', () => {
          if (!button['enabled']()) return;
          buttonEnt.gameObject.setTint(0xaaaaff);
        });
        text.on('pointerout', () => {
          if (!button['enabled']()) return;
          buttonEnt.gameObject.clearTint();
        });
        buttonEnt = new Entity(text);
        buttonEnt.setParent(this);
        this.buttonEnts.set(button['id'], buttonEnt);
      }
      if (!button['enabled']()) {
        buttonEnt.gameObject.setTint(0x888888);
      }
      buttonEnt.gameObject.setText(`* ${button['label']()}`);
    }
  }
}

class GolgiMenu extends BaseMenu {
  constructor(scene, state) {
    super(scene, state);
  }

  getTitle() { return 'Golgi Apparatus'; }

  getButtons() { return []; }
}

class MitoMenu extends BaseMenu {
  constructor(scene, state) {
    super(scene, state);
  }

  getTitle() { return 'Mitochondria'; }

  getButtons() {
    return [];
  }
}

class NucleusMenu extends BaseMenu {
  constructor(scene, state) {
    super(scene, state);
  }

  getTitle() { return 'Nucleus'; }

  getButtons() {
    return [
      {
        id: 'addER',
        label: () => 'Add Endoplasmic Reticulum (ER)',
        enabled: () => !currState.builtER,
        onClick: () => {
          currState.builtER = true;
          currState.onChange();
        }
      }
    ];
  }
}

const MAX_RIBOSOMES = 5;

class EndoRetMenu extends BaseMenu {
  constructor(scene, state) {
    super(scene, state);
  }

  getTitle() { return 'Endoplasmic Reticulum (ER)'; }

  getButtons() {
    console.assert(this.state.numRibosomes <= MAX_RIBOSOMES);

    const btns = [
      {
        id: 'addRibos',
        label: () => `Add Ribosome (${this.state.numRibosomes}/${MAX_RIBOSOMES})`,
        enabled: () => this.state.numRibosomes < MAX_RIBOSOMES && currState.numSugars > 0,
        onClick: () => {
          this.state.numRibosomes = this.state.numRibosomes + 1;
          this.state.numSugars--;
          this.state.onChange();
        }
      }
    ];
    if (this.state.numRibosomes == MAX_RIBOSOMES) {
      btns.push({
        id: 'addCentros',
        label: () => `Add Centrosomes`,
        enabled: () => true,
        onClick: () => {
          this.state.numCentrosomes = (this.state.numCentrosomes ?? 0) + 1;
          this.state.onChange();
        }
      });
    }
    return btns;
  }
}
