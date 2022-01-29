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
        writer.end();
      } catch (e) {
        console.error(e);
      }
    } else {
      reject();
    }
  });
};

export const readFileList = (dir: string, filesList: string[] = []) => {
  const files = fs.readdirSync(dir);
  files.forEach((item) => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      readFileList(path.join(dir, item), filesList);
    } else {
      filesList.push(fullPath);
    }
  });
  return filesList;
};

export const debounce = (fn: (...params: any[]) => void, delay: number) => {
  let timer: NodeJS.Timeout; // 维护一个 timer
  return function (...params: any[]) {
    let _this = this; // 取debounce执行作用域的this
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      fn.apply(_this, params); // 用apply指向调用debounce的对象，相当于_this.fn(args);
    }, delay);
  };
};
