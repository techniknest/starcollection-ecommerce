import mongoose, { Schema, Document } from "mongoose";

export interface IPromotion extends Document {
  title: string;
  discountPercentage: number;
  startDate: Date;
  endDate: Date;
  targetType: "all" | "product" | "category"; // Extended to support categories
  targetId?: mongoose.Types.ObjectId | string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PromotionSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    discountPercentage: { type: Number, required: true, min: 1, max: 99 },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    targetType: { type: String, enum: ["all", "product", "category"], default: "all" },
    targetId: { type: Schema.Types.Mixed }, // Changed to Mixed to support both ObjectIds (Products) and Strings (Categories)
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const Promotion = mongoose.models.Promotion || mongoose.model<IPromotion>("Promotion", PromotionSchema);
