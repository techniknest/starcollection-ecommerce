export const productClientService = {
  async getAllProducts() {
    const res = await fetch("/api/products", { cache: "no-store" });
    const data = await res.json();
    if (!data.success) throw new Error(data.message || "Failed to fetch products");
    return data;
  },

  async getProductById(id: string) {
    const res = await fetch(`/api/products/${id}`, { cache: "no-store" });
    const data = await res.json();
    if (!data.success) throw new Error(data.message || "Failed to fetch product");
    return data;
  },

  async createProduct(productData: any) {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message || "Failed to create product");
    return data;
  },

  async deleteProduct(id: string) {
    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message || "Failed to delete product");
    return data;
  },
};
