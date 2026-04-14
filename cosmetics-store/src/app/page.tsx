"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import CategorySection from "@/components/home/CategorySection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import AllProducts from "@/components/home/AllProducts";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import AboutSection from "@/components/home/AboutSection";
import ContactSection from "@/components/home/ContactSection";
import { Loader2, AlertCircle } from "lucide-react";

export default function HomePage() {
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true);
        const res = await fetch("/api/products");
        const data = await res.json();
        
        if (data.success) {
          setAllProducts(data.data);
        } else {
          setError(data.message || "Failed to load catalog");
        }
      } catch (err) {
        console.error("Home Data Fetch Error:", err);
        setError("Network connection issue. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark flex flex-col items-center justify-center">
        <div className="w-[40rem] h-[40rem] bg-gold/5 rounded-full blur-[100px] absolute mix-blend-screen" />
        <Loader2 className="w-10 h-10 text-gold animate-spin mb-4" />
        <p className="text-[10px] uppercase font-bold tracking-[0.4em] text-gold animate-pulse">Initializing Luxury...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-dark flex flex-col items-center justify-center text-center p-6">
        <AlertCircle className="w-16 h-16 text-red-500 mb-6" />
        <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">Service Interrupted</h2>
        <p className="text-gray-500 max-w-sm mb-10 leading-relaxed">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-10 py-4 bg-gold text-dark font-black rounded-full hover:scale-105 transition-all shadow-xl shadow-gold/20"
        >
          RETRY CONNECTION
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark flex flex-col overflow-x-hidden">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        <CategorySection />
        
        {/* Featured Selection */}
        <FeaturedProducts allProducts={allProducts} />
        
        {/* Why Us Trust Points */}
        <WhyChooseUs />

        {/* Full Catalog with Search & Filter Logic */}
        <AllProducts allProducts={allProducts} />

        {/* Brand/Owner Vision */}
        <AboutSection />

        {/* Contact/Connect Dashboard */}
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
