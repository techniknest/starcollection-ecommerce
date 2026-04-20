"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";

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
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-background">
      {/* Dynamic Background Elements (Liquid Glass) */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gold/10 blur-[120px] animate-liquid-morph pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-surface-light/30 blur-[150px] animate-spin-slow pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-dark/5 blur-[100px] animate-fluid-float pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div className="space-y-10">
          {/* Brand Introduction Pill */}
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass-panel animate-fade-in-up">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">Premium Cosmetics • Elegance Defined</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-foreground leading-[1.1] animate-fade-in-up md:tracking-tight" style={{ animationDelay: '100ms' }}>
              STARS <br />
              <span className="text-gold italic font-light heading-luxury leading-[1.1]">COLLECTION</span>
            </h1>
            <p className="text-gray-400 text-base md:text-lg lg:text-xl font-light leading-relaxed max-w-xl animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              Discover the essence of pure beauty. Our curated selection of premium cosmetics, skincare, and elegant essentials empowers you to radiate confidence and undeniable grace.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4 sm:gap-6 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <button 
              onClick={scrollToCatalog}
              className="w-full sm:w-auto group relative inline-flex justify-center items-center gap-3 px-8 md:px-10 py-4 md:py-5 bg-gold text-dark font-black rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-300 shadow-xl shadow-gold/10 text-xs sm:text-sm"
            >
              <span>EXPLORE COLLECTION</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={scrollToCategories}
              className="w-full sm:w-auto group px-8 md:px-10 py-4 md:py-5 rounded-2xl glass-panel text-foreground font-bold hover:bg-white/5 transition-all duration-300 text-xs sm:text-sm"
            >
              CATEGORIES
            </button>
          </div>

          <div className="pt-10 md:pt-12 grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 border-t border-white/5 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            {[
              { label: "Products", val: "500+" },
              { label: "Clients", val: "10k+" },
              { label: "Location", val: "Abbottabad" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-xl sm:text-2xl font-black text-foreground heading-luxury">{stat.val}</p>
                <p className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-gold mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Image Side Decoration */}
        <div className="hidden lg:block relative h-[80vh] w-full animate-fade-in-up" style={{ animationDelay: '500ms' }}>
           <div className="absolute inset-x-0 inset-y-4 lg:inset-y-12 xl:inset-y-0 p-8 glass-panel rounded-[3rem] overflow-hidden rotate-[-2deg] transition-transform hover:rotate-0 duration-700 flex flex-col justify-between">
             <div className="relative w-full flex-1">
               <Image 
                 src="/images/cosmetics.png" 
                 alt="Premium Cosmetics" 
                 fill 
                 priority
                 className="object-contain object-center scale-100 hover:scale-[1.02] transition-transform duration-1000 opacity-90"
               />
             </div>
             
             {/* Floating Badge */}
             <div className="relative mt-8 glass-panel p-6 rounded-2xl">
                <div className="w-12 h-px bg-gold mb-3" />
                <p className="text-white font-bold text-sm tracking-widest uppercase mb-1">Elegance Redefined</p>
                <p className="text-gray-300 text-xs leading-relaxed italic">Curated essentials for the modern lifestyle. The ultimate standard in luxury.</p>
             </div>
           </div>
        </div>
      </div>
    </section>
  );
}
