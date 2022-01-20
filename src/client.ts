import WebSocket from "ws";
import { create } from "@/utils/buffer";

function start() {
  const ws = new WebSocket("ws://127.0.0.1:3000", { perMessageDeflate: false });
  ws.on("open", () => {
    console.log("open");
    ws.send(create("test", "this is first"), (e) => console.log(e));
  });

  ws.on("message", function message(data) {
    console.log("received: %s", data);
  });

  ws.on("close", () => {
    console.log("close");
    setTimeout(start, 6000);
  });
  ws.on("error", () => {
    console.log("error");
  });
}
start();
