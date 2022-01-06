import {Buffer} from 'buffer';
import utils from '@/utils';

const version = Buffer.from([0x01]);
const headSize = Buffer.from([0x54]);

export const send = (url: string, data: any) => {
  const buffer = Buffer.from([]);
  const id = utils.uuid();
  
}