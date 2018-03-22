import {host, apiHost} from '../lib/config';

export const sendLink = (email: string) =>
  fetch(`${apiHost}/auth`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, redirect: host})
  }).then((res) => res.json());
