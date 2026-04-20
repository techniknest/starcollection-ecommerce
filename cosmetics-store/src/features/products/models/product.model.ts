import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  category: string;
  subCategory?: string;
  description: string;
  brand: string;
  images: string[];
  stock: number;
  discountPrice?: number;
  rating: number;
  numReviews: number;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    subCategory: { type: String, trim: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    images: { type: [String], required: true },
    stock: { type: Number, required: true, min: 0, default: 0 },
    discountPrice: { type: Number, min: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    numReviews: { type: Number, default: 0, min: 0 },
    isFeatured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// Prevent recompilation in Next.js development mode
export const Product = mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
