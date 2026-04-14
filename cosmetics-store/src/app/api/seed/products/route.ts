import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import { Product } from "@/features/products/models/product.model";

const sampleProducts = [
  {
    name: "Golden Radiance Face Oil",
    price: 12500,
    category: "cosmetics",
    subCategory: "Skincare",
    description: "Infused with 24k gold flakes and rare botanical oils, this luxurious face oil provides an instant glow and deep hydration for a revitalized look.",
    brand: "Lumière Gold",
    images: ["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop"],
    stock: 50,
    isFeatured: true,
    rating: 4.9,
    numReviews: 124
  },
  {
    name: "Silk Velvet Lipstick - Midnight Rose",
    price: 3500,
    category: "cosmetics",
    subCategory: "Makeup",
    description: "A weightless, highly pigmented lipstick with a long-lasting matte finish that feels like silk on your lips.",
    brand: "Stars Beauty",
    images: ["https://images.unsplash.com/photo-1586776977607-310e9c725c37?q=80&w=800&auto=format&fit=crop"],
    stock: 120,
    discountPrice: 2800,
    rating: 4.7,
    numReviews: 89
  },
  {
    name: "Diamond Constellation Earrings",
    price: 65000,
    category: "jewelry",
    subCategory: "Earrings",
    description: "Handcrafted 18k white gold earrings featuring a celestial arrangement of brilliant-cut diamonds.",
    brand: "Celestial Gems",
    images: ["https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop"],
    stock: 15,
    isFeatured: true,
    rating: 5.0,
    numReviews: 12
  },
  {
    name: "Oud Mystique Parfum",
    price: 18500,
    category: "perfumes",
    subCategory: "Luxury Scents",
    description: "An enchanting blend of rare Agarwood, smoky incense, and warm amber. A fragrance that captures the essence of a moonlit Arabian night.",
    brand: "Essence of Stars",
    images: ["https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800&auto=format&fit=crop"],
    stock: 30,
    discountPrice: 16500,
    rating: 4.8,
    numReviews: 56
  },
  {
    name: "Hand-Blown Aurora Vase",
    price: 9500,
    category: "home-decor",
    subCategory: "Glassware",
    description: "A unique, hand-blown glass vase featuring iridescent swirls reminiscent of the Northern Lights.",
    brand: "Artisan Living",
    images: ["https://images.unsplash.com/photo-1581783898377-1c85bf937427?q=80&w=800&auto=format&fit=crop"],
    stock: 20,
    rating: 4.6,
    numReviews: 34
  }
];

export async function GET() {
  try {
    await connectToDatabase();
    
    // Clear existing products to prevent duplicates (optional, based on requirement)
    // await Product.deleteMany({});
    
    const products = await Product.insertMany(sampleProducts);
    
    return NextResponse.json({ 
      success: true, 
      message: `${products.length} sample products seeded successfully`,
      data: products 
    });
  } catch (error: any) {
    console.error("Seed Error:", error);
    return NextResponse.json({ 
      success: false, 
      message: "Error seeding products", 
      error: error.message 
    }, { status: 500 });
  }
}
