import { EventEmitter } from "events";

class Download extends EventEmitter {
  constructor() {
    super();
  }
  on(event: DownloadEvent, listener: (...args: any[]) => void) {
    super.on(event, listener);
    return this;
  }
  emit(event: DownloadEvent, ...args: any[]) {
    return super.emit(event, ...args);
  }
}

export default new Download();
