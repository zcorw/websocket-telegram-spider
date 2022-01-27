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

declare type MessageData = MessageBuffer | MessageString | MessageJson;
declare type MessageType = MessageData & {
  id: string;
  url: string;
  params: { [key: string]: string };
  options: any;
};
