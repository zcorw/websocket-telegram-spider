import { clients } from "@/server/client";
import fs from "fs";
import path from "path";

export const sendFile = (url: string, filePath: string) => {
  const search = path
    .normalize(filePath)
    .replace(path.join(process.env.ROOT_PATH, "files"), "");
  const [_searchm, pathname, filename] = search.match(/(.+)[\/\\](.+)$/);
  fs.readFile(filePath, (e, data) => {
    if (e) throw e;
    clients.send(url, data, { path: pathname, file: filename });
  });
};
