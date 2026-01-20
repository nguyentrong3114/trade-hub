import { NextRequest, NextResponse } from "next/server";
import { buildBackendHeaders } from "@/lib/api-helpers";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";

export async function GET(request: NextRequest) {
  try {
    // Get auth token from cookies or Authorization header
    const authToken = request.cookies.get("auth-token")?.value || 
                     request.headers.get("Authorization")?.replace("Bearer ", "");

    if (!authToken) {
      return NextResponse.json(
        { success: false, isAuthenticated: false, message: "Chưa đăng nhập" },
        { status: 401 }
      );
    }

    // Forward request to backend to verify token with all cookies and headers
    const backendResponse = await fetch(`${BACKEND_URL}/api/auth/check-auth`, {
      method: "GET",
      headers: buildBackendHeaders(request),
    });

    const data = await backendResponse.json();

    // If backend returns error or not authenticated
    if (!backendResponse.ok || !data.success) {
      return NextResponse.json(
        { 
          success: false, 
          isAuthenticated: false, 
          message: data.message || "Token không hợp lệ" 
        },
        { status: backendResponse.status || 401 }
      );
    }

    // Return user data if authenticated
    return NextResponse.json({
      success: true,
      isAuthenticated: true,
      data: {
        user: data.data?.user || data.user,
        accessToken: authToken,
      },
    });
  } catch (error) {
    console.error("Check auth error:", error);
    
    // Check if backend is not available
    if (error instanceof TypeError && error.message.includes("fetch")) {
      return NextResponse.json(
        { 
          success: false, 
          isAuthenticated: false, 
          message: "Không thể kết nối đến server. Vui lòng thử lại sau." 
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        isAuthenticated: false, 
        message: "Đã có lỗi xảy ra. Vui lòng thử lại sau." 
      },
      { status: 500 }
    );
  }
}

