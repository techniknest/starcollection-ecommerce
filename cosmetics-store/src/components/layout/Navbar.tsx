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

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "#all-products" },
    { name: "Categories", href: "#categories" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300">
      {/* Top Thin Bar */}
      <div className="bg-gold/90 backdrop-blur-md text-dark text-[10px] font-bold uppercase tracking-[0.2em] py-2 text-center px-4">
        Premium Collection • Free Delivery on Orders Over Rs. 5000
      </div>

      {/* Main Nav */}
      <nav className="bg-dark/80 backdrop-blur-2xl border-b border-white/5 px-6 py-4 lg:px-12 flex items-center justify-between">
        {/* Mobile Menu Icon */}
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="lg:hidden text-white"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center shadow-lg shadow-gold/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-6 h-6 text-dark" />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-black text-xl tracking-tighter leading-none">STARS</span>
            <span className="text-[10px] text-gold uppercase tracking-[0.2em] mt-1">Collection</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium text-gray-400 hover:text-gold transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-4 lg:gap-6">
          <button 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="text-white hover:text-gold transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
          
          <Link href="#" className="text-white hover:text-gold transition-colors relative">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-2 -right-2 bg-gold text-dark text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">0</span>
          </Link>

          {user ? (
            <div className="flex items-center gap-4 border-l border-white/10 pl-6">
              <Link href={user.role === 'admin' ? "/admin" : "#"} className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-bold text-gold group-hover:border-gold/50 transition-colors">
                  {user.name[0].toUpperCase()}
                </div>
              </Link>
              <button onClick={logout} className="text-gray-400 hover:text-red-400 transition-colors">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link href="/login" className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-xs font-bold hover:bg-white/10 transition-all">
              <UserIcon className="w-4 h-4" />
              Sign In
            </Link>
          )}
        </div>
      </nav>

      {/* Slide-out Search */}
      <div className={`absolute top-full left-0 right-0 bg-dark/95 backdrop-blur-3xl border-b border-white/10 p-6 transition-all duration-500 overflow-hidden ${
        isSearchOpen ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
      }`}>
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <Search className="w-6 h-6 text-gold" />
          <input 
            type="text" 
            placeholder="Search our liquid glass catalog..."
            className="flex-1 bg-transparent border-none text-2xl text-white focus:outline-none placeholder:text-gray-700"
          />
          <button onClick={() => setIsSearchOpen(false)} className="text-gray-500 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <div className={`fixed inset-0 bg-dark/60 backdrop-blur-md z-[200] transition-opacity duration-300 lg:hidden ${
        isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`} onClick={() => setIsMenuOpen(false)} />

      {/* Mobile Drawer */}
      <div className={`fixed top-0 left-0 bottom-0 w-80 bg-surface z-[210] lg:hidden transition-transform duration-500 flex flex-col ${
        isMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
          <span className="text-gold font-bold tracking-widest text-sm uppercase">Menu</span>
          <button onClick={() => setIsMenuOpen(false)}>
            <X className="w-6 h-6 text-white" />
          </button>
        </div>
        <nav className="p-8 space-y-6 flex-1">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-between text-2xl font-bold text-white hover:text-gold"
            >
              {link.name}
              <ChevronRight className="w-5 h-5 text-gold" />
            </Link>
          ))}
        </nav>
        <div className="p-8 border-t border-white/5">
          {user ? (
             <div className="space-y-4">
                <p className="text-gray-500 text-xs">Logged in as {user.name}</p>
                <button onClick={logout} className="w-full py-4 bg-red-500/10 text-red-400 font-bold rounded-2xl">Log Out</button>
             </div>
          ) : (
            <Link href="/login" className="block w-full py-4 bg-gold text-dark text-center font-bold rounded-2xl">Sign In</Link>
          )}
        </div>
      </div>
    </header>
  );
}
