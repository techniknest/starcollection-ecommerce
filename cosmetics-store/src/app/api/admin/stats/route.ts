import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import { Product } from "@/features/products/models/product.model";
import { Category } from "@/features/products/models/category.model";
import { Review } from "@/features/reviews/models/review.model";
import { Promotion } from "@/features/promotions/models/promotion.model";
import { withAdminAuth } from "@/middleware/auth.middleware";

export async function GET(req: NextRequest) {
  return withAdminAuth(req, async () => {
    try {
      await connectToDatabase();

      const [productCount, categoryCount, reviewCount, activePromotionsCount] = await Promise.all([
        Product.countDocuments(),
        Category.countDocuments(),
        Review.countDocuments(),
        Promotion.countDocuments({
          isActive: true,
          endDate: { $gte: new Date() }
        })
      ]);

      return NextResponse.json({
        success: true,
        data: {
          products: productCount,
          categories: categoryCount,
          reviews: reviewCount,
          promotions: activePromotionsCount,
        },
      });
    } catch (error: any) {
      console.error("Stats API Error:", error);
      return NextResponse.json(
        { success: false, message: "Failed to fetch admin statistics" },
        { status: 500 }
      );
    }
  });
}
