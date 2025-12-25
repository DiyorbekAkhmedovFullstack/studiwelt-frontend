import { QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { lazy, Suspense } from "react";
import { queryClient } from "../lib/queryClient";

// Lazy load DevTools only in development
const ReactQueryDevtools = import.meta.env.DEV
  ? lazy(() =>
      import("@tanstack/react-query-devtools").then((module) => ({
        default: module.ReactQueryDevtools,
      })),
    )
  : () => null;

type QueryProviderProps = {
  children: ReactNode;
};

export function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {import.meta.env.DEV && (
        <Suspense fallback={null}>
          <ReactQueryDevtools initialIsOpen={false} />
        </Suspense>
      )}
    </QueryClientProvider>
  );
}
