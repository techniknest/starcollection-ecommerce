import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/middleware/auth.middleware";
import { getUserById } from "@/features/auth/services/auth.service";

export async function GET(req: NextRequest) {
  // Wrap route with authentication layer
  return withAuth(req, async (req, userId) => {
    try {
      const user = await getUserById(userId);
      return NextResponse.json({ user }, { status: 200 });
    } catch (error: any) {
      if (error.message === "User not found") {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      console.error("Get Me Error:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  });
}
