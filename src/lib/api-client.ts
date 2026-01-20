/**
 * API Client utility for making requests to backend
 * Automatically includes locale headers, credentials, and auth tokens
 */

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

export interface ApiRequestOptions extends RequestInit {
  locale?: string;
  requireAuth?: boolean;
}

export async function apiRequest(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<Response> {
  const { locale, headers = {}, requireAuth = true, ...fetchOptions } = options;
  
  const defaultHeaders = new Headers({
    "Content-Type": "application/json",
  });

  if (locale) {
    defaultHeaders.set("Accept-Language", locale);
    defaultHeaders.set("X-Locale", locale);
  }

  // Add auth token if available and required
  if (requireAuth && typeof window !== 'undefined') {
    const authStorage = localStorage.getItem('auth-storage');
    if (authStorage) {
      try {
        const auth = JSON.parse(authStorage);
        if (auth.state?.accessToken) {
          defaultHeaders.set("Authorization", `Bearer ${auth.state.accessToken}`);
        }
      } catch {
        // Ignore parse errors
      }
    }
  }

  // Merge custom headers
  Object.entries(headers).forEach(([key, value]) => {
    if (value) {
      defaultHeaders.set(key, value as string);
    }
  });

  const response = await fetch(`${BACKEND_URL}${endpoint}`, {
    ...fetchOptions,
    headers: defaultHeaders,
    credentials: "include", // Always include cookies
  });

  // Handle 401 - Unauthorized
  if (response.status === 401 && requireAuth && typeof window !== 'undefined') {
    // Clear auth and redirect to login
    localStorage.removeItem('auth-storage');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
    const currentPath = window.location.pathname;
    const locale = currentPath.split('/')[1] || 'vi';
    window.location.href = `/${locale}/auth/login`;
  }

  return response;
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

