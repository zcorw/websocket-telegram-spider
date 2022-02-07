import schedule from "node-schedule";
import dotenv from "dotenv";
import torrentDownload from "./crontab/torrent";
import { parentPort, isMainThread } from "worker_threads";

dotenv.config();
if (!isMainThread)
  schedule.scheduleJob("0 0 4 * * *", function () {
    torrentDownload();
  });
else torrentDownload();
