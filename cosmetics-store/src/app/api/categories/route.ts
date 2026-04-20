import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import { Category } from "@/features/products/models/category.model";
import { withAdminAuth } from "@/middleware/auth.middleware";

export async function GET() {
  try {
    await connectToDatabase();
    const categories = await Category.find({}).sort({ createdAt: -1 });
    return NextResponse.json(categories);
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  return withAdminAuth(req, async (req) => {
    try {
      await connectToDatabase();
      const body = await req.json();
      
      if (!body.name) {
        return NextResponse.json({ message: "Category name is required" }, { status: 400 });
      }

      console.log("Creating category with data:", {
        name: body.name,
        image: body.image || "EMPTY_STRING",
        description: body.description || "EMPTY_STRING"
      });

      const newCategory = new Category({
        name: body.name,
        image: body.image || "",
        description: body.description || "",
        featured: body.featured || false
      });

      await newCategory.save();
      return NextResponse.json({
        success: true,
        message: "Category created successfully",
        data: newCategory
      }, { status: 201 });
    } catch (err: any) {
      console.error("POST Category Mongo Error:", err);
      // If it's a validation error, we return the specific message
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
  });
}
