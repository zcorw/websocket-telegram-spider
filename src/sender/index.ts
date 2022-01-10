import { clients } from "@/server/client";
import fs from "fs";

export const sendFile = (url: string, filePath: string) => {
  fs.readFile(filePath, (e, data) => {
    if (e) throw e;
    clients.send(url, data);
  });
};
