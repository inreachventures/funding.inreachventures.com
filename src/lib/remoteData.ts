export type RemoteData<E, D> =
  | {type: 'NotAsked'}
  | {type: 'Loading'}
  | {type: 'Failure'; error: E}
  | {type: 'Success'; data: D};
