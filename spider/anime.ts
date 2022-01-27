import Crawler, {
  CrawlerRequestOptions,
  CrawlerRequestResponse,
} from "crawler";
import { init } from "@yaml/anime";
import path from "path";
import { saveFile } from "@download/utils";
import dotenv from "dotenv";
import event from "./events";

dotenv.config();

const config = init(path.join(process.env.ROOT_PATH, "config/anime.yml"));
const torrentPath = path.join(process.env.ROOT_PATH, "files/animes");

const processor = (
  $: cheerio.CheerioAPI,
  id: string,
): { torrents: string[]; id: string } => {
  const torrents: string[] = [];
  let first: string = "";
  const trs = $(".table-responsive").find("table").find("tr.default");
  for (let i = 0; i < trs.length; i++) {
    const tr = trs[i];
    const href = $(tr).children("td").eq(2).children().eq(0).attr("href");
    if (href.match(/\/download\/(\w+).torrent/)) {
      const res = href.match(/\/download\/(\w+).torrent/);
      const _id = res[1];
      if (i === 0) {
        first = _id;
      }
      if (id === _id) {
        break;
      } else {
        torrents.push(config.host + href);
      }
    }
  }
  return { torrents, id: first };
};

const torrent = new Crawler({
  encoding: null,
  jQuery: false,
  proxy: +process.env.SPIDER_PROXY ? "sock5://127.0.0.1:7890" : undefined,
  callback: async function (
    err: Error,
    res: CrawlerRequestResponse,
    done: () => void,
  ) {
    if (err) {
      console.error(err.stack);
    } else {
      const [filename] = res.options.uri.match(/[^\/]+$/g);
      try {
        await saveFile(
          res.body as Buffer,
          path.join(torrentPath, res.options.name),
          filename,
        );
        event.emit(
          "torrent",
          path.join(torrentPath, res.options.name, filename),
        );
      } catch (e) {
        console.error(e);
      }
    }
    done();
  },
});

const download = new Crawler({
  encoding: null,
  proxy: +process.env.SPIDER_PROXY ? "sock5://127.0.0.1:7890" : undefined,
  callback: function (
    err: Error,
    res: CrawlerRequestResponse,
    done: () => void,
  ) {
    if (err) {
      console.error(err.stack);
    } else {
      const data = processor(res.$, res.options.id);
      torrent.queue(
        data.torrents.map((torrent) => ({
          uri: torrent,
          name: res.options.name,
        })),
      );
      if (data.torrents.length !== 0) {
        event.emit("updated", res.options.name);
      }
      const index = config.indexOf(res.options.name);
      if (index !== -1) {
        config.updateId(data.id, index);
      }
    }
    console.log("采集完成");
    done();
  },
});

function getQueueOption(): CrawlerRequestOptions[] {
  const res: CrawlerRequestOptions[] = [];
  config.forEach((item, i) => {
    res[i] = {
      uri: `${config.url}?f=0&c=0_0&q=${encodeURIComponent(
        `${item.name} ${item.group}`,
      )}`,
      name: item.name,
      id: item.id,
    };
  });
  return res;
}

export default function () {
  console.log("开始采集");
  download.queue(getQueueOption());
}
