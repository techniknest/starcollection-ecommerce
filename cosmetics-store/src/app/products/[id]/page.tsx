"use client";

import { useEffect, useState, use } from "react";
import { productClientService } from "@/services/product.service";
import { Loader2, ArrowLeft, Sparkles, Star, Tag, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useSettings } from "@/features/settings/hooks/use-settings";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { settings } = useSettings();
  const [product, setProduct] = useState<any>(null);
  const [promotions, setPromotions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const [prodRes, promoRes] = await Promise.all([
          productClientService.getProductById(id),
          fetch("/api/promotions").then(r => r.json())
        ]);
        
        setProduct(prodRes.data);
        if (promoRes.success) {
          setPromotions(promoRes.data);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
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
        <Link href="/" className="text-gold hover:underline">Back to Gallery</Link>
      </div>
    );
  }

  // Promotion Logic
  const activePromo = promotions.find(p => 
    p.targetType === "all" || 
    (p.targetType === "category" && p.targetId === product.category) ||
    (p.targetType === "product" && p.targetId === product._id)
  );
  
  const discountPercentage = activePromo ? activePromo.discountPercentage : 0;
  const promoPrice = activePromo 
    ? Math.round(product.price * (1 - discountPercentage / 100))
    : product.discountPrice;

  const hasDiscount = (activePromo || (product.discountPrice && product.discountPrice < product.price));
  const finalPrice = promoPrice || product.price;

  return (
    <div className="min-h-screen bg-dark text-white p-6 lg:p-12 pt-24 lg:pt-32 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-gold transition-colors mb-12 text-[10px] font-bold uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Collection
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Images Section */}
          <div className="space-y-6">
            <div className="relative group aspect-square bg-white/5 border border-white/5 rounded-[3rem] overflow-hidden shadow-2xl glass-panel">
              <img 
                src={product.images[activeImage] || "https://placehold.co/800x800?text=Product"} 
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              {activePromo && (
                <div className="absolute top-8 left-8 bg-gold text-dark px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest shadow-xl flex items-center gap-2 animate-pulse">
                  <Tag className="w-4 h-4" />
                  {activePromo.title}
                </div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                {product.images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      activeImage === idx ? "border-gold scale-105" : "border-transparent opacity-40 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="space-y-10 py-4">
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="inline-flex gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
                  <span>{product.category}</span>
                  <span className="text-gray-700">|</span>
                  <span>{product.brand}</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-white/5 text-[10px] font-bold text-yellow-500">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{product.rating}</span>
                </div>
              </div>

              <h1 className="text-5xl lg:text-7xl font-black tracking-tighter leading-[0.9] heading-luxury">
                {product.name}
              </h1>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex flex-col">
                  {hasDiscount ? (
                    <div className="flex items-baseline gap-4">
                      <span className="text-5xl font-black text-white heading-luxury">Rs. {finalPrice}</span>
                      <span className="text-xl text-gray-500 line-through font-light opacity-60">Rs. {product.price}</span>
                      {activePromo && (
                         <div className="bg-green-500/10 text-green-400 text-[10px] font-black px-3 py-1 rounded-lg border border-green-500/20">
                            SAVE {discountPercentage}%
                         </div>
                      )}
                    </div>
                  ) : (
                    <span className="text-5xl font-black text-white heading-luxury">Rs. {product.price}</span>
                  )}
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mt-3">Authentic Showcase Item</p>
                </div>
              </div>
            </div>

            <div className="h-px w-full bg-white/5" />

            <div className="space-y-4">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">The Details</h3>
              <p className="text-gray-400 leading-relaxed text-xl font-light italic">
                "{product.description}"
              </p>
            </div>

            {/* Custom Contact Call-to-Action for Showcase */}
            <div className="pt-6 space-y-6">
               <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 group hover:border-gold/30 transition-all duration-500">
                  <div className="flex items-center gap-5">
                     <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center text-gold group-hover:scale-110 transition-transform">
                        <Sparkles className="w-8 h-8" />
                     </div>
                     <div>
                        <p className="text-white font-bold text-lg">Interested in this piece?</p>
                        <p className="text-xs text-gray-500 font-medium">Connect with our specialists for availability.</p>
                     </div>
                  </div>
                  <a 
                    href={`https://wa.me/${settings.whatsappNumber}?text=Hi, I am interested in your ${product.name}. Could you provide more details?`}
                    target="_blank"
                    className="px-10 py-5 bg-gold text-dark font-black rounded-2xl flex items-center gap-3 hover:bg-yellow-500 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-gold/20"
                  >
                    <MessageCircle className="w-5 h-5" />
                    INQUIRE NOW
                  </a>
               </div>

               <div className="flex items-center justify-center gap-8 opacity-40 grayscale">
                  <div className="flex flex-col items-center">
                     <p className="text-[8px] font-black uppercase tracking-widest text-gray-500">Premium Quality</p>
                  </div>
                  <div className="w-1 bg-white/10 h-1 rounded-full" />
                  <div className="flex flex-col items-center">
                     <p className="text-[8px] font-black uppercase tracking-widest text-gray-500">Limited Collection</p>
                  </div>
                  <div className="w-1 bg-white/10 h-1 rounded-full" />
                  <div className="flex flex-col items-center">
                     <p className="text-[8px] font-black uppercase tracking-widest text-gray-500">Stars Certified</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
