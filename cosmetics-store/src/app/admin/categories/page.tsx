"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Trash2, LayoutGrid, Sparkles, Loader2, AlertCircle, Pencil } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/use-auth";

export default function AdminCategoriesHub() {
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { accessToken, refreshAccessToken } = useAuth();

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      if (!res.ok) throw new Error("Database connection failed. Please check MONGODB_URI.");
      const data = await res.json();
      setCategories(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the ${name} category?`)) return;
    
    try {
      const performDelete = async (token: string | null) => {
        return fetch(`/api/categories/${id}`, {
          method: "DELETE",
          headers: { "Authorization": `Bearer ${token}` }
        });
      };

      let res = await performDelete(accessToken);

      // Silent retry on 401
      if (res.status === 401) {
        const newToken = await refreshAccessToken();
        if (newToken) {
          res = await performDelete(newToken);
        }
      }

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to delete category");
      }

      setCategories(prev => prev.filter(c => c._id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="p-8 lg:p-12 max-w-7xl mx-auto space-y-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-light border border-white/5 text-[10px] font-bold text-gold uppercase tracking-widest">
            <LayoutGrid className="w-3 h-3" /> System Architecture
          </div>
          <h1 className="text-4xl lg:text-5xl font-black heading-luxury tracking-tight text-white flex items-center gap-4">
            Category <span className="text-gold italic font-light">Management</span>
          </h1>
          <p className="text-gray-400 max-w-xl">
            Control the structural foundation of your catalog. Creating categories here will automatically update the Browse sections on the homepage.
          </p>
        </div>
        
        <Link 
          href="/admin/categories/new"
          className="group inline-flex items-center gap-2 px-8 py-4 bg-gold text-dark font-black rounded-2xl transition-all hover:bg-yellow-500 shadow-xl shadow-gold/20 hover:-translate-y-1"
        >
          <Plus className="w-5 h-5" />
          NEW CATEGORY
        </Link>
      </header>

      {error ? (
        <div className="p-8 glass-panel border border-red-500/30 rounded-3xl flex items-center gap-4 text-red-400">
          <AlertCircle className="w-8 h-8" />
          <div>
            <p className="font-bold text-lg">System Offline</p>
            <p className="text-sm opacity-80">{error}</p>
          </div>
        </div>
      ) : isLoading ? (
        <div className="py-32 flex flex-col items-center justify-center space-y-4 text-gold">
          <Loader2 className="w-12 h-12 animate-spin" />
          <p className="font-bold uppercase tracking-[0.2em] text-[10px]">Synchronizing Architecture...</p>
        </div>
      ) : categories.length === 0 ? (
        <div className="py-32 glass-panel rounded-[3rem] flex flex-col items-center justify-center text-center space-y-6">
           <div className="w-20 h-20 bg-surface-light rounded-full flex items-center justify-center">
             <LayoutGrid className="w-10 h-10 text-gold" />
           </div>
           <div>
             <h3 className="text-2xl font-black heading-luxury text-white">No Categories Active</h3>
             <p className="text-gray-400 max-w-sm mt-2">Initialize your database by creating your first structural category.</p>
           </div>
        </div>
      ) : (
        <div className="space-y-20">
          {/* Major Collections Section */}
          <section className="space-y-8">
            <div className="flex items-center gap-4">
              <Sparkles className="w-5 h-5 text-gold" />
              <h2 className="text-xl font-bold uppercase tracking-widest text-white">Major Collections <span className="text-gray-600 text-xs ml-2 font-normal">(Visible on Homepage)</span></h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.slice(0, 6).map((cat) => (
                <CategoryCard key={cat._id} cat={cat} onDelete={handleDelete} />
              ))}
            </div>
          </section>

          {/* Extensions Section */}
          {categories.length > 6 && (
            <section className="space-y-8 pt-12 border-t border-white/5">
              <div className="flex items-center gap-4">
                <LayoutGrid className="w-5 h-5 text-gray-500" />
                <h2 className="text-xl font-bold uppercase tracking-widest text-white">Custom Extensions <span className="text-gray-600 text-xs ml-2 font-normal">(Catalog Only)</span></h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-80 hover:opacity-100 transition-opacity">
                {categories.slice(6).map((cat) => (
                  <CategoryCard key={cat._id} cat={cat} onDelete={handleDelete} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}

// Sub-component for clean rendering
function CategoryCard({ cat, onDelete }: { cat: any, onDelete: (id: string, name: string) => void }) {
  return (
    <div className="group glass-panel rounded-3xl overflow-hidden border border-white/5 hover:border-gold/30 hover:shadow-2xl transition-all duration-500">
       <div className="aspect-video relative overflow-hidden bg-surface-light">
         <img 
           src={cat.image || `https://placehold.co/600x400?text=${encodeURIComponent(cat.name)}`} 
           alt={cat.name} 
           className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" 
         />
         <div className="absolute inset-0 bg-gradient-to-t from-dark/95 to-transparent flex items-end p-6">
            <h3 className="text-2xl font-black text-white heading-luxury tracking-wide">{cat.name}</h3>
         </div>
       </div>
       <div className="p-6">
         <p className="text-sm text-gray-400 line-clamp-2 min-h-[40px] italic">{cat.description || "No description provided."}</p>
         <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Deployment Active</span>
            <div className="flex items-center gap-2">
              <Link 
                href={`/admin/categories/edit/${cat._id}`}
                className="p-2 text-gray-500 hover:text-gold hover:bg-gold/10 rounded-xl transition-colors"
              >
                <Pencil className="w-5 h-5" />
              </Link>
              <button 
                onClick={() => onDelete(cat._id, cat.name)}
                className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
         </div>
       </div>
    </div>
  );
}
