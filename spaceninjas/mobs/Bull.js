
const ROTATION_TO_FORWARD_DELTA_RADS = Math.PI / 2;

class Bull extends GameObject {
  /**
   * @param {GameScene} scene
   * @param {number} x
   * @param {number} y
   */
  constructor(scene, x, y) {
    super(scene, x, y, 'enemy-medium', 1);
    scene.enemies.add(this);
    this.anchor.set(0.5, 0.5);

    const game = scene.phaserGame;
    game.physics.arcade.enable(this);
    this.body.immovable = true;

    const spriteBounds = this.getBounds();

    // no need for the wings collide
    const L = Math.min(spriteBounds.width, spriteBounds.height);
    // body pos is relative to sprite bot-left
    const bodyX = spriteBounds.width / 2 - L / 2;
    const bodyY = spriteBounds.height / 2 - L / 2
    this.body.setSize(L, L, bodyX, bodyY);

    this.chasing = new ChasingModule(scene, this);

    this.windupTime = 0;
    this.chargeTime = 0;
    this.stunTime = 0;
    this.state = '';
    this.enterSearch();
  }

  isDamageable() { return false; }

  onOverlap(other) {
    if (other.isPlayer && other.isPlayer() && other.isDamageable()) {
      other.onDamage(this, 1);
      this.destroy();
    }

    if (this.state == 'charging') {
      // NOTE this never works
      alert('hard stop')
      this.body.velocity.set(0, 0);
      this.enterStun();
    }
    // Respect collision
    return true;
  }

  onDamage(damager) {
    this.destroy();
    this.scene.onEnemyDeath(this);
    WALL_BREAK_AUDIO.get().play();
  }

  isDead() { return !this.alive; }

  enterStun() {
    this.state = 'stun';
    this.stunTime = 2;
  }

  enterSearch() {
    this.state = 'search';
    this.tint = 0xffffff;
    this.chasing.reset();
  }

  lookAtPlayer() {
    const toPlayer = fromTo(this, this.scene.player);
    this.rotation = Math.atan2(toPlayer.y, toPlayer.x) - ROTATION_TO_FORWARD_DELTA_RADS;
  }

  update() {
    const dt = this.scene.phaserGame.time.physicsElapsed;
    const player = this.scene.player;

    if (this.state == 'search') {
      // TODO don't allow instantly turning towards player.
      this.lookAtPlayer();
      if (this.scene.hasClearLineOfSight(this.position, player.position)) {
        this.state = 'windup';
        this.windupTime = 1;
      }
      else {
        this.chasing.speed = 200;
        this.chasing.update();
      }
    }
    else if (this.state == 'windup') {
      this.lookAtPlayer();
      this.windupTime -= dt;
      this.tint = this.scene.squareWave(10) ? 0xff0000 : 0xffffff;

      if (!this.scene.hasClearLineOfSight(this.position, player.position)) {
        this.enterSearch();
      }
      else if (this.windupTime < 0) {
        this.state = 'charge';
        this.chargeTime = 0.5;
      }
    }
    else if (this.state == 'charge') {
      const rads = this.rotation + ROTATION_TO_FORWARD_DELTA_RADS;
      const velocity = new Phaser.Point(Math.cos(rads), Math.sin(rads));
      velocity.setMagnitude(500);
      this.body.velocity.copyFrom(velocity);
      this.tint = 0xff0000;

      this.chargeTime -= dt;
      if (this.chargeTime < 0) {
        this.enterStun();
      }
    }
    else if (this.state == 'stun') {
      this.tint = 0x888888;

      // slide to a stop
      const v = this.body.velocity;
      const alpha = 0.9;
      this.body.velocity.set(v.x * alpha, v.y * alpha);
      this.stunTime -= dt;
      if (this.stunTime < 0) {
        this.enterSearch();
      }
    }
  }
}