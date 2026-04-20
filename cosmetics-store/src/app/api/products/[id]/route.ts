import { NextRequest, NextResponse } from "next/server";
import { productService } from "@/features/products/services/product.service";
import mongoose from "mongoose";
import { withAdminAuth } from "@/middleware/auth.middleware";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid product ID format" },
        { status: 400 }
      );
    }

    const product = await productService.getProductById(id);
    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: product });
  } catch (error: any) {
    console.error("GET Single Product Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error while fetching product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid product ID format" },
        { status: 400 }
      );
    }

    const deletedProduct = await productService.deleteProduct(id);
    if (!deletedProduct) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
      data: deletedProduct,
    });
  } catch (error: any) {
    console.error("DELETE Product Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error while deleting product" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return withAdminAuth(req, async (req) => {
    try {
      const { id } = await params;
      const body = await req.json();

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json(
          { success: false, message: "Invalid product ID format" },
          { status: 400 }
        );
      }

      // 1. Find product
      const product = await productService.getProductById(id);
      if (!product) {
        return NextResponse.json(
          { success: false, message: "Product not found" },
          { status: 404 }
        );
      }

      // 2. Update record
      const updatedProduct = await productService.updateProduct(id, body);

      return NextResponse.json({
        success: true,
        message: "Product updated successfully",
        data: updatedProduct,
      });
    } catch (error: any) {
      console.error("PUT Product Error:", error);
      return NextResponse.json(
        { success: false, message: error.message || "Server error while updating product" },
        { status: 500 }
      );
    }
  });
}
