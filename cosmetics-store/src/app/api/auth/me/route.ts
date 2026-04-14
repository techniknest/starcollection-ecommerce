import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/middleware/auth.middleware";
import { getUserById } from "@/features/auth/services/auth.service";

export async function GET(req: NextRequest) {
  // Wrap route with authentication layer
  return withAuth(req, async (req, payload) => {
    try {
      if (payload.role === "admin") {
        return NextResponse.json(
          {
            user: {
              _id: "admin_id",
              name: "System Admin",
              email: payload.email,
              role: "admin",
            },
          },
          { status: 200 }
        );
      }

      if (!payload.userId) {
        return NextResponse.json({ error: "User ID missing in token" }, { status: 400 });
      }

      const user = await getUserById(payload.userId);
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
