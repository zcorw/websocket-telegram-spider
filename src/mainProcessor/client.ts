import downloader from "@download/downloader";
import { getFileBuffer } from "@download/utils";
import path from "path";

function torrentProcessor(message: MessageType) {
  if (message.type === "buffer") {
    downloader.addTorrent(message.data, {
      dir: path.posix.join(
        process.env.ARIA_PATH,
        message.params.path.replace(/[\/\\]/g, () => "/"),
      ),
      ...message.params,
    });
  }
}

export default function processor(message: MessageType) {
  switch (message.url) {
    case "torrent":
      return torrentProcessor(message);
  }
}
