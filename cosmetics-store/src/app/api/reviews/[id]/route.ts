import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import { Review } from "@/features/reviews/models/review.model";
import { withAdminAuth } from "@/middleware/auth.middleware";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  return withAdminAuth(req, async (req) => {
    try {
      const { id } = params;
      if (!id) {
        return NextResponse.json(
          { success: false, message: "Review ID is required" },
          { status: 400 }
        );
      }

      await connectToDatabase();
      const deletedReview = await Review.findByIdAndDelete(id);

      if (!deletedReview) {
        return NextResponse.json(
          { success: false, message: "Review not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { success: true, message: "Review deleted successfully" },
        { status: 200 }
      );
    } catch (error: any) {
      console.error("DELETE Review Error:", error);
      return NextResponse.json(
        { success: false, message: "Server error while deleting review" },
        { status: 500 }
      );
    }
  });
}
