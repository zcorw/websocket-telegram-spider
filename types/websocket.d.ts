declare type BodyType = "buffer" | "string" | "json";

declare interface MessageBuffer {
  type: "buffer";
  data: Buffer;
}
declare interface MessageString {
  type: "string";
  data: string;
}
declare interface MessageJson {
  type: "json";
  data: { [key: string]: any };
}

declare type MessageType = MessageBuffer | MessageString | MessageJson;
