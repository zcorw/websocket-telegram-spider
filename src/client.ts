import "module-alias/register";
import {create, parse} from '@/utils/buffer';

const buf = create('delete', 'a new happy');
console.log(parse(buf));
