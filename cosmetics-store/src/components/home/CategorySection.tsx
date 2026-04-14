"use client";

import { ChevronRight } from "lucide-react";

export default function CategorySection() {
  const categories = [
    {
      name: "Cosmetics",
      icon: "💄",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop",
      description: "Premium skincare & makeup"
    },
    {
      name: "Jewelry",
      icon: "💍",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop",
      description: "Elegant handcrafted pieces"
    },
    {
      name: "Perfumes",
      icon: "🌸",
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800&auto=format&fit=crop",
      description: "Enchanting luxury scents"
    },
    {
      name: "Home Decor",
      icon: "🏡",
      image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?q=80&w=800&auto=format&fit=crop",
      description: "Artistic essentials for living"
    }
  ];

  return (
    <section id="categories" className="py-32 bg-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/5 text-[10px] font-bold text-gold uppercase tracking-widest">
               Collections
             </div>
             <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tighter">
               Browse by <span className="text-gold italic font-light">Category</span>
             </h2>
          </div>
          <p className="max-w-xs text-gray-500 text-sm leading-relaxed">
            Discover our curated selections across four major luxury departments.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat) => (
            <div 
              key={cat.name}
              className="group relative h-[450px] rounded-[3rem] overflow-hidden cursor-pointer bg-surface/50 border border-white/5 transition-all hover:scale-[1.02] hover:-translate-y-2 hover:border-gold/30"
            >
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent p-10 flex flex-col justify-end gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gold/20 backdrop-blur-md flex items-center justify-center text-2xl shadow-xl shadow-black/50">
                  {cat.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-white group-hover:text-gold transition-colors">{cat.name}</h3>
                  <p className="text-gray-400 text-xs font-medium uppercase tracking-widest">{cat.description}</p>
                </div>
                <div className="pt-4 flex items-center gap-2 text-gold font-bold text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0">
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
