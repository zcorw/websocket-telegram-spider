import schedule from "node-schedule";
import dotenv from "dotenv";
import path from "path";
import crontab from "./crontab/index";
import { parentPort, isMainThread } from "worker_threads";
import { getCrontabs } from "./utils";

dotenv.config();
const crontabs = getCrontabs(
  path.join(process.env.ROOT_PATH, "config/download.cron"),
);
if (!isMainThread)
  crontabs.forEach((cron) => {
    if (
      typeof (crontab as { [key: string]: () => void })[cron.work] ===
      "function"
    ) {
      schedule.scheduleJob(
        cron.time,
        (crontab as { [key: string]: () => void })[cron.work],
      );
    }
  });
else crontab["torrent"]();
