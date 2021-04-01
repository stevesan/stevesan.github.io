
class CellMode extends Entity {
  createMenuForName(name) {
    if (name == 'nucleus') {
      return new NucleusMenu(this.hudScene, currState);
    }
    else if (name == 'er') {
      return new EndoRetMenu(this.hudScene, currState);
    }
    else if (name == 'golgi') {
      return new GolgiMenu(this.hudScene, currState);
    }
    else if (name == 'mito') {
      return new MitoMenu(this.hudScene, currState);
    }
    else {
      throw `Bad menu name: ${name}`;
    }
  }

  destroy() {
    super.destroy();
    currState.removeListener(this);
  }

  onStateChanged() {
    console.assert(!this.destroyed);
    const scene = this.scene;

    if (currState.activeMenuName != this.prevActiveMenuName) {
      if (this.activeMenuEnt) {
        this.activeMenuEnt.destroy();
        this.activeMenuEnt = null;
      }

      if (currState.activeMenuName !== null) {
        this.activeMenuEnt = this.createMenuForName(currState.activeMenuName);
        this.activeMenuEnt.setParent(this);
      }

      this.prevActiveMenuName = currState.activeMenuName;
    }

    if (currState.builtER && !this.endoRet) {
      scene.createSound.play();
      let er = scene.add.image(this.cellX - 5, this.cellY + 0, 'endoret').setInteractive();
      er.on('pointerdown', () => {
        throb(scene, er);
        currState.activeMenuName = toggleOrChange(currState.activeMenuName, 'er');
        currState.onChange();

      });
      er.setScale(0.1);
      this.endoRet = new Entity(er);
      this.endoRet.setParent(this);
    }
    else if (!currState.builtER && this.endoRet) {
      this.endoRet.destroy();
      this.endoRet = null;
    }

    const numRibos = currState.numRibosomes ?? 0;
    if (this.riboEnts === undefined) {
      this.riboEnts = [];
    }
    for (let i = this.riboEnts.length; i < numRibos; i++) {
      this.riboEnts.push(null);
    }
    let createdRibos = false;
    for (let i = 0; i < this.riboEnts.length; i++) {
      if (i < numRibos && this.riboEnts[i] === null) {
        createdRibos = true;
        let ribo = scene.add.image(this.cellX - 10 + 2 * i, this.cellY + 3 * (i % 2) + 2, 'ribosome');
        ribo.setScale(0.1);
        this.riboEnts[i] = new Entity(ribo);
        this.riboEnts[i].setParent(this);
        scene.tweens.add({
          targets: ribo,
          x: ribo.x + (2 * Math.random() - 1) * 2,
          y: ribo.y + (2 * Math.random() - 1) * 2,
          ease: 'Quadratic',
          duration: 500,
          delay: 0,
          repeat: 0,
        });
      }
      else if (i >= numRibos && this.riboEnts[i] !== null) {
        this.riboEnts[i].destroy();
        this.riboEnts[i] = null;
      }
    }
    if (createdRibos) {
      scene.createSound.play();
    }

    const numCentros = currState.numCentrosomes ?? 0;
    const prevNumCentros = this.prevNumCentros ?? 0;
    if (numCentros > prevNumCentros) {
      scene.createSound.play();
      let img = scene.add.image(this.cellX, this.cellY, 'ribosome');
      img.setScale(0.1);
      img.setTint(0x000);
      if (this.centroEnt) {
        this.centroEnt.destroy();
      }
      this.centroEnt = new Entity(img);
      this.centroEnt.setParent(this);

      scene.tweens.add({
        targets: img,
        x: this.cellX + 30,
        ease: 'Quadratic',
        duration: 1000,
        delay: 0,
        repeat: 0,
      });
    }
    this.prevNumCentros = numCentros;
  }

  constructor(scene, hudScene, cellEnt) {
    super(null);
    currState.addListener(this, () => this.onStateChanged());

    this.scene = scene;
    this.hudScene = hudScene;
    this.cellEntity = cellEnt;

    let globalScale = 1.0;

    this.cellX = cellEnt.gameObject.x;
    this.cellY = cellEnt.gameObject.y;

    let cx = cellEnt.gameObject.x;
    let cy = cellEnt.gameObject.y;

    for (let dxdy of [[-10, 10], [10, 12]]) {
      let mito = scene.add.image(cx + dxdy[0], cy + dxdy[1], 'mito').setInteractive();
      mito.setScale(0.1 * globalScale);
      mito.on('pointerdown', () => {
        throb(scene, mito);
        currState.activeMenuName = toggleOrChange(currState.activeMenuName, 'mito');
        currState.onChange();
      });
      new Entity(mito).setParent(this);
    }
    {
      let nuc = scene.add.image(cx - 5, cy - 10, 'nuc').setInteractive();
      nuc.on('pointerdown', () => {
        throb(scene, nuc);
        currState.activeMenuName = toggleOrChange(currState.activeMenuName, 'nucleus');
        currState.onChange();
      });
      nuc.setScale(0.1 * globalScale);
      this.nucleus = new Entity(nuc);
      this.nucleus.setParent(this);
    }
    {
      let golgi = scene.add.image(cx + 10, cy - 5, 'golgi').setInteractive();
      golgi.on('pointerdown', () => {
        throb(scene, golgi);
        currState.activeMenuName = toggleOrChange(currState.activeMenuName, 'golgi');
        currState.onChange();
      });
      golgi.setScale(0.1 * globalScale);
      this.golgi = new Entity(golgi);
      this.golgi.setParent(this);
    }

    {
      let backBtn = scene.add.image(cx - 45, cy + 20, 'back').setInteractive();
      backBtn.on('pointerdown', () => {
        throb(scene, backBtn);
        this.scene.enterMoveMode();
      });
      backBtn.setScale(0.1 * globalScale);
      this.backBtn = new Entity(backBtn);
      this.backBtn.setParent(this);
    }

    this.onStateChanged();
  }
}
