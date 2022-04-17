import 'reflect-metadata';
import 'core-js/features/array';
import { TextEncoder } from 'util';

if (!global.TextEncoder) {
  global.TextEncoder = TextEncoder;
}

global.atob = (str) => Buffer.from(str, 'base64').toString('binary');
