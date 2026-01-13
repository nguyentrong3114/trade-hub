/**
 * API Client utility for making requests to backend
 * Automatically includes locale headers and credentials
 */

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

export interface ApiRequestOptions extends RequestInit {
  locale?: string;
}

export async function apiRequest(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<Response> {
  const { locale, headers = {}, ...fetchOptions } = options;


  const defaultHeaders = new Headers({
    "Content-Type": "application/json",
  });

  if (locale) {
    defaultHeaders.set("Accept-Language", locale);
    defaultHeaders.set("X-Locale", locale);
  }

  return fetch(`${BACKEND_URL}${endpoint}`, {
    ...fetchOptions,
    headers: defaultHeaders,
    credentials: "include", // Always include cookies
  });
}

export async function apiRequestJson<T = unknown>(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const response = await apiRequest(endpoint, options);

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: `HTTP error! status: ${response.status}`,
    }));
    throw new Error(error.message || "Request failed");
  }

  return response.json();
}

