"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { 
  Search, 
  ShoppingBag, 
  User as UserIcon, 
  Menu, 
  X, 
  Sparkles,
  LogOut,
  ChevronRight
} from "lucide-react";
import Image from "next/image";

import { useSettings } from "@/features/settings/hooks/use-settings";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { settings } = useSettings();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const megaMenuCategories = [
    { title: "Beauty & Cosmetics", links: ["Makeup", "Face Care", "Lip Colors", "Bath & Body"] },
    { title: "Luxury Fragrances", links: ["Women's Perfume", "Men's Cologne", "Gift Sets"] },
    { title: "Elegant Living", links: ["Home Decor", "Fine Jewelry", "Necklaces", "Accessories"] },
  ];

  const handleNavCategoryClick = (categoryName: string) => {
    setIsMenuOpen(false); // Close mobile menu if open
    
    // Check if we are on the home page
    const catalogElement = document.getElementById("all-products");
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('filterCategory', { detail: categoryName }));
      }, 500);
    } else {
      // If on another page, navigate home first with hash
      window.location.href = `/#all-products`;
      // Note: The event might not fire after a full refresh, 
      // but in Next.js it usually handles this via routing if we use router.push.
      // For now, focusing on the homepage behavior as requested.
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500">
      {/* Sticky Header Container */}

      {/* Main Nav */}
      <nav className="glass-panel border-b-0 border-white/5 px-6 py-4 lg:px-12 flex items-center justify-between mx-4 mt-4 rounded-3xl shadow-2xl">
        {/* Mobile Menu Icon */}
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="lg:hidden text-foreground"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center shadow-lg shadow-gold/20 group-hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-5 h-5 text-dark" />
          </div>
          <div className="flex flex-col">
            <span className="text-foreground heading-luxury font-black text-xl tracking-tighter leading-none uppercase">
              {settings.storeName.split(' ')[0]}
            </span>
            <span className="text-[9px] text-gold uppercase tracking-[0.3em] mt-1 font-bold">
              {settings.storeName.split(' ').slice(1).join(' ') || "Collection"}
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-10">
          <Link href="/" className="text-sm font-medium text-gray-300 hover:text-gold transition-colors relative group tracking-wide">
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link href="/reviews" className="text-sm font-medium text-gray-300 hover:text-gold transition-colors relative group tracking-wide">
            Reviews
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link href="#all-products" className="text-sm font-medium text-gray-300 hover:text-gold transition-colors relative group tracking-wide">
            Our Collection
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
          </Link>

          <div className="relative group">
            <button className="text-sm font-medium text-gray-300 group-hover:text-gold transition-colors tracking-wide flex items-center gap-1 py-4">
              Categories
            </button>
            
            {/* Mega Menu Dropdown */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[800px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 translate-y-4 group-hover:translate-y-0">
               <div className="bg-dark/95 backdrop-blur-3xl border border-white/5 p-10 rounded-[2rem] shadow-2xl grid grid-cols-4 gap-8">
                  {megaMenuCategories.map((col) => (
                    <div key={col.title} className="space-y-4">
                       <h4 className="text-white font-bold text-sm tracking-widest uppercase heading-luxury">{col.title}</h4>
                       <ul className="space-y-3">
                         {col.links.map(link => (
                           <li key={link}>
                             <button 
                               onClick={() => handleNavCategoryClick(link)}
                               className="text-left text-gray-400 hover:text-gold text-xs font-medium transition-colors block py-0.5"
                             >
                               {link}
                             </button>
                           </li>
                         ))}
                       </ul>
                    </div>
                  ))}
                  
                  {/* Promo Column */}
                  <div className="relative rounded-2xl overflow-hidden glass-panel flex flex-col justify-end p-6 group/promo cursor-pointer h-full border border-white/10">
                     <Image src="/images/cosmetics.png" alt="Promo" fill className="object-cover opacity-60 group-hover/promo:scale-105 transition-transform duration-700" />
                     <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />
                     <div className="relative z-10 translate-y-2 group-hover/promo:translate-y-0 transition-transform duration-500">
                        <p className="text-gold text-[10px] font-bold uppercase tracking-widest">New Arrival</p>
                        <p className="text-white font-black text-lg heading-luxury leading-tight mt-1">Discover The Collection</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          <Link href="#contact" className="text-sm font-medium text-gray-300 hover:text-gold transition-colors relative group tracking-wide">
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
          </Link>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-4 lg:gap-6">
          {/* Search Icon */}
          <button 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="text-gray-300 hover:text-gold transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>

          {user ? (
            <div className="flex items-center gap-4 border-l border-white/20 pl-6">
              <Link href={user.role === 'admin' ? "/admin" : "#"} className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-full bg-surface-light border border-white/10 flex items-center justify-center text-xs font-bold text-gold group-hover:border-gold transition-colors shadow-inner">
                  {user.name[0].toUpperCase()}
                </div>
              </Link>
              <button onClick={logout} className="text-gray-400 hover:text-red-400 transition-colors">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link href="/login" className="hidden sm:flex items-center gap-2 px-6 py-2.5 bg-surface-light border border-white/10 rounded-full text-xs font-bold hover:bg-white/10 hover:text-gold transition-all duration-300">
              <UserIcon className="w-4 h-4" />
              Sign In
            </Link>
          )}
        </div>
      </nav>

      {/* Slide-out Search */}
      <div className={`absolute top-[4.5rem] left-8 right-8 glass-panel p-6 rounded-3xl transition-all duration-500 overflow-hidden shadow-2xl z-[-1] ${
        isSearchOpen ? 'translate-y-4 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'
      }`}>
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <Search className="w-6 h-6 text-gold" />
          <input 
            type="text" 
            placeholder="Search the luxury catalog..."
            className="flex-1 bg-transparent border-none text-2xl text-foreground heading-luxury focus:outline-none placeholder:text-gray-600"
          />
          <button onClick={() => setIsSearchOpen(false)} className="text-gray-500 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <div className={`fixed inset-0 bg-dark/80 backdrop-blur-md z-[200] transition-opacity duration-500 lg:hidden ${
        isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`} onClick={() => setIsMenuOpen(false)} />

      {/* Mobile Drawer */}
      <div className={`fixed top-0 left-0 bottom-0 w-[85vw] max-w-sm bg-surface z-[210] lg:hidden transition-transform duration-500 flex flex-col border-r border-white/5 ${
        isMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
          <span className="text-gold font-bold tracking-[0.2em] text-[10px] uppercase">Navigation</span>
          <button onClick={() => setIsMenuOpen(false)}>
            <X className="w-6 h-6 text-gray-400 hover:text-white" />
          </button>
        </div>
        
        <nav className="p-8 space-y-10 flex-1 overflow-y-auto">
          <Link href="/" onClick={() => setIsMenuOpen(false)} className="block text-3xl font-black text-foreground heading-luxury hover:text-gold transition-colors">
            Home
          </Link>
          <Link href="/reviews" onClick={() => setIsMenuOpen(false)} className="block text-3xl font-black text-foreground heading-luxury hover:text-gold transition-colors">
            Reviews
          </Link>
          <Link href="#all-products" onClick={() => setIsMenuOpen(false)} className="block text-3xl font-black text-foreground heading-luxury hover:text-gold transition-colors">
            Our Collection
          </Link>
          
          <div className="space-y-6">
             <p className="text-3xl font-black text-foreground heading-luxury opacity-30">Categories</p>
             <div className="space-y-8 pl-2 border-l-2 border-white/5 ml-2">
                {megaMenuCategories.map((col) => (
                  <div key={col.title} className="space-y-4 pl-4">
                     <p className="text-gold font-bold text-[10px] tracking-widest uppercase">{col.title}</p>
                     <ul className="space-y-3">
                       {col.links.map(link => (
                         <li key={link}>
                           <button 
                             onClick={() => handleNavCategoryClick(link)} 
                             className="text-left text-gray-300 hover:text-white text-sm font-medium"
                           >
                             {link}
                           </button>
                         </li>
                       ))}
                     </ul>
                  </div>
                ))}
             </div>
          </div>

          <Link href="#contact" onClick={() => setIsMenuOpen(false)} className="block text-3xl font-black text-foreground heading-luxury hover:text-gold transition-colors">
            Contact
          </Link>
        </nav>

        <div className="p-8 border-t border-white/5 bg-surface-light/30">
          {user ? (
             <div className="space-y-4">
                <p className="text-gray-400 text-xs">Logged in as <span className="text-white font-bold">{user.name}</span></p>
                <button onClick={logout} className="w-full py-4 text-xs tracking-widest uppercase bg-red-500/10 text-red-400 font-bold rounded-full hover:bg-red-500/20 transition-colors">Log Out</button>
             </div>
          ) : (
            <Link href="/login" onClick={() => setIsMenuOpen(false)} className="block w-full py-4 bg-gold text-dark text-xs tracking-widest uppercase text-center font-bold rounded-full shadow-lg shadow-gold/20 hover:scale-[1.02] transition-transform">Sign In</Link>
          )}
        </div>
      </div>
    </header>
  );
}
