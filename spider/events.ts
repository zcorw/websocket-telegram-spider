import { EventEmitter } from "events";

class Event extends EventEmitter {
  constructor() {
    super();
  }
  on(channel: "updated", listener: (name: string) => void): this;
  on(channel: "torrent", listener: (filePath: string) => void): this;
  on(channel: string, listener: (...agrs: any[]) => void) {
    super.on(channel, listener);
    return this;
  }
}

export default new Event();
