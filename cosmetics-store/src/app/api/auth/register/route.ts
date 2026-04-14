import { NextRequest, NextResponse } from "next/server";
import { RegisterValidator } from "@/features/auth/validators/auth.validator";
import { registerUser } from "@/features/auth/services/auth.service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate input payload
    const parseResult = RegisterValidator.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parseResult.error.issues },
        { status: 400 }
      );
    }

    const user = await registerUser(parseResult.data);

    return NextResponse.json(
      { message: "User created successfully", user },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.message.includes("already exists")) {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }
    console.error("Register Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
