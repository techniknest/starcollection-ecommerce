import { verifyToken } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

/**
 * Middleware wrapper for protected API routes.
 * Takes the request and the actual route handler.
 */
export async function withAuth(
  req: NextRequest,
  handler: (req: NextRequest, payload: { userId?: string, role: string, email?: string }) => Promise<NextResponse>
) {
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("Auth Middleware: Missing or invalid Authorization header");
      return NextResponse.json(
        { error: "Unauthorized: Missing token" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    
    if (token === "undefined" || token === "null") {
      console.log("Auth Middleware: Token is string 'undefined' or 'null'");
      return NextResponse.json(
        { error: "Unauthorized: Invalid token format" },
        { status: 401 }
      );
    }

    // Verify access token
    const payload = verifyToken(token, "access");

    // Pass control to the route handler, injecting the authenticated payload
    return handler(req, payload);
  } catch (error: any) {
    console.error("Auth Middleware Error:", error.message);
    return NextResponse.json(
      { error: `Unauthorized: ${error.message}` },
      { status: 401 }
    );
  }
}

/**
 * Specifically for admin protected API routes.
 */
export async function withAdminAuth(
  req: NextRequest,
  handler: (req: NextRequest, payload: { role: string, email?: string }) => Promise<NextResponse>
) {
  return withAuth(req, async (req, payload) => {
    if (payload.role !== "admin") {
      return NextResponse.json(
        { error: "Forbidden: Admin access required" },
        { status: 403 }
      );
    }
    return handler(req, payload as any);
  });
}
