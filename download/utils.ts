import fs from "fs";
import path from "path";

export const toBase64: (buffer: Buffer) => string = (buffer: Buffer) => {
  return buffer.toString("base64");
};

export const getFileBuffer: (filePath: string) => Buffer = (filePath: string) =>
  fs.readFileSync(filePath);

export const generateUniqueId: () => Promise<string> = async () => {
  let sourceId =
    "Spider" +
    "_" +
    Math.round(new Date().getTime() / 1000) +
    "_" +
    Math.random();
  let hashedId = await toBase64(Buffer.from(sourceId));

  return hashedId;
};

export const mkdir: (dirpath: string) => boolean = (dirpath) => {
  if (fs.existsSync(dirpath)) {
    return true;
  } else {
    if (mkdir(path.dirname(dirpath))) {
      fs.mkdirSync(dirpath);
      return true;
    }
  }
};

export const saveFile: (
  buffer: Buffer,
  dirpath: string,
  filename: string,
) => void = (buffer, dirpath, filename) => {
  return new Promise<void>((resolve, reject) => {
    if (mkdir(dirpath)) {
      try {
        const writer = fs.createWriteStream(path.join(dirpath, filename));
        writer.on("finish", () => {
          resolve();
        });
        writer.write(buffer);
      } catch (e) {
        console.error(e);
      }
    } else {
      reject();
    }
  });
};
