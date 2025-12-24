import { render, type RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { ProgressProvider } from '../contexts/ProgressContext';
import type { ReactElement, ReactNode } from 'react';

// Create a new QueryClient for each test to avoid shared state
function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Don't retry failed queries in tests
        gcTime: 0, // Don't cache results between tests
      },
      mutations: {
        retry: false,
      },
    },
  });
}

type WrapperProps = {
  children: ReactNode;
};

type RenderWithProvidersOptions = RenderOptions & {
  initialEntries?: string[];
  withRouter?: boolean;
  withAuth?: boolean;
  withProgress?: boolean;
  withQuery?: boolean;
};

/**
 * Custom render function that wraps components with all necessary providers
 */
export function renderWithProviders(
  ui: ReactElement,
  {
    initialEntries = ['/'],
    withRouter = true,
    withAuth = true,
    withProgress = true,
    withQuery = true,
    ...renderOptions
  }: RenderWithProvidersOptions = {},
) {
  const testQueryClient = createTestQueryClient();

  function Wrapper({ children }: WrapperProps) {
    let content = children;

    // Wrap with ProgressProvider if needed
    if (withProgress && withAuth) {
      content = <ProgressProvider>{content}</ProgressProvider>;
    }

    // Wrap with AuthProvider if needed
    if (withAuth) {
      content = <AuthProvider>{content}</AuthProvider>;
    }

    // Wrap with Router if needed
    if (withRouter) {
      content = (
        <MemoryRouter initialEntries={initialEntries}>{content}</MemoryRouter>
      );
    }

    // Wrap with QueryClientProvider if needed
    if (withQuery) {
      content = (
        <QueryClientProvider client={testQueryClient}>
          {content}
        </QueryClientProvider>
      );
    }

    return <>{content}</>;
  }

  return {
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    queryClient: testQueryClient,
  };
}

/**
 * Render with only BrowserRouter (for simple component tests)
 */
export function renderWithRouter(ui: ReactElement, options?: RenderOptions) {
  return render(ui, {
    wrapper: ({ children }) => <BrowserRouter>{children}</BrowserRouter>,
    ...options,
  });
}

/**
 * Render with QueryClient only (for hook tests)
 */
export function renderWithQueryClient(ui: ReactElement, options?: RenderOptions) {
  const testQueryClient = createTestQueryClient();

  return {
    ...render(ui, {
      wrapper: ({ children }) => (
        <QueryClientProvider client={testQueryClient}>
          {children}
        </QueryClientProvider>
      ),
      ...options,
    }),
    queryClient: testQueryClient,
  };
}

// Re-export everything from testing-library
// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
