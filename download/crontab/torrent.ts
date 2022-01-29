import downloader from "@download/downloader";
import { readFileList } from "@download/utils";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

export default function torrentDownload() {
  const fileList = readFileList(path.join(process.env.ROOT_PATH, "files"));
  fileList.forEach((filePath) => {
    const search = path.normalize(
      filePath.replace(path.join(process.env.ROOT_PATH, "files"), ""),
    );

    const [_searchm, pathname] = search.match(/(.+)[\/\\](.+)$/);
    downloader.addTorrent(filePath, {
      dir: path.posix.join(
        "/downloads",
        pathname.replace(/[\/\\]/g, () => "/"),
      ),
    });
  });
}
