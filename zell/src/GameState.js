
// TODO separate saved game state (like numSugars) vs. session-only (like activeMenuName)
class GameState {
  constructor() {
    this.listeners = new Map();

    this.numSugars = 0;
    this.numRibosomes = 0;
    this.builtER = false;

    this.activeMenuName = null;
  }

  addListener(key, listener) {
    this.listeners.set(key, listener);
  }

  removeListener(key) {
    this.listeners.delete(key);
  }

  onChange() {
    // Make a copy of the map, in case listeners are removed while handling
    var listenersCopy = new Map(this.listeners);

    for (const [key, listener] of listenersCopy) {
      // Make sure the listener still wants to listen
      if (this.listeners.has(key)) {
        listener();
      }
    }
  }
}

// Not great this is just global..
const currState = new GameState();
