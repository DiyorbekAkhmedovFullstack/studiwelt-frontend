declare module 'react-dom/static' {
  import type { ReactNode } from 'react';
  import type { Readable } from 'node:stream';

  interface PrerenderOptions {
    onError?: (error: unknown, errorInfo: { componentStack?: string }) => void;
  }

  interface PrerenderResult {
    prelude: Readable;
    postponed: unknown;
  }

  export function prerenderToNodeStream(
    children: ReactNode,
    options?: PrerenderOptions,
  ): Promise<PrerenderResult>;
}
