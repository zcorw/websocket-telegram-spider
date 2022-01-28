import schedule from "node-schedule";
import { parentPort, isMainThread } from "worker_threads";
import spider from "./anime";
import events from "./events";

if (!isMainThread) {
  events.on("updated", (name) => {
    parentPort.postMessage({ type: "updated", value: `欧尼酱 ${name}更新了` });
  });
  events.on("torrent", (torrent) => {
    parentPort.postMessage({ type: "torrent", value: torrent });
  });
}

schedule.scheduleJob("0 15 * * * *", function () {
  spider();
});

// schedule.scheduleJob('0 0 1 * * *', function(){
//   download();
// });
