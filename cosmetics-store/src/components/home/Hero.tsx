"use client";

import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  const scrollToCatalog = () => {
    const element = document.getElementById("all-products");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToCategories = () => {
    const element = document.getElementById("categories");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-dark">
      {/* Dynamic Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[150px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full relative z-10">
        <div className="max-w-3xl space-y-10">
          {/* Brand Introduction Pill */}
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-gold/30 bg-gold/5 backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gold">Jewelry • Cosmetics • Home Decor</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-6xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
              STARS <br />
              <span className="text-gold italic font-light serif">COLLECTION</span>
            </h1>
            <p className="text-gray-400 text-lg lg:text-xl font-light leading-relaxed max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
              Our shop is a trusted destination for high-quality cosmetics, elegant décor, and stylish jewelry. 
              We provide our customers with the best products at reasonable prices, ensuring that every purchase is a great experience.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            <button 
              onClick={scrollToCatalog}
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gold text-dark font-black rounded-2xl overflow-hidden hover:scale-105 transition-all shadow-2xl shadow-gold/20"
            >
              <span>SHOP NOW</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={scrollToCategories}
              className="group px-10 py-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md text-white font-bold hover:bg-white/10 transition-all"
            >
              BROWSE CATEGORIES
            </button>
          </div>

          <div className="pt-12 grid grid-cols-3 gap-10 border-t border-white/5 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-500">
            {[
              { label: "Products", val: "500+" },
              { label: "Happy Clients", val: "10k+" },
              { label: "Store Locations", val: "Abbottabad" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-black text-white">{stat.val}</p>
                <p className="text-[10px] uppercase font-bold tracking-widest text-gold mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Image Side Decoration (Optional but recommended for luxury feel) */}
      <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-2/3 bg-gradient-to-l from-gold/10 to-transparent border-l border-white/5 rounded-l-[10rem] backdrop-blur-sm overflow-hidden animate-in fade-in slide-in-from-right-20 duration-1000">
         <div className="absolute inset-x-0 bottom-0 p-12 space-y-4">
            <div className="w-12 h-px bg-gold" />
            <p className="text-white font-bold text-sm tracking-widest uppercase">Elegance Redefined</p>
            <p className="text-gray-500 text-xs leading-relaxed italic">Curated essentials for the modern lifestyle. Abbottabad's leading choice for quality and style.</p>
         </div>
      </div>
    </section>
  );
}
