import { NextRequest, NextResponse } from "next/server";
import { productService } from "@/features/products/services/product.service";
import { ProductValidator } from "@/features/products/validators/product.validator";
import { withAdminAuth } from "@/middleware/auth.middleware";

export async function GET() {
  try {
    const products = await productService.getAllProducts();
    return NextResponse.json({ success: true, count: products.length, data: products });
  } catch (error: any) {
    console.error("GET Products Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error while fetching products" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  return withAdminAuth(req, async (req) => {
    try {
      const body = await req.json();

      // Validate Input
      const parseResult = ProductValidator.safeParse(body);
      if (!parseResult.success) {
        const firstError = parseResult.error.issues?.[0];
        const errorMessage = firstError ? `${firstError.path.join(".")}: ${firstError.message}` : "Validation failed";
        
        return NextResponse.json(
          {
            success: false,
            message: errorMessage,
            details: parseResult.error.issues,
          },
          { status: 400 }
        );
      }

      const product = await productService.createProduct(parseResult.data as any);
      return NextResponse.json(
        { success: true, message: "Product created successfully", data: product },
        { status: 201 }
      );
    } catch (error: any) {
      if (error.message.includes("already exists")) {
        return NextResponse.json(
          { success: false, message: error.message },
          { status: 409 }
        );
      }
      console.error("POST Product Error:", error);
      return NextResponse.json(
        { success: false, message: "Server error while creating product" },
        { status: 500 }
      );
    }
  });
}
