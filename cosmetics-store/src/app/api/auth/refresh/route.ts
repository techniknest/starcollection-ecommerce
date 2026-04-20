import { NextRequest, NextResponse } from "next/server";
import { verifyToken, generateAccessToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get("refresh_token")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { success: false, message: "Missing refresh token" },
        { status: 401 }
      );
    }

    // Verify the refresh token
    const payload = verifyToken(refreshToken, "refresh");

    // Generate a new access token
    // We explicitly extract fields to avoid passing iat/exp from the old payload
    const newAccessToken = generateAccessToken({
      userId: payload.userId,
      role: payload.role,
      email: payload.email,
    });

    return NextResponse.json({
      success: true,
      accessToken: newAccessToken,
    });
  } catch (error: any) {
    console.error("Token Refresh Error:", error.message);
    return NextResponse.json(
      { success: false, message: "Invalid or expired refresh token" },
      { status: 401 }
    );
  }
}
