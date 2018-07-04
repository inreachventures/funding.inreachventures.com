import {fetch, AbortSignal} from 'yetch';

import {host, apiHost} from '../lib/config';

export const sendLink = (email: string, signal?: AbortSignal) =>
  fetch(`${apiHost}/auth`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, redirect: host}),
    signal
  }).then((res) => res.json());
