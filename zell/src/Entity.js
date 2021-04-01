class Entity {
  constructor(gameObject) {
    this.destroyed = false;
    this.gameObject = gameObject;
    if (gameObject !== null) {
      this.gameObject.entity = this;
    }
    this.parentNode = null;
    this.childNodes = new Set();
  }

  findRoot() {
    if (this.parentNode === null) {
      return this;
    }
    else {
      return this.parentNode.findRoot();
    }
  }

  hasChild(ent) {
    return this.childNodes.has(ent);
  }

  setParent(newParent) {
    if (this.parentNode === newParent) return;
    if (this.parentNode !== null) {
      console.assert(this.parentNode.hasChild(this));
      this.parentNode.childNodes.delete(this);
    }
    this.parentNode = newParent;
    if (newParent !== null) {
      console.assert(!newParent.hasChild(this));
      newParent.childNodes.add(this);
    }
  }

  selfUpdate(dt) {
  }

  update(dt) {
    this.selfUpdate(dt);
    for (const child of this.childNodes) {
      child.update(dt);
    }
  }

  destroy() {
    this.setParent(null);
    if (this.gameObject) this.gameObject.destroy();
    this.gameObject = null;
    for (const child of this.childNodes) {
      child.destroy();
    }
    this.childNodes.clear();

    this.destroyed = true;
  }

  onClick() {
  }

  onPointerIn() {
    if (!this.gameObject) return;
    this.gameObject.setTint(0x88ff88);
  }

  onPointerOut() {
    if (!this.gameObject) return;
    this.gameObject.clearTint();
  }
}
