import { apiRequest, apiRequestJson } from "./api-client";

interface CheckAuthBackendResponse {
  success: boolean;
  message?: string;
  isAuthenticated?: boolean;
  data?: {
    user?: any;
    accessToken?: string;
  };
}

export async function checkAuthApi(): Promise<CheckAuthBackendResponse> {
  // Gọi trực tiếp backend: /api/auth/check-auth (cách 2)
  return apiRequestJson<CheckAuthBackendResponse>("/api/auth/check-auth", {
    // KHÔNG dùng requireAuth ở đây để tránh api-client tự redirect 401
    // Check-auth chỉ cần biết trạng thái, không tự chuyển trang
    requireAuth: false,
  });
}

export async function logoutApi(): Promise<void> {
  await apiRequest("/api/auth/logout", {
    method: "POST",
    requireAuth: true,
  });
}


