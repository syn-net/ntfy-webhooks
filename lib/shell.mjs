
`use strict`;

import {parseBoolean} from './type.mjs';

export const shell = function(...args) {
  const result = {
    status: 0,
    body: [],
    trace: [],
  };
  let options = {};
  let cmd = [];

  args.forEach((value, index) => {
    if(value) {
      if(value && typeof value == `object`) {
        options = value;
      } else {
        cmd.push(value);
      }
    }
  });

  if(args.length < 1) {
    const errMsg = `Missing function parameter -- command.`;
    result.status = 2;
    result.body.push(errMsg);
    return result;
  }

  const cmdStr = cmd.join(``);

  if(options && parseBoolean(options.dryRun) == true) {
    console.info(`DEBUG: ${cmdStr}`);
    return result;
  } else {
    exec(cmdStr, (err, stdout, stderr) => {
      if(err) {
        result.status = 1;
        result.body.push(err.message);
        result.trace.push(stdout);
        console.error(`ERROR: ${err.message}`);
        return result;
      }

      if(stderr) {
        result.status = 1;
        result.body.push(stderr);
        console.error(`stderr: ${stderr}`);
      }

      if(stdout) {
        result.body.push(stdout);
        console.info(`stdout: ${stdout}`);
      }
      console.log(result);

      return result;
    });
  }
}

const api = {
  shell,
};

export default api;
