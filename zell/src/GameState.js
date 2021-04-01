
class GameState {
  constructor() {
    this.listeners = new Map();

    this.numSugars = 0;
    this.builtER = false;
    this.activeMenuName = null;
    this.cellMode = {};
  }

  addListener(key, listener) {
    this.listeners.set(key, listener);
  }

  removeListener(key) {
    this.listeners.delete(key);
  }

  onChange() {
    console.log(`---- ${this.listeners.size} listeners..`);
    for (const [key, listener] of this.listeners) {
      console.log(key);
      listener();
    }
  }
}

// Not great this is just global..
const currState = new GameState();
