import {fetch, AbortSignal} from 'yetch';

import {apiHost} from '../lib/config';
import {Section} from '../lib/section';
import {Submission} from '../lib/form';

export const save = (
  id: string,
  sections: Section[],
  signal?: AbortSignal
): Promise<Submission> =>
  fetch(`${apiHost}/form/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({submission: {sections}}),
    signal
  }).then((res) => res.json());

export const submit = (
  id: string,
  sections: Section[],
  signal?: AbortSignal
): Promise<{}> =>
  fetch(`${apiHost}/form/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({submission: {sections}, submit: true}),
    signal
  }).then((res) => res.json());

export const latest = (signal?: AbortSignal): Promise<Submission> =>
  fetch(`${apiHost}/form`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      Accept: 'application/json'
    },
    signal
  }).then((res) => res.json());
