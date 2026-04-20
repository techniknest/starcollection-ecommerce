"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/ui/ProductCard";
import { Sparkles, Loader2, ArrowRight } from "lucide-react";

export default function FeaturedProducts({ allProducts, promotions }: { allProducts: any[], promotions: any[] }) {
  const featured = allProducts.filter(p => p.isFeatured).slice(0, 4);

  if (featured.length === 0) return null;

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-[10px] font-bold text-gold uppercase tracking-widest">
               Handpicked
             </div>
             <h2 className="text-4xl lg:text-5xl font-black text-foreground tracking-tight heading-luxury">
               Featured <span className="text-gold italic font-light heading-luxury">Elegance</span>
             </h2>
             <div className="h-1 w-20 bg-gold/30 rounded-full" />
          </div>
          <p className="max-w-xs text-gray-400 text-sm leading-relaxed font-light italic">
            Exquisite items selected for their unique craftsmanship and timeless design.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
           {featured.map((product) => (
             <ProductCard key={product._id} product={product} promotions={promotions} />
           ))}
        </div>

        <div className="mt-16 flex justify-center">
          <button className="flex items-center gap-3 px-8 py-4 rounded-full glass-panel text-foreground font-bold hover:bg-gold hover:text-dark hover:scale-105 transition-all duration-300 group">
            <span className="tracking-wide">Discover Full Gallery</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>

      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[120px] pointer-events-none animate-fluid-float" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-surface-light/30 rounded-full blur-[150px] pointer-events-none animate-spin-slow" />
    </section>
  );
}
