// Yetch polyfills `window.fetch` and `AbortController` so we assume the
// implementation is faithful and reuse those type definitions

type AC = AbortController;
type AS = AbortSignal;

declare module 'yetch' {
  export const fetch: typeof window.fetch;
  export type AbortController = AC;
  export type AbortSignal = AS;
}
