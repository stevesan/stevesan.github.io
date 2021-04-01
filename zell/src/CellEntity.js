const MAX_CELL_SPEED = 300;

class CellEntity extends Entity {
  constructor(go) {
    super(go);
    this.targetMode = 'none';

    this.prevVelX = 0;
    this.prevVelY = 0;
    this.spinDir = 1;
  }

  commandToWorldPos(x, y) {
    this.targetMode = 'pos';
    this.targetX = x;
    this.targetY = y;
    this.spinDir *= -1;
  }

  goTowards(x, y, dt) {
    let dx = x - this.gameObject.x;
    let dy = y - this.gameObject.y;
    let dist = Math.sqrt(dx * dx + dy * dy);
    if (dist <= 0) return;

    let easiness = 20;
    let speed = MAX_CELL_SPEED * (1 - 1 / (dist / easiness + 1));
    this.prevVelX = dx / dist * speed;
    this.prevVelY = dy / dist * speed;
    this.gameObject.setVelocity(this.prevVelX, this.prevVelY);
  }

  onClick() {
    if (!this.gameObject.scene.isCellMode()) {
      this.gameObject.scene.enterCellMode(this);
    }
  }

  onPointerIn() {
    if (!this.gameObject) return;
    if (!this.gameObject.scene.isCellMode()) {
      this.gameObject.setTint(0x88ff88);
    }
  }

  update(dtMs) {
    if (!this.gameObject) return;

    if (this.gameObject.scene.isCellMode()) {
      this.gameObject.clearTint();
      this.gameObject.setVelocity(0, 0);
      this.gameObject.setAngularVelocity(0);
      this.gameObject.setImmovable(true);
      this.gameObject.angle += dtMs / 1000 * 5 * this.spinDir;
      this.targetMode = 'none';
    }
    else {
      this.gameObject.setImmovable(false);
      if (this.targetMode == 'pos') {
        this.goTowards(this.targetX, this.targetY, dtMs);
      }
      else if (this.targetMode == 'ent') {
        if (this.targetEnt == null || this.targetEnt.gameObject == null) {
          // It's gone - just go a bit past it
          this.targetMode = 'pos';
          let pastTime = 0.1;
          this.targetX = this.gameObject.x + this.prevVelX * pastTime;
          this.targetY = this.gameObject.y + this.prevVelY * pastTime;
        } else {
          this.goTowards(this.targetEnt.gameObject.x, this.targetEnt.gameObject.y, dtMs);
        }
      }

      this.gameObject.angle += dtMs / 1000 * 60 * this.spinDir;
    }
  }
}
