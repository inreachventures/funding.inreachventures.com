export type AuthStatus =
  | {status: 'Initial'}
  | {status: 'Authorised'; token: string; unauthorise(): void}
  | {status: 'Unauthorised'; authorise(token: string): void};
