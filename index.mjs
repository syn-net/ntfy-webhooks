#!/usr/bin/env node

`use strict`;

import * as dotenv from 'dotenv';
dotenv.config({
  path: resolve(cwd(), `.env`),
});

import assert from 'node:assert';
import {resolve} from 'node:path';
import {
  argv,
  cwd,
  env as ENV,
  exit,
} from 'node:process';

import express from 'express';
import bodyParser from 'body-parser';
import {
  fetch,
  secureFetch,
} from './lib/fetch.mjs';
import {parseBoolean} from './lib/type.mjs';

const useTLS = parseBoolean(ENV[`NTFY_USE_TLS`]) || false;
const PROTO = useTLS ? `https` : `http`;

const DEBUG =
  ENV[`DEBUG`] && ENV[`DEBUG`] == true || ENV[`DEBUG`] && ENV[`DEBUG`] === `true` || false;
const NTFY_HOSTNAME = ENV[`NTFY_HOSTNAME`] || ``;
const NTFY_PORT = ENV[`NTFY_PORT`] || 443;
const NTFY_PATH = ENV[`NTFY_PATH`] || `/`;
const NTFY_PRIO = ENV[`NTFY_PRIORITY`] || 3 ;

const serverOptions = {
  host: ENV[`APP_HOSTNAME`],
  port: ENV[`APP_PORT`],
};

const fetchOptions = {
  hostname: NTFY_HOSTNAME,
  port: NTFY_PORT,
  path: NTFY_PATH,
  method: `POST`,
  body: {},
  headers: {},
    // 'Content-Type': `application/json`,
  // },
};

const app = express();

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const responseFn = (req, res) => {
  const body = (req.body);
  let channel = JSON.stringify(body.channel);
  const username = JSON.stringify(body.username);
  const icon_emoji = JSON.stringify(body.icon_emoji);
  const text = JSON.stringify(body.text);

  if(channel && channel.length > 0) {
    if(channel.startsWith(`#`) == true) {
      channel = `/` + channel.replace(`#`, ``);
    }
    channel = channel.replaceAll(`"`, ``);
  }
  fetchOptions.body.channel = channel;
  fetchOptions.body.message = text;
  fetchOptions.body.title = `ntfy notification proxy`;
  fetchOptions.body.priority = NTFY_PRIO;
  console.log(`Sending a message as ${fetchOptions.method} to "${PROTO}://${NTFY_HOSTNAME}:${NTFY_PORT}${fetchOptions.path}"`);
  console.log(`Message body:\n\n${JSON.stringify(fetchOptions.body)}`);

  const request = secureFetch(fetchOptions);
  request.on(`error`, (e) => {
    console.error(`ERROR: ${e}`);
  });
  request.end();

  // server-side logging
  console.log(`res.channel:`, channel);
  console.log(`res.username:`, username);
  console.log(`res.icon_emoji:`, icon_emoji);
  console.log(`res.text:`, text);

  // echo back to the client
  res.json(text);
};

app.listen(serverOptions.port, serverOptions.host, (req, res) => {
  console.log(`HTTP app is listening on ${serverOptions.host}:${serverOptions.port}...`);
});

app.get(`/`, responseFn);
app.post(`/`, responseFn);
app.post(`/lan`, responseFn);
app.post(`/messages`, responseFn);

// exit(0);
