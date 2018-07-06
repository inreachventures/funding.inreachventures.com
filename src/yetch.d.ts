// Yetch polyfills `window.fetch`,  `AbortController` and `AbortSignal` so we
// assume the implementations are faithful and reuse those type definitions

type AC = AbortController;
type AS = AbortSignal;

declare module 'yetch' {
  export const fetch: typeof window.fetch;
  export type AbortController = AC;
  export type AbortSignal = AS;
}
