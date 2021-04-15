class BaseMenu extends Entity {
  constructor(scene, state) {
    super(null);
    this.scene = scene;
    this.state = state;
    this.state.addListener(this, () => this.onStateChanged());

    this.buttonEnts = new Map();
    this.iconEnts = new Map();

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
    const dy = 0.07;
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

    y += dy / 2;

    for (let button of this.getButtons()) {
      y += dy;
      let buttonEnt = this.buttonEnts.get(button['id']);
      if (!buttonEnt) {
        console.log(`adding text item for button ${button['id']}`);
        const text = scene.add.text(x * W, y * H, '', textStyle);
        buttonEnt = new Entity(text);
        buttonEnt.setParent(this);
        this.buttonEnts.set(button['id'], buttonEnt);

      }
      // if (!button['enabled']()) {
      //   buttonEnt.gameObject.setTint(0x888888);
      // }
      buttonEnt.gameObject.setText(`${button['label']()}`);

      if (button['icon']) {
        let iconEnt = this.iconEnts.get(button['id']);
        if (!iconEnt) {
          const icon = scene.add.image(0, 0, button['icon']);
          icon.setInteractive();
          icon.setScale(3);
          iconEnt = new Entity(icon);
          iconEnt.setParent(this);
          this.iconEnts.set(button['id'], iconEnt);

          icon.on('pointerdown', () => {
            throb(scene, iconEnt.gameObject, 1.5);
            scene.clickAudio.play();
            if (button['enabled']()) {
              button['onClick']();
            }
          });
          icon.on('pointerover', () => {
            if (!button['enabled']()) return;
            iconEnt.gameObject.setTint(0xaaaaff);
          });
          icon.on('pointerout', () => {
            if (!button['enabled']()) return;
            iconEnt.gameObject.clearTint();
          });
        }
        const halfW = iconEnt.gameObject.width * 0.5;
        const halfH = iconEnt.gameObject.height * 0.5;
        iconEnt.gameObject.x = buttonEnt.gameObject.x + buttonEnt.gameObject.width + 16 + halfW;
        iconEnt.gameObject.y = buttonEnt.gameObject.y + halfH * 2;
        // So we throb centered still
        iconEnt.gameObject.setOrigin(0.5, 0.5);
        if (!button['enabled']()) {
          iconEnt.gameObject.setTint(0x888888);
        }
      }
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
        label: () => 'Endoplasmic Reticulum (ER)',
        enabled: () => !currState.builtER,
        onClick: () => {
          currState.builtER = true;
          currState.onChange();
        },
        icon: 'addbutton'
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
        label: () => `Ribosome (${this.state.numRibosomes}/${MAX_RIBOSOMES})`,
        enabled: () => this.state.numRibosomes < MAX_RIBOSOMES && currState.numSugars > 0,
        onClick: () => {
          this.state.numRibosomes = this.state.numRibosomes + 1;
          this.state.numSugars--;
          this.state.onChange();
        },
        icon: 'addbutton'
      }
    ];
    if (this.state.numRibosomes == MAX_RIBOSOMES) {
      btns.push({
        id: 'addCentros',
        label: () => `Centrosomes`,
        enabled: () => true,
        onClick: () => {
          this.state.numCentrosomes = (this.state.numCentrosomes ?? 0) + 1;
          this.state.onChange();
        },
        icon: 'addbutton'
      });
    }
    return btns;
  }
}
