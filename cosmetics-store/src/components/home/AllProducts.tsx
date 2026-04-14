"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/components/ui/ProductCard";
import { Search, Filter, Layers, SlidersHorizontal, PackageX, Sparkles } from "lucide-react";

export default function AllProducts({ allProducts }: { allProducts: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(8);

  const categories = ["all", "cosmetics", "jewelry", "perfumes", "home-decor"];

  const filteredProducts = useMemo(() => {
    return allProducts.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           p.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [allProducts, searchTerm, selectedCategory]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  return (
    <section id="all-products" className="py-24 bg-dark min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <header className="space-y-12 mb-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-4">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/5 text-[10px] font-bold text-gold uppercase tracking-widest">
                 Discovery
               </div>
               <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tighter uppercase italic">
                 Explore the <span className="text-gold not-italic">Catalog</span>
               </h2>
            </div>
            
            {/* Search Bar */}
            <div className="relative w-full lg:max-w-md group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-gold transition-colors" />
              <input 
                type="text" 
                placeholder="Search products by name or brand..."
                className="w-full bg-surface/30 border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-white focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all font-light"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-wrap items-center gap-4">
             <div className="flex items-center gap-2 px-4 py-2 bg-gold text-dark text-[10px] font-black uppercase tracking-widest rounded-full">
               <Filter className="w-3 h-3" />
               Category
             </div>
             <div className="flex flex-wrap items-center gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all border ${
                      selectedCategory === cat 
                      ? "bg-white/10 border-gold/50 text-gold shadow-lg shadow-gold/5" 
                      : "bg-white/5 border-white/5 text-gray-400 hover:border-white/10"
                    }`}
                  >
                    {cat === 'all' ? 'All Products' : cat.replace("-", " ").toUpperCase()}
                  </button>
                ))}
             </div>
          </div>
        </header>

        {/* Grid Area */}
        {displayedProducts.length > 0 ? (
          <div className="space-y-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {displayedProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {filteredProducts.length > visibleCount && (
              <div className="flex justify-center pt-8">
                <button 
                  onClick={() => setVisibleCount(prev => prev + 12)}
                  className="px-12 py-5 bg-surface/50 border border-white/10 rounded-2xl text-white font-black text-xs uppercase tracking-[0.2em] hover:bg-gold hover:text-dark hover:border-gold transition-all"
                >
                  Load More Essentials
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="py-40 flex flex-col items-center justify-center space-y-6 text-center border-2 border-dashed border-white/5 rounded-[4rem]">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center">
              <PackageX className="w-10 h-10 text-gray-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white">No products found</h3>
              <p className="text-gray-500 max-w-xs mx-auto text-sm leading-relaxed">
                Your search "<span className="text-gold">{searchTerm}</span>" in {selectedCategory} collection didn't yield any results.
              </p>
            </div>
            <button 
              onClick={() => { setSearchTerm(""); setSelectedCategory("all"); }}
              className="text-gold text-xs font-bold uppercase tracking-widest hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Catalog Sync Badge */}
        <div className="mt-24 pt-10 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6 opacity-40">
           <div className="flex items-center gap-4">
              <Sparkles className="w-4 h-4 text-gold" />
              <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-500">Live MongoDB Node Synced</p>
           </div>
           <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-500">Showing {displayedProducts.length} of {filteredProducts.length} Results</p>
        </div>
      </div>
    </section>
  );
}
