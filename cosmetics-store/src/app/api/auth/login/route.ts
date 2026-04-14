import { NextRequest, NextResponse } from "next/server";
import { LoginValidator } from "@/features/auth/validators/auth.validator";
import { loginUser } from "@/features/auth/services/auth.service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate Input
    const parseResult = LoginValidator.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parseResult.error.issues },
        { status: 400 }
      );
    }

    const { user, accessToken, refreshToken } = await loginUser(
      parseResult.data
    );

    const response = NextResponse.json(
      {
        message: "Login successful",
        user,
        accessToken, // Kept in memory by frontend
      },
      { status: 200 }
    );

    // Set Refresh Token HTTP-only cookie
    response.cookies.set("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error: any) {
    if (error.message === "Invalid credentials") {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }
    console.error("Login Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
