import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import { Promotion } from "@/features/promotions/models/promotion.model";
import { withAdminAuth } from "@/middleware/auth.middleware";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  return withAdminAuth(req, async (req) => {
    try {
      const { id } = await params;
      if (!id) {
        return NextResponse.json(
          { success: false, message: "Promotion ID is required" },
          { status: 400 }
        );
      }

      await connectToDatabase();
      const deletedPromo = await Promotion.findByIdAndDelete(id);

      if (!deletedPromo) {
        return NextResponse.json(
          { success: false, message: "Promotion not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { success: true, message: "Promotion deleted successfully" },
        { status: 200 }
      );
    } catch (error: any) {
      console.error("DELETE Promotion Error:", error);
      return NextResponse.json(
        { success: false, message: "Server error while deleting promotion" },
        { status: 500 }
      );
    }
  });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  return withAdminAuth(req, async (req) => {
    try {
      const { id } = await params;
      const body = await req.json();

      if (!id) {
        return NextResponse.json(
          { success: false, message: "Promotion ID is required" },
          { status: 400 }
        );
      }

      await connectToDatabase();
      const updatedPromo = await Promotion.findByIdAndUpdate(
        id,
        {
          title: body.title,
          discountPercentage: body.discountPercentage,
          startDate: new Date(body.startDate),
          endDate: new Date(body.endDate),
          targetType: body.targetType,
          targetId: body.targetId || null,
          isActive: body.isActive ?? true,
        },
        { returnDocument: "after", runValidators: true }
      );

      if (!updatedPromo) {
        return NextResponse.json(
          { success: false, message: "Promotion not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Promotion updated successfully",
        data: updatedPromo,
      });
    } catch (error: any) {
      console.error("PUT Promotion Error:", error);
      return NextResponse.json(
        { success: false, message: "Server error while updating promotion" },
        { status: 500 }
      );
    }
  });
}
