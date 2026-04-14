import { z } from "zod";

export const ProductValidator = z
  .object({
    name: z.string().min(3, "Product name must be at least 3 characters").trim(),
    price: z.number().positive("Price must be greater than 0"),
    category: z.enum(["cosmetics", "jewelry", "perfumes", "home-decor"], {
      errorMap: () => ({ message: "Invalid category" }),
    }),
    subCategory: z.string().optional(),
    description: z.string().min(10, "Description must be at least 10 characters").trim(),
    brand: z.string().min(1, "Brand is required").trim(),
    images: z.array(z.string().url("Invalid image URL")).min(1, "At least one image is required"),
    stock: z.number().int().min(0, "Stock must be a non-negative integer"),
    discountPrice: z.number().min(0).optional().nullable(),
    isFeatured: z.boolean().default(false),
  })
  .refine(
    (data) => {
      if (data.discountPrice !== undefined && data.discountPrice !== null) {
        return data.discountPrice < data.price;
      }
      return true;
    },
    {
      message: "Discount price must be less than original price",
      path: ["discountPrice"],
    }
  );

export type ProductInput = z.infer<typeof ProductValidator>;
