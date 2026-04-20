import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import { Review } from "@/features/reviews/models/review.model";

export async function GET() {
  try {
    await connectToDatabase();
    // Fetch all reviews, sorted by newest first
    const reviews = await Review.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, count: reviews.length, data: reviews });
  } catch (error: any) {
    console.error("GET Reviews Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error while fetching reviews" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Basic validation
    if (!body.name || !body.productName || !body.rating || !body.comment) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();
    
    const review = await Review.create({
      name: body.name,
      productName: body.productName,
      rating: body.rating,
      comment: body.comment,
    });

    return NextResponse.json(
      { success: true, message: "Review submitted successfully", data: review },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST Review Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error while submitting review" },
      { status: 500 }
    );
  }
}
