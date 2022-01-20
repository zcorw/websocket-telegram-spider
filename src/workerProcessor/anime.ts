import telegramEvent from "@/events/telegram";
import downloadEvent from "@/events/download";

export const updated = (msg: string) => {
  telegramEvent.emit("updated", msg);
};

export const torrent = (filePath: string) => {
  downloadEvent.emit("torrent", filePath);
};

const processer = (message: { [K in keyof AnimeWorkerMessage]: string }) => {
  switch (message.type as AnimeWorkerMessage["type"]) {
    case "updated":
      return updated(message.value);
    case "torrent":
      return torrent(message.value);
  }
};

export default processer;
