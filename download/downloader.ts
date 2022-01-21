import Aria2 from "aria2";
import ws from "ws";
import nodefetch from "node-fetch";
import { toBase64, getFileBuffer } from "./utils";

const options = {
  host: "localhost",
  port: 6800,
  secure: false,
  secret: "123456",
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
export default {
  addUri(uri: string, params: { dir: string }) {
    return aria2.call("addUri", [uri], params);
  },
  addTorrent(torrentPath: string, params: { dir: string }) {
    const base64 = toBase64(getFileBuffer(torrentPath));
    return aria2.call("addTorrent", [base64], params);
  },
};
