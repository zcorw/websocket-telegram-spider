import { EventEmitter } from "events";

class Anime extends EventEmitter {
  constructor() {
    super();
  }
  on(event: AnimeEvent, listener: (...args: any[]) => void) {
    super.on(event, listener);
    return this;
  }
  emit(event: AnimeEvent, ...args: any[]) {
    return super.emit(event, ...args);
  }
}

export default new Anime();
