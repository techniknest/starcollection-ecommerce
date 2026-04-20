import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  image: string;
  description: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    image: { type: String, required: false, default: "" },
    description: { type: String, required: false, default: "" },
    featured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// Force cache clear for schema updates in development
if (process.env.NODE_ENV === "development") {
  delete mongoose.models.Category;
}

export const Category = mongoose.models.Category || mongoose.model<ICategory>("Category", CategorySchema);
