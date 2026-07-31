import { env } from '@/config/env';
import { tokenStorage } from '@/lib/auth/token-storage';
import { ApiError, type ApiErrorResponse } from '@/types/api';

interface ApiRequestOptions extends RequestInit {
  requireAuth?: boolean;
}

const parseResponseBody = async <T>(response: Response): Promise<T | null> => {
  const contentType = response.headers.get('content-type');

  if (!contentType?.includes('application/json')) {
    return null;
  }

  return (await response.json()) as T;
};

const createHeaders = (options: ApiRequestOptions): Headers => {
  const headers = new Headers(options.headers);

  if (!headers.has('Accept')) {
    headers.set('Accept', 'application/json');
  }

  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  if (options.requireAuth) {
    const accessToken = tokenStorage.getAccessToken();

    if (!accessToken) {
      throw new ApiError('Authentication token is not available.', 401);
    }

    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  return headers;
};

export const apiClient = async <T>(
  endpoint: string,
  options: ApiRequestOptions = {},
): Promise<T> => {
  const response = await fetch(`${env.apiBaseUrl}${endpoint}`, {
    ...options,
    headers: createHeaders(options),
  });

  const responseBody = await parseResponseBody<T | ApiErrorResponse>(response);

  if (!response.ok) {
    const errorBody = responseBody as ApiErrorResponse | null;

    if (response.status === 401 && options.requireAuth) {
      tokenStorage.removeAccessToken();

      window.dispatchEvent(new CustomEvent('auth:unauthorized'));
    }

    throw new ApiError(
      errorBody?.message ?? 'Something went wrong. Please try again.',
      response.status,
      errorBody?.errors,
    );
  }

  if (!responseBody) {
    throw new ApiError(
      'The backend returned an empty response.',
      response.status,
    );
  }

  return responseBody as T;
};
