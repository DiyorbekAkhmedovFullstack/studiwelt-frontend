import type { ApiEnvelope } from '../types/api';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8085';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type ApiOptions = {
  method?: HttpMethod;
  body?: unknown;
  headers?: Record<string, string>;
};

async function apiCall<TData>(
  endpoint: string,
  options: ApiOptions = {},
): Promise<TData> {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Determine if body is FormData (for file uploads)
  const isFormData = options.body instanceof FormData;

  // Don't set Content-Type header for FormData (browser sets it with boundary)
  if (isFormData) {
    delete defaultHeaders['Content-Type'];
  }

  const response = await fetch(url, {
    method: options.method ?? 'GET',
    credentials: 'include',
    headers: defaultHeaders,
    body:
      options.body === undefined
        ? undefined
        : isFormData
          ? (options.body as FormData)
          : typeof options.body === 'string'
            ? options.body
            : JSON.stringify(options.body),
  });

  let payload: ApiEnvelope<unknown> | null = null;

  try {
    payload = (await response.json()) as ApiEnvelope<unknown>;
  } catch {
    // Non-JSON response (unexpected from this backend) – treat as generic error.
    if (!response.ok) {
      throw new Error('API request failed');
    }
  }

  if (!response.ok) {
    const message =
      (payload && payload.message) || `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  // Successful response: backend wraps actual payload in `data`.
  return (payload?.data as TData) ?? ({} as TData);
}

export const api = {
  get: <TData>(endpoint: string) =>
    apiCall<TData>(endpoint, { method: 'GET' }),
  post: <TData>(endpoint: string, body?: unknown) =>
    apiCall<TData>(endpoint, { method: 'POST', body }),
  put: <TData>(endpoint: string, body?: unknown) =>
    apiCall<TData>(endpoint, { method: 'PUT', body }),
  patch: <TData>(endpoint: string, body?: unknown) =>
    apiCall<TData>(endpoint, { method: 'PATCH', body }),
  delete: <TData>(endpoint: string) =>
    apiCall<TData>(endpoint, { method: 'DELETE' }),
};

export { API_BASE_URL };
