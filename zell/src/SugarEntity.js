class SugarEntity extends Entity {
  constructor(go) {
    super(go);
  }

  selfUpdate(dt) {
    if (!this.gameObject) return;
  }

  onClick() {
    const cellEnt = this.gameObject.scene.selectedCellEntity;
    if (cellEnt) {
      cellEnt.targetMode = 'ent';
      cellEnt.targetEnt = this;
    }
  }

}

