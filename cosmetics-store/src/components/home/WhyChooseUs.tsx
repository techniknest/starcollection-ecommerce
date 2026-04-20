"use client";

import { Award, ShieldCheck, Headphones, Heart, Globe } from "lucide-react";

export default function WhyChooseUs() {
  const points = [
    {
      title: "Superior Quality Products",
      desc: "Our catalog is curated with strict quality checks to ensure only the finest reach you.",
      icon: Award
    },
    {
      title: "Affordable & Fair Pricing",
      desc: "Get luxury items at reasonable prices with no hidden costs.",
      icon: ShieldCheck
    },
    {
      title: "Excellent Customer Service",
      desc: "Our team in Abbottabad is dedicated to providing you with the best experience.",
      icon: Headphones
    },
    {
      title: "Unique & Trendy Collections",
      desc: "Always stay ahead with our constantly updated, stylish fashion and decor.",
      icon: Heart
    },
    {
      title: "Trusted in Pakistan",
      desc: "Join thousands of satisfied customers across Abbottabad and Pakistan.",
      icon: Globe
    }
  ];

  return (
    <section className="py-32 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <header className="text-center space-y-4 mb-20">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-[10px] font-bold text-gold uppercase tracking-widest shadow-inner">
             Our Commitment
           </div>
           <h2 className="text-4xl lg:text-5xl font-black text-foreground tracking-tight heading-luxury">
             Why Choose <span className="text-gold italic font-light heading-luxury">Stars Collection</span>
           </h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
           {points.map((point, idx) => (
             <div key={point.title} className="p-8 glass-panel border border-white/5 rounded-3xl space-y-6 group hover:translate-y-[-8px] hover:shadow-2xl hover:shadow-gold/10 transition-all duration-500 hover:border-gold/30" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="w-12 h-12 rounded-2xl bg-surface-light shadow-inner flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-dark transition-all duration-500">
                  <point.icon className="w-5 h-5" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-foreground leading-tight">{point.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed font-light">{point.desc}</p>
                </div>
             </div>
           ))}
        </div>
      </div>

      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[150px] pointer-events-none animate-liquid-morph" />
    </section>
  );
}
