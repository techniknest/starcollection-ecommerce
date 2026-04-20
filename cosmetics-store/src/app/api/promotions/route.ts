import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import { Promotion } from "@/features/promotions/models/promotion.model";
import { withAdminAuth } from "@/middleware/auth.middleware";

// Public GET: Fetch active promotions (could be used by frontend for badges)
export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const isAdmin = searchParams.get("admin") === "true";

    let query = {};
    if (!isAdmin) {
      const now = new Date();
      query = {
        isActive: true,
        startDate: { $lte: now },
        endDate: { $gte: now },
      };
    }

    const promotions = await Promotion.find(query).sort({ startDate: -1 });
    return NextResponse.json({ success: true, count: promotions.length, data: promotions });
  } catch (error: any) {
    console.error("GET Promotions Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error while fetching promotions" },
      { status: 500 }
    );
  }
}

// Admin POST: Create a new promotion
export async function POST(req: any) {
  return withAdminAuth(req, async (req) => {
    try {
      const body = await req.json();
      
      if (!body.title || !body.discountPercentage || !body.startDate || !body.endDate) {
        return NextResponse.json(
          { success: false, message: "Missing required fields" },
          { status: 400 }
        );
      }

      await connectToDatabase();
      
      const promotion = await Promotion.create({
        title: body.title,
        discountPercentage: body.discountPercentage,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        targetType: body.targetType || "all",
        targetId: body.targetId || null,
      });

      return NextResponse.json(
        { success: true, message: "Promotion scheduled successfully", data: promotion },
        { status: 201 }
      );
    } catch (error: any) {
      console.error("POST Promotion Error:", error);
      return NextResponse.json(
        { success: false, message: "Server error while scheduling promotion" },
        { status: 500 }
      );
    }
  });
}
