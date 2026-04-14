"use client";

import { useEffect, useState, use } from "react";
import { productClientService } from "@/services/product.service";
import { Loader2, ArrowLeft, ShoppingCart, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await productClientService.getProductById(id);
        setProduct(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark text-gold">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-dark text-white p-6">
        <h2 className="text-2xl font-bold text-red-400 mb-4">Error</h2>
        <p className="text-gray-400 mb-8">{error || "Product not found"}</p>
        <Link href="/products" className="text-gold hover:underline">Back to products</Link>
      </div>
    );
  }

  const hasDiscount = product.discountPrice && product.discountPrice < product.price;

  return (
    <div className="min-h-screen bg-dark text-white p-6 lg:p-12 pt-24 lg:pt-32">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-gold transition-colors mb-12 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Images Section */}
          <div className="space-y-6">
            <div className="aspect-square bg-white/5 border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={product.images[activeImage] || "https://placehold.co/800x800?text=Product"} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {product.images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImage === idx ? "border-gold" : "border-transparent opacity-50"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="space-y-8 py-4">
            <div className="space-y-4">
              <div className="inline-flex gap-4 text-xs font-bold uppercase tracking-widest text-gold">
                <span>{product.category}</span>
                <span className="text-gray-600">•</span>
                <span>{product.brand}</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-6 pt-2">
                {hasDiscount ? (
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-white">Rs. {product.discountPrice}</span>
                    <span className="text-lg text-gray-500 line-through">Rs. {product.price}</span>
                    <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded">
                      -{Math.round(((product.price - product.discountPrice!) / product.price) * 100)}%
                    </span>
                  </div>
                ) : (
                  <span className="text-3xl font-bold text-white">Rs. {product.price}</span>
                )}
                <div className="h-6 w-px bg-white/10" />
                <div className="text-sm text-gray-400">
                  <span className="text-white font-bold">{product.stock}</span> in stock
                </div>
              </div>
            </div>

            <div className="h-px w-full bg-white/5" />

            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500">Description</h3>
              <p className="text-gray-400 leading-loose text-lg font-light">
                {product.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                <Truck className="w-5 h-5 text-gold" />
                <div className="text-left">
                  <p className="text-xs text-white font-bold">Fast Delivery</p>
                  <p className="text-[10px] text-gray-500">2-3 Business Days</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                <ShieldCheck className="w-5 h-5 text-gold" />
                <div className="text-left">
                  <p className="text-xs text-white font-bold">Safe Secure</p>
                  <p className="text-[10px] text-gray-500">Money Back Guarantee</p>
                </div>
              </div>
            </div>

            <button className="w-full bg-gold text-dark py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-yellow-500 transition-all hover:scale-[1.01] active:scale-[0.99]">
              <ShoppingCart className="w-5 h-5" />
              Add to stars basket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
