"use client";

import Link from "next/link";
import { 
  Sparkles, 
  MapPin, 
  Phone, 
  Mail
} from "lucide-react";
import { useSettings } from "@/features/settings/hooks/use-settings";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { settings } = useSettings();

  return (
    <footer className="bg-background text-foreground border-t border-white/5 pt-20 pb-10 relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
        
        {/* Brand Column */}
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-gold" />
            <span className="font-black text-2xl tracking-tighter heading-luxury uppercase">{settings.storeName}</span>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs font-light">
            {settings.slogan}
          </p>
          <div className="flex items-center gap-4 pt-2">
            <a href={`https://wa.me/${settings.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-surface hover:bg-green-500 hover:text-white flex items-center justify-center transition-all duration-300 shadow-inner group">
              <svg className="w-4 h-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
            </a>
            {settings.instagramUrl && (
              <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-surface hover:bg-pink-500 hover:text-white flex items-center justify-center transition-all duration-300 shadow-inner group">
                <svg className="w-4 h-4 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            )}
            {settings.tiktokUrl && (
              <a href={settings.tiktokUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-surface hover:bg-black hover:text-white flex items-center justify-center transition-all duration-300 shadow-inner group">
                <svg className="w-4 h-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.23-.9 4.45-2.36 6.08-1.4 1.57-3.4 2.5-5.54 2.6-2.14.1-4.3-.4-6-1.58-1.76-1.22-3.03-3.04-3.52-5.11-.53-2.15-.31-4.47.66-6.42 1.05-2.04 2.87-3.6 4.96-4.41V12.1c-1.39.46-2.6 1.41-3.32 2.66-.75 1.3-.92 2.91-.53 4.31.42 1.45 1.48 2.68 2.86 3.28 1.41.6 3.06.63 4.46.1 1.41-.53 2.56-1.62 3.12-2.99.3-.76.43-1.6.43-2.42V.02z" />
                </svg>
              </a>
            )}
            <a href={`mailto:${settings.supportEmail}`} className="w-10 h-10 rounded-full bg-surface hover:bg-gold hover:text-dark flex items-center justify-center transition-all duration-300 shadow-inner group">
              <Mail className="w-4 h-4 transition-transform group-hover:scale-110" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-6">
          <h3 className="text-gold font-bold text-xs uppercase tracking-[0.2em] heading-luxury">Quick Links</h3>
          <ul className="space-y-4">
            {["Home", "Our Collection", "New Arrivals", "Best Sellers", "Our Vision"].map((item) => (
              <li key={item}>
                <Link href="#" className="text-gray-400 hover:text-gold transition-colors text-sm font-medium">{item}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div className="space-y-6">
          <h3 className="text-gold font-bold text-xs uppercase tracking-[0.2em] heading-luxury">Categories</h3>
          <ul className="space-y-4">
            {["Cosmetics", "Skincare", "Jewelry", "Perfumes", "Home Decor"].map((item) => (
              <li key={item}>
                <Link href="#" className="text-gray-400 hover:text-gold transition-colors text-sm font-medium">{item}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact info */}
        <div className="space-y-6">
          <h3 className="text-gold font-bold text-xs uppercase tracking-[0.2em] heading-luxury">Visit Us</h3>
          <ul className="space-y-5">
            <li className="flex gap-4 group cursor-pointer">
              <MapPin className="w-5 h-5 text-gold shrink-0 group-hover:scale-110 transition-transform" />
              <span className="text-sm text-gray-400 group-hover:text-white transition-colors leading-tight uppercase">{settings.address}</span>
            </li>
            <li className="flex items-center gap-4 group cursor-pointer">
              <Phone className="w-5 h-5 text-gold shrink-0 group-hover:scale-110 transition-transform" />
              <span className="text-sm text-gray-400 group-hover:text-white transition-colors">{settings.whatsappNumber}</span>
            </li>
            <li className="flex items-center gap-4 group cursor-pointer">
              <Mail className="w-5 h-5 text-gold shrink-0 group-hover:scale-110 transition-transform" />
              <div className="flex flex-col text-sm text-gray-400 group-hover:text-white transition-colors italic">
                <span>{settings.supportEmail}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">
          © {currentYear} {settings.storeName}. All Rights Reserved. | Design & Developed by <a href="http://techniknest.com/" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-yellow-500 transition-colors">Technik Nest</a> | <a href="http://techniknest.com/#contact" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Contact for development</a>
        </p>
        <div className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-2 text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">
          <Link href="#" className="hover:text-gold transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-gold transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}

