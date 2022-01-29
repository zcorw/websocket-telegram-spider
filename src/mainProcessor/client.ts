import downloader from "@download/downloader";
import { saveFile } from "@download/utils";
import path from "path";

function torrentProcessor(message: MessageType) {
  if (message.type === "buffer") {
    saveFile(
      message.data,
      path.join(
        process.env.ROOT_PATH,
        "files",
        message.params.path.replace(/[\/\\]/g, () => path.sep),
      ),
      message.params.file,
    );
  }
}

export default function processor(message: MessageType) {
  switch (message.url) {
    case "torrent":
      return torrentProcessor(message);
  }
}
