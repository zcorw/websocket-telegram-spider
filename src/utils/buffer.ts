import {Buffer} from 'buffer';
import short from 'short-uuid';
import utils from '@/utils';
const translator = short(short.constants.cookieBase90);

const VERSION_SIZE = 4;
const HEAD_SIZE_START = VERSION_SIZE;
const HEAD_SIZE = 4;
const ID_SIZE_START = utils.sum([HEAD_SIZE_START, HEAD_SIZE]);
const ID_SIZE = 16;
const URL_SIZE_START = utils.sum([ID_SIZE_START, ID_SIZE]);
const URL_SIZE = 4;
const BODYTYPE_SIZE_START = utils.sum([URL_SIZE_START, URL_SIZE]);
const BODYTYPE_SIZE = 4;
const BODYLEN_SIZE_START = utils.sum([BODYTYPE_SIZE_START, BODYTYPE_SIZE]);
const BODYLEN_SIZE = 16;
const OPTION_SIZE_START = utils.sum([BODYLEN_SIZE_START, BODYLEN_SIZE]);
const OPTION_SIZE = 32;

const version = Buffer.alloc(VERSION_SIZE);
version.writeInt16BE(0x01);
const headSize = Buffer.alloc(HEAD_SIZE);
headSize.writeInt16BE(0x50);

export const create = (url: string, data: any) => {
  const id = Buffer.alloc(ID_SIZE);
  id.write(translator.new());
  const urlSize = Buffer.alloc(URL_SIZE);
  urlSize.writeInt16BE(url.length);
  const bodyType = Buffer.alloc(BODYTYPE_SIZE);
  const bodySize = Buffer.alloc(BODYLEN_SIZE);
  let bodyBuf: Buffer;
  if (Buffer.isBuffer(data)) {
    bodyType.writeInt16BE(1);
    bodySize.writeInt16BE(data.length);
    bodyBuf = data;
  } else if (typeof data === 'string') {
    bodyType.writeInt16BE(2);
    bodySize.writeInt16BE(data.length);
    bodyBuf = Buffer.from(data);
  } else {
    bodyType.writeInt16BE(3);
    const _data = JSON.stringify(data);
    bodySize.writeInt16BE(_data.length);
    bodyBuf = Buffer.from(_data);
  }
  const options = Buffer.alloc(OPTION_SIZE);
  const urlBuf = Buffer.from(url);
  return Buffer.concat([version, headSize, id, urlSize, bodyType, bodySize, options, urlBuf, bodyBuf]);
}

export const parse = (buf: Buffer): {id: string, url: string, type: BodyType, data: any} => {
  const headSize = buf.slice(VERSION_SIZE, utils.sum([VERSION_SIZE, HEAD_SIZE])).readInt16BE();
  const head = buf.slice(0, headSize);
  const body = buf.slice(headSize);
  const id = head.slice(ID_SIZE_START, utils.sum([ID_SIZE_START, ID_SIZE])).toString();
  const urlSize = head.slice(URL_SIZE_START, utils.sum([URL_SIZE_START, URL_SIZE])).readInt16BE();
  const bodyType = head.slice(BODYTYPE_SIZE_START, utils.sum([BODYTYPE_SIZE_START, BODYTYPE_SIZE])).readInt16BE();
  const bodySize = head.slice(BODYLEN_SIZE_START, utils.sum([BODYLEN_SIZE_START, BODYLEN_SIZE])).readInt16BE();
  const options = head.slice(OPTION_SIZE_START, utils.sum([OPTION_SIZE_START, OPTION_SIZE]));
  const url = body.slice(0, urlSize).toString();
  const data = body.slice(urlSize);
  const bufBody = utils.bufferParse(bodyType, data);
  
  return {
    id,
    url,
    type: bufBody.type,
    data: bufBody.data,
  }
}