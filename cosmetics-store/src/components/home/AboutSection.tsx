"use client";

import { Sparkles, Target, User as UserIcon } from "lucide-react";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="py-32 bg-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
        
        <div className="relative group perspective-1000">
           <div className="absolute -inset-4 bg-gold/20 rounded-[5rem] blur-2xl group-hover:bg-gold/30 transition-all duration-700 animate-liquid-morph" />
           <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden border border-white/10 shadow-2xl glass-panel">
              <Image 
                src="/images/cosmtectics.png" 
                alt="Luxury Lifestyle"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-x-0 bottom-0 p-12 bg-gradient-to-t from-dark/90 to-transparent">
                 <div className="flex items-center gap-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="w-16 h-16 rounded-2xl bg-gold flex items-center justify-center text-dark shadow-lg shadow-gold/20">
                       <UserIcon className="w-8 h-8 font-bold" />
                    </div>
                    <div>
                       <p className="text-white font-black text-xl tracking-tight leading-none uppercase heading-luxury">Saeed Akhtar</p>
                       <p className="text-gold text-[10px] uppercase font-bold tracking-[0.2em] mt-1">Founder & Owner</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <div className="space-y-12">
          <header className="space-y-4 md:space-y-6">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-[10px] font-bold text-gold uppercase tracking-widest shadow-inner">
                Our Story
             </div>
             <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-foreground tracking-tight uppercase leading-[1.1] heading-luxury">
               About <br />
               <span className="text-gold italic font-light heading-luxury">Stars Collection</span>
             </h2>
             <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed">
               Stars Collection is a trusted destination for high-quality cosmetics, elegant décor, and stylish jewelry. We provide our customers with the best products at reasonable prices, ensuring that every experience is a journey through excellence.
             </p>
          </header>

          <div className="p-6 md:p-10 glass-panel rounded-3xl md:rounded-[3rem] relative overflow-hidden group hover:border-gold/30 hover:shadow-2xl hover:shadow-gold/10 transition-all duration-500">
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold/10 rounded-full blur-3xl group-hover:bg-gold/20 transition-all duration-500" />
             <div className="relative flex flex-col sm:flex-row items-start gap-4 md:gap-6">
                <div className="w-12 h-12 shrink-0 rounded-full bg-surface-light shadow-inner flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-dark transition-all duration-500">
                   <Target className="w-5 h-5" />
                </div>
                <div className="space-y-2 md:space-y-3">
                   <h3 className="text-base md:text-lg font-black text-foreground uppercase tracking-widest heading-luxury">Our Vision</h3>
                   <p className="text-xs md:text-sm text-gray-400 font-light leading-loose italic">
                     “To become a trusted and leading retail brand known for elegance, authenticity, and customer satisfaction.”
                   </p>
                </div>
             </div>
          </div>

          <div className="flex items-center gap-8 opacity-60">
             <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em]">Pure Authenticity</p>
             <div className="w-12 h-px bg-white/10" />
             <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em]">Curated Excellence</p>
          </div>
        </div>
      </div>
    </section>
  );
}
