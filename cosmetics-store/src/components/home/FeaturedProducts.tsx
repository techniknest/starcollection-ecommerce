"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/ui/ProductCard";
import { Sparkles, Loader2, ArrowRight } from "lucide-react";

export default function FeaturedProducts({ allProducts }: { allProducts: any[] }) {
  const featured = allProducts.filter(p => p.isFeatured).slice(0, 4);

  if (featured.length === 0) return null;

  return (
    <section className="py-24 bg-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/5 text-[10px] font-bold text-gold uppercase tracking-widest">
               Handpicked
             </div>
             <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tighter">
               Featured <span className="text-gold italic font-light">Elegance</span>
             </h2>
             <div className="h-1 w-20 bg-gold/30 rounded-full" />
          </div>
          <p className="max-w-xs text-gray-500 text-sm leading-relaxed font-light italic">
            Exquisite items selected for their unique craftsmanship and timeless design.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
           {featured.map((product) => (
             <ProductCard key={product._id} product={product} />
           ))}
        </div>

        <div className="mt-16 flex justify-center">
          <button className="flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white font-bold hover:bg-gold hover:text-dark transition-all group">
            <span>Discover Full Gallery</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[150px] pointer-events-none" />
    </section>
  );
}
