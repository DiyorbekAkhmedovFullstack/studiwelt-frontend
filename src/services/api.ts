import type { z } from 'zod';
import type { ApiEnvelope } from '../types/api';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8085';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type ApiOptions = {
  method?: HttpMethod;
  body?: unknown;
  headers?: Record<string, string>;
  schema?: z.ZodTypeAny;
};

// Validation error class for schema validation failures
export class ApiValidationError extends Error {
  errors: z.ZodError;
  constructor(message: string, errors: z.ZodError) {
    super(message);
    this.name = 'ApiValidationError';
    this.errors = errors;
  }
}

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
  const data = payload?.data ?? {};

  // Validate with schema if provided
  if (options.schema) {
    const result = options.schema.safeParse(data);
    if (!result.success) {
      console.error('API response validation failed:', result.error.format());
      throw new ApiValidationError(
        `API response validation failed for ${endpoint}`,
        result.error,
      );
    }
    return result.data as TData;
  }

  return data as TData;
}

export const api = {
  get: <TData>(endpoint: string, schema?: z.ZodTypeAny) =>
    apiCall<TData>(endpoint, { method: 'GET', schema }),

  post: <TData>(endpoint: string, body?: unknown, schema?: z.ZodTypeAny) =>
    apiCall<TData>(endpoint, { method: 'POST', body, schema }),

  put: <TData>(endpoint: string, body?: unknown, schema?: z.ZodTypeAny) =>
    apiCall<TData>(endpoint, { method: 'PUT', body, schema }),

  patch: <TData>(endpoint: string, body?: unknown, schema?: z.ZodTypeAny) =>
    apiCall<TData>(endpoint, { method: 'PATCH', body, schema }),

  delete: <TData>(endpoint: string, schema?: z.ZodTypeAny) =>
    apiCall<TData>(endpoint, { method: 'DELETE', schema }),
};

export { API_BASE_URL };
