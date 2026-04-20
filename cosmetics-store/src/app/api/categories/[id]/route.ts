import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import { Category } from "@/features/products/models/category.model";
import { withAdminAuth } from "@/middleware/auth.middleware";

// DELETE Category
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  return withAdminAuth(req, async (req) => {
    try {
      await connectToDatabase();
      const { id } = await params;

      if (!id) {
        return NextResponse.json({ message: "Category ID is required" }, { status: 400 });
      }

      const deleted = await Category.findByIdAndDelete(id);
      if (!deleted) {
        return NextResponse.json({ message: "Category not found" }, { status: 404 });
      }

      return NextResponse.json({ message: "Category deleted successfully" }, { status: 200 });
    } catch (err: any) {
      console.error("DELETE Category Error:", err);
      return NextResponse.json({ message: err.message }, { status: 500 });
    }
  });
}

// UPDATE Category
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  return withAdminAuth(req, async (req) => {
    try {
      await connectToDatabase();
      const { id } = await params;
      const body = await req.json();

      if (!id) {
        return NextResponse.json({ message: "Category ID is required" }, { status: 400 });
      }

      const updated = await Category.findByIdAndUpdate(
        id, 
        {
          ...body,
          image: body.image || "",
          description: body.description || ""
        }, 
        { new: true, runValidators: true }
      );
      if (!updated) {
        return NextResponse.json({ message: "Category not found" }, { status: 404 });
      }

      return NextResponse.json({
        success: true,
        message: "Category updated successfully",
        data: updated
      }, { status: 200 });
    } catch (err: any) {
      console.error("UPDATE Category Error:", err);
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
  });
}

// GET single Category
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const { id } = await params;

    const category = await Category.findById(id);
    if (!category) {
      return NextResponse.json({ message: "Category not found" }, { status: 404 });
    }

    return NextResponse.json(category);
  } catch (err: any) {
    console.error("GET Category Error:", err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
