import 'reflect-metadata';
import 'core-js/features/array';
global.atob = (str) => new Buffer(str, 'base64').toString('binary');
