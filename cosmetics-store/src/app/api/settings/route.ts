import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import { Settings } from "@/features/settings/models/settings.model";
import { withAdminAuth } from "@/middleware/auth.middleware";

// GET settings (Public)
export async function GET() {
  try {
    await connectToDatabase();
    let settings = await Settings.findOne();

    // If no settings exist yet, create default entry
    if (!settings) {
      settings = await Settings.create({});
    }

    return NextResponse.json(settings);
  } catch (error: any) {
    console.error("Fetch Settings Error:", error.message);
    return NextResponse.json(
      { success: false, message: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

// POST update settings (Admin only)
export async function POST(req: NextRequest) {
  return withAdminAuth(req, async (req) => {
    try {
      await connectToDatabase();
      const body = await req.json();

      let settings = await Settings.findOne();

      if (!settings) {
        settings = await Settings.create(body);
      } else {
        // Update existing settings
        Object.assign(settings, body);
        await settings.save();
      }

      return NextResponse.json({
        success: true,
        message: "Settings updated successfully",
        settings,
      });
    } catch (error: any) {
      console.error("Update Settings Error:", error.message);
      return NextResponse.json(
        { success: false, message: "Failed to update settings" },
        { status: 500 }
      );
    }
  });
}
