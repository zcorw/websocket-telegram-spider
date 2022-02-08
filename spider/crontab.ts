import schedule from "node-schedule";
import { parentPort, isMainThread } from "worker_threads";
import path from "path";
import spider from "./crontabs";
import events from "./events";
import utils from "./utils";

const crontabs = utils.getCrontabs(
  path.join(process.env.ROOT_PATH, "config/spider.cron"),
);

if (!isMainThread) {
  events.on("updated", (name) => {
    parentPort.postMessage({ type: "updated", value: `欧尼酱 ${name}更新了` });
  });
  events.on("torrent", (torrent) => {
    parentPort.postMessage({ type: "torrent", value: torrent });
  });
}

if (!isMainThread)
  crontabs.forEach((cron) => {
    if (
      typeof (spider as { [key: string]: () => void })[cron.work] === "function"
    )
      schedule.scheduleJob(
        cron.time,
        (spider as { [key: string]: () => void })[cron.work],
      );
  });
else spider["anime"]();

// schedule.scheduleJob('0 0 1 * * *', function(){
//   download();
// });
