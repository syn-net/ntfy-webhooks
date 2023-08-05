
`use strict`;

import {request} from 'node:http';
import {request as secureRequest} from 'node:https';

export const fetch = request;
export const secureFetch = secureRequest;

const api = {
  fetch,
  secureFetch,
};

export default api;
