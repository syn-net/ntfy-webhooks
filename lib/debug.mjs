
`use strict`;

import {
  env as ENV,
} from 'node:process';

import {parseBoolean} from './type.mjs';

const DEBUG = parseBoolean(ENV[`DEBUG`]) || false;

console.debug = function(message = ``, ...args) {
  if(DEBUG && (DEBUG == "1" || DEBUG == "true")) {
    console.info(message, ...args);
  }
};
