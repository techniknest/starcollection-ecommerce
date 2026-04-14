import connectToDatabase from "@/lib/db";
import { Product, IProduct } from "../models/product.model";
import { ProductInput } from "../validators/product.validator";

class ProductService {
  async getAllProducts() {
    await connectToDatabase();
    return Product.find({}).sort({ createdAt: -1 });
  }

  async getProductById(id: string) {
    await connectToDatabase();
    return Product.findById(id);
  }

  async createProduct(data: ProductInput) {
    await connectToDatabase();

    // Check for duplicate name (case-insensitive)
    const existingProduct = await Product.findOne({
      name: { $regex: new RegExp(`^${data.name}$`, "i") },
    });

    if (existingProduct) {
      throw new Error(`Product with name "${data.name}" already exists`);
    }

    const product = new Product(data);
    return product.save();
  }

  async deleteProduct(id: string) {
    await connectToDatabase();
    return Product.findByIdAndDelete(id);
  }

  async getFeaturedProducts() {
    await connectToDatabase();
    return Product.find({ isFeatured: true }).sort({ createdAt: -1 });
  }
}

export const productService = new ProductService();
