import {apiHost} from '../lib/config';
import {Section} from '../lib/section';
import {Submission} from '../lib/form';

export const save = (id: string, sections: Section[]): Promise<Submission> =>
  fetch(`${apiHost}/form/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({submission: {sections}})
  }).then((res) => res.json());

export const submit = (id: string, sections: Section[]): Promise<{}> =>
  fetch(`${apiHost}/form/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({submission: {sections}, submit: true})
  }).then((res) => res.json());

export const latest = (): Promise<Submission> =>
  fetch(`${apiHost}/form`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      Accept: 'application/json'
    }
  }).then((res) => res.json());
