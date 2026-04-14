"use client";

import Link from "next/link";
import { 
  Sparkles, 
  MapPin, 
  Phone, 
  Mail, 
  Camera, 
  Globe, 
  Send 
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 overflow-hidden">
        
        {/* Brand Column */}
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-gold" />
            <span className="font-black text-2xl tracking-tighter">STARS COLLECTION</span>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            A trusted destination for high-quality cosmetics, elegant décor, and stylish jewelry. Experience excellence in every purchase.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold hover:text-dark transition-all">
              <Camera className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold hover:text-dark transition-all">
              <Globe className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold hover:text-dark transition-all">
              <Send className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-6">
          <h3 className="text-gold font-bold text-xs uppercase tracking-[0.2em]">Quick Links</h3>
          <ul className="space-y-4">
            {["Home", "Shop All", "New Arrivals", "Best Sellers", "Our Vision"].map((item) => (
              <li key={item}>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">{item}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div className="space-y-6">
          <h3 className="text-gold font-bold text-xs uppercase tracking-[0.2em]">Categories</h3>
          <ul className="space-y-4">
            {["Cosmetics", "Jewelry", "Perfumes", "Home Decor"].map((item) => (
              <li key={item}>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">{item}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact info */}
        <div className="space-y-6">
          <h3 className="text-gold font-bold text-xs uppercase tracking-[0.2em]">Visit Us</h3>
          <ul className="space-y-5">
            <li className="flex gap-4">
              <MapPin className="w-5 h-5 text-gold shrink-0" />
              <span className="text-sm text-gray-400 leading-tight">TANCHI CHOWK, MOTI BAZAR, ABBOTTABAD, PAKISTAN</span>
            </li>
            <li className="flex items-center gap-4">
              <Phone className="w-5 h-5 text-gold shrink-0" />
              <span className="text-sm text-gray-400">03149328645</span>
            </li>
            <li className="flex items-center gap-4">
              <Mail className="w-5 h-5 text-gold shrink-0" />
              <div className="flex flex-col text-sm text-gray-400 italic">
                <span>orders.starscollection@gmail.com</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">
          © {currentYear} Stars Collection. All Rights Reserved.
        </p>
        <div className="flex gap-8 text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">
          <Link href="#" className="hover:text-gold transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-gold transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
