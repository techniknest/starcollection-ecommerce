import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import { Category } from "@/features/products/models/category.model";

export async function GET() {
  try {
    await connectToDatabase();
    
    const defaultCategories = [
      { name: "Cosmetics", image: "/images/cosmetics.png", description: "Premium skincare & makeup", featured: true },
      { name: "Skincare", image: "/images/skin care.png", description: "Radiant glow essentials", featured: true },
      { name: "Fragrances", image: "/images/frangnacne.png", description: "Enchanting luxury scents", featured: true },
      { name: "Haircare", image: "/images/hari care.png", description: "Lustrous locks collection", featured: true },
      { name: "Jewelry", image: "/images/naklase.png", description: "Elegant handcrafted pieces", featured: true },
      { name: "Home Decor", image: "/images/home decore.png", description: "Artistic essentials for living", featured: true }
    ];

    let inserted = 0;
    
    for (const cat of defaultCategories) {
      const updated = await Category.findOneAndUpdate(
        { name: cat.name },
        { ...cat },
        { upsert: true, new: true }
      );
      if (updated) inserted++;
    }

    return NextResponse.json({ message: `Successfully seeded ${inserted} new categories.` });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
