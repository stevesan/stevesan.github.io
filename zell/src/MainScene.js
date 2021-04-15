
function createFuzz(scene, worldWidth, worldHeight) {
  scene.fuzzes = [];
  for (let i = 0; i < 100; i++) {
    let x = worldWidth * Math.random();
    let y = worldHeight * Math.random();
    let image = scene.add.image(x, y, 'fuzz');
    image.alpha = Math.random() * 0.8;
    image.origX = x;
    image.origY = y;
    image.freq = (Math.random() * 2 - 1) * 0.3;
    image.amp = Math.random() * 20;
    scene.fuzzes.push(image);
  }
}

function updateFuzzes(scene, time, dtMs) {
  for (let fuzz of scene.fuzzes) {
    fuzz.x = fuzz.origX + Math.sin(2 * Math.PI * fuzz.freq * time / 1000) * fuzz.amp;
    fuzz.y = fuzz.origY + Math.cos(2 * Math.PI * fuzz.freq * time / 1000) * fuzz.amp;
  }
}

class MainScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'main',
      active: true,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { x: 0, y: 0 },
          debug: false,
        }
      },
    });
    this.listeners = new Set();
  }

  callListeners() {
    for (const l of this.listeners) {
      l();
    }
  }

  addListener(listener) {
    this.listeners.add(listener);
  }

  preload() {
    this.load.setBaseURL('../assets');
    this.load.image('back', 'back.png');
    this.load.image('cell', 'cell.png');
    this.load.image('mito', 'mito.png');
    this.load.image('nuc', 'nuc.png');
    this.load.image('fuzz', 'fuzz.png');
    this.load.image('sugar', 'molecule.png');
    this.load.image('arrow', 'arrow.png');
    this.load.image('endoret', 'endoret.png');
    this.load.image('ribosome', 'ribosome.png');
    this.load.image('golgi', 'golgi.png');
    this.load.image('particles/blue', 'particles/blue.png');

    this.load.audio('click', 'sounds/click.wav');
    this.load.audio('create', 'sounds/create.wav');
    this.load.audio('powerup', 'sounds/powerup.wav');
    this.load.audio('bgmusic', 'music/ftl-title-theme.mp3');

    // menu graphics TODO move this into menus..?
    this.load.image('addbutton', 'addbutton.png');
  }

  create() {
    const worldWidth = 2000;
    const worldHeight = 2000;

    this.physics.world.setBounds(0, 0, worldWidth, worldHeight);
    this.sound.add('bgmusic', { loop: true, volume: 0.2 }).play();

    this.clickAudio = this.sound.add('click', { volume: 0.3 });
    this.powerupAudio = this.sound.add('powerup', { volume: 0.1 });
    this.createSound = this.sound.add('create', { volume: 0.1 });

    createFuzz(this, worldWidth, worldHeight);

    this.rootEntity = new Entity(null);

    var cellImage = this.physics.add.image(config.width / 2, config.height / 2, 'cell');
    cellImage.setCircle(32);
    cellImage.setVelocity(1, 1);
    cellImage.setBounce(1, 1);
    cellImage.setCollideWorldBounds(true);

    let cell = new CellEntity(cellImage);
    this.selectedCellEntity = cell;
    this.cameras.main.startFollow(cellImage);
    this.cameras.main.setLerp(0.1);
    cell.setParent(this.rootEntity);

    for (let i = 0; i < 5; i++) {
      var sugarImage = this.physics.add.image(Math.random() * config.width, Math.random() * config.height, 'sugar');
      sugarImage.setCircle(32);
      sugarImage.setVelocity((Math.random() - 0.5) * 50, (Math.random() - 0.5) * 50);
      sugarImage.setAngularVelocity((Math.random() - 0.5) * 180);
      sugarImage.setBounce(1, 1);
      sugarImage.setCollideWorldBounds(true);
      let sugar = new SugarEntity(sugarImage);
      sugar.setParent(this.rootEntity);

      this.physics.add.overlap(sugarImage, cellImage, (sugarImage, cellImage) => {
        this.explosionEmitter.explode(100, sugarImage.x, sugarImage.y);
        sugar.destroy();
        this.powerupAudio.play();
        this.cameras.main.shake(400, 0.005);

        currState.numSugars++;
        currState.onChange();
      });
    }

    var particles = this.add.particles('particles/blue');
    particles.depth = 1;
    var emitter = particles.createEmitter({
      speed: 500,
      lifespan: 1000,
      scale: { start: 1, end: 0 },
      blendMode: 'ADD'
    });
    emitter.stop();

    this.explosionEmitter = emitter;

    this.clickEmitter = particles.createEmitter({
      speed: 200,
      lifespan: 250,
      scale: { start: 1, end: 0 },
      blendMode: 'ADD'
    });
    this.clickEmitter.stop();

    let getObjectsUnderPointer = (pointer) => {
      return this.physics.overlapRect(pointer.worldX, pointer.worldY, 1, 1);
    };

    let prevHoveredEnts = new Set();

    this.input.on('pointermove', (pointer) => {
      let hoveredEnts = new Set();
      for (let body of getObjectsUnderPointer(pointer)) {
        if (body.gameObject.entity) {
          hoveredEnts.add(body.gameObject.entity);
        }
      }

      for (let ent of hoveredEnts) {
        if (!prevHoveredEnts.has(ent)) {
          ent.onPointerIn();
        }
      }

      for (let ent of prevHoveredEnts) {
        if (!hoveredEnts.has(ent)) {
          ent.onPointerOut();
        }
      }

      prevHoveredEnts = hoveredEnts;
    });

    // Scene-wide click handler
    this.input.on('pointerdown', (pointer) => {
      let x = pointer.worldX;
      let y = pointer.worldY;
      console.log(`clicked @${x}, ${y}`);
      if (!this.isCellMode()) {
        this.clickEmitter.explode(30, x, y);
      }
      this.clickAudio.play();

      let clickedAny = false;
      for (let body of getObjectsUnderPointer(pointer)) {
        if (body.gameObject.entity) {
          body.gameObject.entity.onClick(this);
          clickedAny = true;
        }
      }

      if (!clickedAny) {
        // Clicked bg
        if (!this.isCellMode()) {
          cell.commandToWorldPos(x, y);
        }
      }
    });

    this.isCellMode = () => { return this.mode == 'cell'; };

    this.enterMoveMode();

    this.tutorial = new TutorialText(this.scene.get('hud'), this);
    this.tutorial.setParent(this.rootEntity);
  }

  enterCellMode() {
    this.cameras.main.zoomTo(12, 1000, Phaser.Math.Easing.Cubic.In, true);
    this.cameras.main.followOffset.set(20, 0);
    if (this.mode == "cell") return;
    this.mode = "cell";
    this.cellMode = new CellMode(this, this.scene.get('hud'), this.selectedCellEntity);
    this.callListeners();
  }

  enterMoveMode() {
    if (this.mode == "move") return;
    this.mode = "move";
    this.cameras.main.setBackgroundColor("#221111")
    this.cameras.main.zoomTo(1, 1000, Phaser.Math.Easing.Quartic.Out, true);
    this.cameras.main.followOffset.set(0, 0);
    if (this.cellMode) {
      this.cellMode.destroy();
      this.cellMode = null;
    }
    this.callListeners();
  }

  update(time, dtMs) {
    this.rootEntity.update(dtMs);
    updateFuzzes(this, time, dtMs);
  }
}
