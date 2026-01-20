import { NextRequest } from "next/server";

/**
 * Build Cookie header string from request cookies
 * Forward all cookies from the original request to backend
 */
export function buildCookieHeader(request: NextRequest): string {
  const cookies: string[] = [];
  
  // Get all cookies from request
  request.cookies.getAll().forEach((cookie) => {
    cookies.push(`${cookie.name}=${cookie.value}`);
  });
  
  return cookies.join("; ");
}

/**
 * Build headers for backend request with cookies and locale
 */
export function buildBackendHeaders(
  request: NextRequest,
  additionalHeaders: Record<string, string> = {}
): HeadersInit {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...additionalHeaders,
  };

  // Get locale from headers
  const locale = request.headers.get("Accept-Language") || 
                 request.headers.get("X-Locale") || 
                 "vi";
  
  headers["Accept-Language"] = locale;
  headers["X-Locale"] = locale;

  // Forward all cookies
  const cookieHeader = buildCookieHeader(request);
  if (cookieHeader) {
    headers["Cookie"] = cookieHeader;
  }

  // Forward Authorization header if present
  const authHeader = request.headers.get("Authorization");
  if (authHeader) {
    headers["Authorization"] = authHeader;
  }

  return headers;
}

