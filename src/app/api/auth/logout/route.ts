import { NextRequest, NextResponse } from "next/server";
import { buildBackendHeaders } from "@/lib/api-helpers";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";

export async function POST(request: NextRequest) {
  try {
    // Get auth token from cookies or Authorization header
    const authToken = request.cookies.get("auth-token")?.value || 
                     request.headers.get("Authorization")?.replace("Bearer ", "");

    // Forward logout request to backend with all cookies and headers
    if (authToken) {
      try {
        await fetch(`${BACKEND_URL}/api/auth/logout`, {
          method: "POST",
          headers: buildBackendHeaders(request),
        });
      } catch (error) {
        // Continue even if backend logout fails
        console.error("Backend logout error:", error);
      }
    }

    // Clear cookies
    const response = NextResponse.json({
      success: true,
      message: "Đăng xuất thành công",
    });

    // Clear auth-token cookie
    response.cookies.delete("auth-token");
    response.cookies.set("auth-token", "", {
      expires: new Date(0),
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    
    // Even on error, clear cookies
    const response = NextResponse.json({
      success: true,
      message: "Đăng xuất thành công",
    });

    response.cookies.delete("auth-token");
    response.cookies.set("auth-token", "", {
      expires: new Date(0),
      path: "/",
    });

    return response;
  }
}

