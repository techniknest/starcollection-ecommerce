"use client";

import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

export default function CategorySection() {
  const fallbackCategories = [
    { name: "Cosmetics", image: "/images/cosmetics.png", description: "Premium skincare & makeup" },
    { name: "Skincare", image: "/images/skin care.png", description: "Radiant glow essentials" },
    { name: "Fragrances", image: "/images/frangnacne.png", description: "Enchanting luxury scents" },
    { name: "Haircare", image: "/images/hari care.png", description: "Lustrous locks collection" },
    { name: "Jewelry", image: "/images/naklase.png", description: "Elegant handcrafted pieces" },
    { name: "Home Decor", image: "/images/home decore.png", description: "Artistic essentials for living" }
  ];

  const [categories, setCategories] = useState(fallbackCategories);

  useEffect(() => {
    fetch("/api/categories")
      .then(res => res.json())
      .then(data => {
         if (Array.isArray(data) && data.length > 0) {
           // Strictly only show the 6 major categories on the homepage
           const majorNames = fallbackCategories.map(c => c.name.toLowerCase());
           const majorCats = data.filter(c => majorNames.includes(c.name.toLowerCase()));
           
           // If we found our major cats, use them. Otherwise fallback to first 6 as a safety.
           setCategories(majorCats.length > 0 ? majorCats.slice(0, 6) : data.slice(0, 6));
         }
      })
      .catch(console.error);
  }, []);

  const handleCategoryClick = (categoryName: string) => {
    const catalogElement = document.getElementById("all-products");
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
         window.dispatchEvent(new CustomEvent('filterCategory', { detail: categoryName }));
      }, 500); // Wait for scroll to initialize smoothly
    }
  };

  return (
    <section id="categories" className="py-32 bg-background relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-gold/5 blur-[120px] rounded-[50%] pointer-events-none animate-liquid-morph" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-[10px] font-bold text-gold uppercase tracking-widest shadow-inner">
               Collections
             </div>
             <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight heading-luxury">
               Browse by <span className="text-gold italic font-light">Category</span>
             </h2>
          </div>
          <p className="max-w-xs text-gray-400 text-xs sm:text-sm leading-relaxed font-light mt-4 md:mt-0">
            Discover our curated selections across six major luxury departments. Each item is chosen for its undeniable quality.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((cat, idx) => (
            <div 
              key={cat.name}
              onClick={() => handleCategoryClick(cat.name)}
              className="group relative h-[450px] rounded-[3rem] overflow-hidden cursor-pointer glass-panel border border-white/5 transition-all duration-500 hover:-translate-y-2 hover:border-gold/30 hover:shadow-2xl hover:shadow-gold/10"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <div className="absolute inset-x-4 inset-y-4">
                <Image 
                  src={cat.image || `https://placehold.co/600x400?text=${encodeURIComponent(cat.name)}`} 
                  alt={cat.name}
                  fill
                  className="object-contain transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/40 to-transparent p-10 flex flex-col justify-end gap-4 pointer-events-none">
                <div className="space-y-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-2xl font-black text-white group-hover:text-gold transition-colors heading-luxury tracking-wide">{cat.name}</h3>
                  <p className="text-gray-300 text-xs font-medium uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{cat.description}</p>
                </div>
                <div className="pt-2 flex items-center gap-2 text-gold font-bold text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-4 group-hover:translate-x-0">
                  <span>View Collection</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
