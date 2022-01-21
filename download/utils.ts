import fs from "fs";

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
