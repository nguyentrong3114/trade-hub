import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Forward request to backend
    const backendResponse = await fetch(`${BACKEND_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Forward cookies from original request if needed
        ...(request.cookies.get("auth-token") && {
          Cookie: `auth-token=${request.cookies.get("auth-token")?.value}`,
        }),
      },
      body: JSON.stringify(body),
    });

    const data = await backendResponse.json();

    // If backend returns error, forward it
    if (!backendResponse.ok) {
      return NextResponse.json(
        { success: false, message: data.message || "Đăng ký thất bại" },
        { status: backendResponse.status }
      );
    }

    // Create response with backend data
    const response = NextResponse.json({
      success: true,
      message: data.message || "Đăng ký thành công",
      data: data.data,
    });

    // Forward all Set-Cookie headers from backend
    const setCookieHeaders = backendResponse.headers.getSetCookie();
    if (setCookieHeaders && setCookieHeaders.length > 0) {
      setCookieHeaders.forEach((cookie) => {
        response.headers.append("Set-Cookie", cookie);
      });
    }

    return response;
  } catch (error) {
    console.error("Register proxy error:", error);
    
    // Check if backend is not available
    if (error instanceof TypeError && error.message.includes("fetch")) {
      return NextResponse.json(
        { success: false, message: "Không thể kết nối đến server. Vui lòng thử lại sau." },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Đã có lỗi xảy ra. Vui lòng thử lại sau." },
      { status: 500 }
    );
  }
}
