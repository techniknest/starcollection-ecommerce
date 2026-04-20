"use client";

import { useEffect, useState } from "react";
import { productClientService } from "@/services/product.service";
import AdminProductTable from "@/components/admin/AdminProductTable";
import { Package, Search, Filter, Loader2, Plus, AlertTriangle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminProductsViewPage() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [dbCategories, setDbCategories] = useState<any[]>([]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      if (Array.isArray(data)) setDbCategories(data);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  useEffect(() => {
    applyFilters();
  }, [searchTerm, selectedCategory, products]);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const res = await productClientService.getAllProducts();
      setProducts(res.data);
      setFilteredProducts(res.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let result = [...products];

    // Name search
    if (searchTerm) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    setFilteredProducts(result);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
      return;
    }

    try {
      await productClientService.deleteProduct(id);
      // Remove from state immediately
      setProducts(products.filter((p) => p._id !== id));
    } catch (err: any) {
      alert("Error deleting product: " + err.message);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <AlertTriangle className="w-16 h-16 text-red-500 mb-6" />
        <h2 className="text-2xl font-bold text-white mb-2">Failed to load products</h2>
        <p className="text-gray-400 mb-8">{error}</p>
        <button 
          onClick={fetchProducts}
          className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors text-white"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-12 space-y-10">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <button 
            onClick={() => router.push("/admin/products")}
            className="flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Hub
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">View Collection</h1>
            <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              {products.length} Total
            </div>
          </div>
          <p className="text-gray-400 max-w-lg">Full catalog overview with search, filters, and management tools.</p>
        </div>
        
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 px-6 py-4 bg-gold text-dark font-bold rounded-2xl hover:bg-yellow-500 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="w-5 h-5" />
          Add New Product
        </Link>
      </header>

      {/* Filters Bar */}
      <section className="bg-surface/20 backdrop-blur-xl border border-white/5 p-4 rounded-3xl flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search by product name..."
            className="w-full bg-dark/50 border border-white/10 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/30 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 px-4 py-3 bg-dark/50 border border-white/10 rounded-2xl group focus-within:ring-2 focus-within:ring-gold/50 transition-all">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              className="bg-transparent text-sm font-medium focus:outline-none cursor-pointer"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {dbCategories.map(cat => (
                <option key={cat._id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>
          </div>
      </section>

      {/* Main Table Area */}
      {isLoading ? (
        <div className="py-20 flex flex-col items-center justify-center space-y-4">
          <Loader2 className="w-10 h-10 text-gold animate-spin" />
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Syncing Catalog...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="py-20 text-center border border-white/5 bg-white/5 rounded-[3rem] space-y-4">
          <p className="text-gray-400 italic">No products matched your current filters.</p>
          <button 
            onClick={() => { setSearchTerm(""); setSelectedCategory("all"); }}
            className="text-gold text-sm font-bold hover:underline"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center px-2">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
              Showing {filteredProducts.length} Results
            </p>
          </div>
          <AdminProductTable 
            products={filteredProducts} 
            onDelete={handleDelete} 
          />
        </div>
      )}
    </div>
  );
}
