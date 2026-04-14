"use client";

import { useEffect, useState } from "react";
import { productClientService } from "@/services/product.service";
import ProductCard from "@/components/ui/ProductCard";
import { Sparkles, Loader2 } from "lucide-react";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await productClientService.getAllProducts();
        setProducts(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark text-gold">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark text-white p-6 lg:p-12">
      <div className="max-w-7xl mx-auto space-y-12 pt-12">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/5 text-[10px] font-bold text-gold uppercase tracking-widest">
            <Sparkles className="w-3 h-3" />
            Product Catalog
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
            Stars <span className="text-gold">Collection</span>
          </h1>
          <p className="text-gray-400 max-w-2xl text-lg font-light">
            Explore our curated selection of premium essentials across cosmetics, jewelry, and more.
          </p>
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl">
            {error}
          </div>
        )}

        {products.length === 0 && !error ? (
          <div className="py-20 text-center border border-white/5 bg-white/5 rounded-3xl">
            <p className="text-gray-500 italic">No products found. Add some to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
