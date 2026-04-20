"use client";

import { useState, useMemo, useEffect } from "react";
import ProductCard from "@/components/ui/ProductCard";
import { Search, SlidersHorizontal, PackageX, Sparkles, X, Check } from "lucide-react";

export default function AllProducts({ allProducts, promotions, dbCategories = [] }: { allProducts: any[], promotions: any[], dbCategories?: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  
  // New Filters
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const [sortBy, setSortBy] = useState("newest");
  const [showSalesOnly, setShowSalesOnly] = useState(false);

  // Cross-component mapping synchronization from Category blocks
  useEffect(() => {
    const handleCategoryFilter = (e: any) => {
      const targetCategory = e.detail;
      // Normalizing matching for robustness
      setSelectedCategories([targetCategory]);
      setSelectedBrands([]);
      setSearchTerm("");
      setVisibleCount(12);
      
      // Clear other filters for clean discovery
      setShowSalesOnly(false);
      setSortBy("newest");
    };

    window.addEventListener("filterCategory", handleCategoryFilter);
    return () => window.removeEventListener("filterCategory", handleCategoryFilter);
  }, []);

  // Use categories from DB for the filter list instead of deriving from products
  const categories = useMemo(() => {
    if (dbCategories.length > 0) {
      return dbCategories.map(c => c.name);
    }
    return Array.from(new Set(allProducts.map(p => p.category)));
  }, [allProducts, dbCategories]);

  const brands = useMemo(() => Array.from(new Set(allProducts.map(p => p.brand))), [allProducts]);

  const toggleCategory = (cat: string) => {
     setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
     setVisibleCount(12);
  };
  
  const toggleBrand = (brand: string) => {
     setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
     setVisibleCount(12);
  };

  const filteredProducts = useMemo(() => {
    let result = allProducts.filter((p) => {
      const pPrice = p.discountPrice || p.price;
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           p.brand.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Robust Case-Insensitive Matching
      const matchesCategory = selectedCategories.length === 0 || 
                             selectedCategories.some(sc => sc.toLowerCase() === p.category.toLowerCase());
      
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(p.brand);
      
      const matchesPrice = pPrice >= priceRange.min && pPrice <= priceRange.max;
      const matchesSale = !showSalesOnly || (p.discountPrice && p.discountPrice < p.price);

      return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesSale;
    });

    // Handle Sorting
    if (sortBy === "price-low") result.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
    if (sortBy === "price-high") result.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
    if (sortBy === "newest") result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return result;
  }, [allProducts, searchTerm, selectedCategories, selectedBrands, priceRange, sortBy, showSalesOnly]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  return (
    <section id="all-products" className="py-24 bg-background min-h-screen relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-surface-light/50 blur-[150px] animate-pulse pointer-events-none rounded-full" />
      <div className="absolute bottom-40 left-0 w-[500px] h-[500px] bg-gold/5 blur-[120px] animate-fluid-float pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <header className="space-y-12 mb-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-4">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-[10px] font-bold text-gold uppercase tracking-widest shadow-inner">
                 Discovery
               </div>
               <h2 className="text-4xl lg:text-5xl font-black text-foreground tracking-tight heading-luxury uppercase">
                 Explore the <span className="text-gold italic font-light lowercase">Catalog</span>
               </h2>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:max-w-2xl">
              {/* Search Bar */}
              <div className="relative flex-1 group z-20 w-full">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-gold transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search premium products..."
                  className="w-full glass-panel rounded-2xl py-5 pl-16 pr-6 text-foreground focus:outline-none focus:ring-1 focus:ring-gold/50 transition-all font-light placeholder:text-gray-500 shadow-xl"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Sort Dropdown */}
              <div className="glass-panel rounded-2xl px-6 py-5 flex items-center gap-3 w-full sm:w-auto shadow-xl">
                 <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Sort:</span>
                 <select 
                   value={sortBy}
                   onChange={(e) => setSortBy(e.target.value)}
                   className="bg-transparent text-sm font-bold text-white focus:outline-none cursor-pointer"
                 >
                   <option value="newest" className="bg-dark">Newest</option>
                   <option value="price-low" className="bg-dark">Price: Low-High</option>
                   <option value="price-high" className="bg-dark">Price: High-Low</option>
                 </select>
              </div>
            </div>
          </div>
        </header>

        {/* Faceted Layout Architecture (Scale-ready) */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative items-start">
           
           {/* Sidebar Navbar Facets */}
           <aside className={`fixed lg:sticky top-0 lg:top-32 left-0 h-full lg:h-auto max-h-screen overflow-y-auto lg:overflow-visible w-[85vw] max-w-sm lg:w-72 bg-surface lg:bg-transparent z-[210] lg:z-auto transition-transform duration-500 ${isMobileFiltersOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} border-r border-white/5 lg:border-none p-8 lg:p-0 flex shrink-0 flex-col`}>
              <div className="flex items-center justify-between pb-8 lg:hidden border-b border-white/5 mb-8">
                 <h3 className="text-xl font-black text-white heading-luxury tracking-widest uppercase">Filters</h3>
                 <button onClick={() => setIsMobileFiltersOpen(false)}><X className="w-6 h-6 text-gray-400" /></button>
              </div>

              <div className="space-y-10 lg:pr-8">
                 {/* Quick Specials */}
                 <div className="p-6 rounded-[2rem] bg-gold/5 border border-gold/10 space-y-4">
                    <label className="flex items-center justify-between cursor-pointer group">
                       <div className="flex items-center gap-3">
                          <Sparkles className="w-4 h-4 text-gold" />
                          <span className="text-sm font-bold text-white uppercase tracking-tight">On Sale Only</span>
                       </div>
                       <div 
                         onClick={() => setShowSalesOnly(!showSalesOnly)}
                         className={`w-10 h-6 rounded-full transition-colors relative ${showSalesOnly ? 'bg-gold' : 'bg-white/10'}`}
                       >
                         <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${showSalesOnly ? 'left-5' : 'left-1'}`} />
                       </div>
                    </label>
                 </div>

                 {/* Categories Facet */}
                 <div className="space-y-6">
                    <h4 className="text-[10px] text-gray-500 font-bold uppercase tracking-widest flex items-center gap-2">
                       <span className="w-2 h-2 bg-gold rounded-full" /> Categories
                    </h4>
                    <ul className="space-y-3 pl-1">
                       {categories.map(cat => (
                         <li key={cat}>
                           <label className="flex items-center gap-3 cursor-pointer group" onClick={() => toggleCategory(cat)}>
                             <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${selectedCategories.some(sc => sc.toLowerCase() === cat.toLowerCase()) ? 'bg-gold border-gold text-dark scale-110 shadow-lg shadow-gold/20' : 'border-white/20 group-hover:border-gold/50'}`}>
                               {selectedCategories.some(sc => sc.toLowerCase() === cat.toLowerCase()) && <Check className="w-3 h-3 font-bold" />}
                             </div>
                             <span className={`text-sm tracking-wide transition-colors ${selectedCategories.some(sc => sc.toLowerCase() === cat.toLowerCase()) ? 'text-white font-bold' : 'text-gray-400 group-hover:text-gray-200'}`}>{cat}</span>
                           </label>
                         </li>
                       ))}
                    </ul>
                 </div>
                 
                 <div className="h-px bg-white/5 w-full hidden lg:block" />

                 {/* Price Range Facet */}
                 <div className="space-y-6">
                    <h4 className="text-[10px] text-gray-500 font-bold uppercase tracking-widest flex items-center gap-2">
                       <span className="w-2 h-2 bg-gold rounded-full" /> Price Range (PKR)
                    </h4>
                    <div className="space-y-4 px-1">
                       <div className="flex items-center gap-2 text-xs font-bold text-white">
                          <input 
                            type="number" 
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-gold/50 outline-none" 
                            value={priceRange.min}
                            placeholder="Min"
                            onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                          />
                          <span className="text-gray-600">to</span>
                          <input 
                            type="number" 
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-gold/50 outline-none" 
                            value={priceRange.max}
                            placeholder="Max"
                            onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                          />
                       </div>
                    </div>
                 </div>

                 <div className="h-px bg-white/5 w-full hidden lg:block" />

                 {/* Brands Facet */}
                 <div className="space-y-6">
                    <h4 className="text-[10px] text-gray-500 font-bold uppercase tracking-widest flex items-center gap-2">
                       <span className="w-2 h-2 bg-gold rounded-full" /> Designers / Brands
                    </h4>
                    <ul className="space-y-3 pl-1">
                       {brands.map(brand => (
                         <li key={brand}>
                           <label className="flex items-center gap-3 cursor-pointer group" onClick={() => toggleBrand(brand)}>
                             <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${selectedBrands.includes(brand) ? 'bg-gold border-gold text-dark' : 'border-white/20 group-hover:border-gold/50'}`}>
                               {selectedBrands.includes(brand) && <Check className="w-3 h-3 font-bold" />}
                             </div>
                             <span className={`text-sm tracking-wide transition-colors ${selectedBrands.includes(brand) ? 'text-white font-bold' : 'text-gray-400 group-hover:text-gray-200'}`}>{brand}</span>
                           </label>
                         </li>
                       ))}
                    </ul>
                 </div>
              </div>

              {/* Mobile Close Bar */}
              <div className="mt-auto lg:hidden pt-8 border-t border-white/5">
                 <button onClick={() => setIsMobileFiltersOpen(false)} className="w-full py-4 bg-gold text-dark font-black rounded-full uppercase tracking-widest text-xs">View Results ({filteredProducts.length})</button>
              </div>
           </aside>

           {/* Grid Area */}
           <div className="flex-1 w-full relative min-h-[500px]">
              {displayedProducts.length > 0 ? (
                <div className="space-y-16">
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                    {displayedProducts.map((product) => (
                      <ProductCard key={product._id} product={product} promotions={promotions} />
                    ))}
                  </div>

                  {/* Load More Pagination */}
                  {filteredProducts.length > visibleCount && (
                    <div className="flex justify-center pt-8">
                      <button 
                        onClick={() => setVisibleCount(prev => prev + 12)}
                        className="px-12 py-5 glass-panel rounded-full text-foreground font-black text-xs uppercase tracking-[0.2em] hover:bg-gold hover:text-dark hover:border-gold transition-all shadow-xl shadow-black/20 hover:-translate-y-1"
                      >
                        Load More Essentials
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-40 flex flex-col items-center justify-center space-y-6 text-center glass-panel rounded-[4rem] border border-white/5">
                  <div className="w-20 h-20 bg-surface-light rounded-full flex items-center justify-center shadow-inner">
                    <PackageX className="w-10 h-10 text-gold" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-foreground heading-luxury">No products found</h3>
                    <p className="text-gray-400 max-w-sm mx-auto text-sm leading-relaxed font-light">
                      Your selection didn't yield any premium results. Try adjusting the facets.
                    </p>
                  </div>
                  <button 
                    onClick={() => { setSearchTerm(""); setSelectedCategories([]); setSelectedBrands([]); }}
                    className="px-6 py-2 border border-gold/30 rounded-full text-gold text-xs font-bold uppercase tracking-widest hover:bg-gold hover:text-dark transition-colors mt-4 shadow-xl"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
           </div>
        </div>

        {/* Catalog Sync Badge */}
        <div className="mt-24 pt-10 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
           <div className="flex items-center gap-4">
              <Sparkles className="w-4 h-4 text-gold opacity-50" />
              <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-600">Live Catalog Connection</p>
           </div>
           <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-500 bg-surface px-4 py-2 rounded-full shadow-inner">
             Showing <span className="text-gold">{displayedProducts.length}</span> of {filteredProducts.length} Items
           </p>
        </div>
      </div>
    </section>
  );
}
