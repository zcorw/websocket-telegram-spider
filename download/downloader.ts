import Aria2 from "aria2";
import ws from "ws";
import nodefetch from "node-fetch";
import { toBase64, getFileBuffer, debounce } from "./utils";
import dotenv from "dotenv";

dotenv.config();

type Aria2Methods =
  | "addUri"
  | "addTorrent"
  | "addMetalink"
  | "remove"
  | "forceRemove"
  | "pause"
  | "pauseAll"
  | "unpause"
  | "tellStatus";

let _config: [method: Aria2Methods, ...params: any[]][] = [];
const addFile = debounce(() => {
  console.log(
    "_config",
    _config.map((conf) => conf[conf.length - 1].dir),
  );
  Promise.all(aria2.batch(_config))
    .then(() => {
      _config = [];
    })
    .catch((e) => console.error(e));
}, 5000);

const options = {
  host: process.env.ARIA_HOST,
  port: +process.env.ARIA_PORT,
  secure: false,
  secret: process.env.ARIA_TOKEN,
  path: "/jsonrpc",
};

const aria2 = new Aria2({ WebSocket: ws, fetch: nodefetch, ...options });
aria2.on("onDownloadStart", (...args) => {
  console.log("onDownloadStart", args);
});
aria2.on("onDownloadComplete", (...args) => {
  console.log("onDownloadComplete", args);
});
aria2.on("onBtDownloadComplete", (...args) => {
  console.log("onBtDownloadComplete", args);
});
aria2.on("open", () => {
  console.log("open");
});
aria2.on("close", () => {
  console.log("close");
  setTimeout(connect, 5000);
});
function connect() {
  aria2.open().catch((e) => {});
}
connect();

function cache(method: Aria2Methods, ...params: any[]) {
  _config.push([method, ...params]);
  addFile();
}
export default {
  addUri(uri: string, params: { dir: string }) {
    cache("addUri", [uri], params);
  },
  addTorrent(torrentPath: string | Buffer, params: { dir: string }) {
    let base64: string;
    if (typeof torrentPath === "string") {
      base64 = toBase64(getFileBuffer(torrentPath));
    } else if (Buffer.isBuffer(torrentPath)) {
      base64 = toBase64(torrentPath);
    } else {
      throw new TypeError("torrent must be a string or a buffer");
    }
    cache("addTorrent", base64, [], {
      dir: params.dir,
    });
  },
};
