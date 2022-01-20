import { EventEmitter } from "events";

class Telegram extends EventEmitter {
  constructor() {
    super();
  }
  on(event: TelegramEvent, listener: (...args: any[]) => void) {
    super.on(event, listener);
    return this;
  }
  emit(event: TelegramEvent, ...args: any[]) {
    return super.emit(event, ...args);
  }
}

export default new Telegram();
