"use client";

import { Sparkles, Target, User as UserIcon } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="py-32 bg-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        <div className="relative group">
           <div className="absolute -inset-4 bg-gold/20 rounded-[5rem] blur-2xl group-hover:bg-gold/30 transition-all duration-700" />
           <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1544161515-4af6b1d462c2?q=80&w=800&auto=format&fit=crop" 
                alt="Luxury Lifestyle"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 p-12 bg-gradient-to-t from-dark to-transparent">
                 <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gold flex items-center justify-center text-dark">
                       <UserIcon className="w-8 h-8 font-bold" />
                    </div>
                    <div>
                       <p className="text-white font-black text-xl tracking-tight leading-none uppercase italic">Saeed Akhtar</p>
                       <p className="text-gold text-[10px] uppercase font-bold tracking-[0.2em] mt-1">Founder & Owner</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <div className="space-y-12">
          <header className="space-y-6">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/5 text-[10px] font-bold text-gold uppercase tracking-widest">
                Our Story
             </div>
             <h2 className="text-5xl lg:text-7xl font-black text-white tracking-tighter uppercase leading-[0.9]">
               About <br />
               <span className="text-gold italic font-light">Stars Collection</span>
             </h2>
             <p className="text-gray-400 text-lg font-light leading-relaxed first-letter:text-5xl first-letter:font-black first-letter:text-gold first-letter:mr-3 first-letter:float-left">
               Our shop is a trusted destination for high-quality cosmetics, elegant décor, and stylish jewelry. We provide our customers with the best products at reasonable prices, ensuring that every purchase is a great experience.
             </p>
          </header>

          <div className="p-10 bg-surface/30 border border-white/5 rounded-[3rem] relative overflow-hidden group">
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold/5 rounded-full blur-3xl" />
             <div className="relative flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-dark transition-all">
                   <Target className="w-6 h-6" />
                </div>
                <div className="space-y-3">
                   <h3 className="text-lg font-black text-white uppercase tracking-widest">Our Vision</h3>
                   <p className="text-sm text-gray-500 font-light leading-loose">
                     “To become a trusted and leading retail brand known for elegance, authenticity, and customer satisfaction.”
                   </p>
                </div>
             </div>
          </div>

          <div className="flex items-center gap-8 opacity-50">
             <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.3em]">Pure Authenticity</p>
             <div className="w-12 h-px bg-white/10" />
             <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.3em]">Curated Excellence</p>
          </div>
        </div>
      </div>
    </section>
  );
}
