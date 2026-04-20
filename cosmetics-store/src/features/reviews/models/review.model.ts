import mongoose, { Schema, Document } from "mongoose";

export interface IReview extends Document {
  name: string;
  productName: string;
  rating: number;
  comment: string;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    productName: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, trim: true },
    isFeatured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Review = mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);
