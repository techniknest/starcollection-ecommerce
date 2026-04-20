"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { 
  Sparkles, 
  Plus, 
  Trash2, 
  Calendar, 
  Tag, 
  Package, 
  CheckCircle2, 
  X, 
  Loader2,
  AlertCircle
} from "lucide-react";

export default function AdminPromotionsPage() {
  const { accessToken } = useAuth();
  const [promotions, setPromotions] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [dbCategories, setDbCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    discountPercentage: 10,
    startDate: "",
    endDate: "",
    targetType: "all",
    targetId: "",
  });

  useEffect(() => {
    fetchPromotions();
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchPromotions = async () => {
    try {
      const res = await fetch("/api/promotions?admin=true"); 
      const json = await res.json();
      if (json.success) setPromotions(json.data);
    } catch (err) {
      console.error("Failed to fetch promotions", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const json = await res.json();
      if (json.success) setProducts(json.data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const json = await res.json();
      if (Array.isArray(json)) setDbCategories(json);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const url = editingId ? `/api/promotions/${editingId}` : "/api/promotions";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({ title: "", discountPercentage: 10, startDate: "", endDate: "", targetType: "all", targetId: "" });
        setEditingId(null);
        fetchPromotions();
        setTimeout(() => {
          setSuccess(false);
          setIsModalOpen(false);
        }, 1500);
      } else {
        const data = await res.json();
        throw new Error(data.message || "Action failed");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (p: any) => {
    setEditingId(p._id);
    setFormData({
      title: p.title,
      discountPercentage: p.discountPercentage,
      startDate: new Date(p.startDate).toISOString().split('T')[0],
      endDate: new Date(p.endDate).toISOString().split('T')[0],
      targetType: p.targetType,
      targetId: p.targetId || "",
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to cancel this promotion?")) return;
    
    try {
      const res = await fetch(`/api/promotions/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${accessToken}` }
      });
      if (res.ok) {
        setPromotions(promotions.filter(p => p._id !== id));
      }
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  return (
    <div className="p-12 space-y-12 text-white">
      <header className="flex justify-between items-center">
        <div className="space-y-2">
           <h1 className="text-4xl font-bold tracking-tight heading-luxury uppercase">Promotions</h1>
           <p className="text-gray-400 font-light text-lg">Schedule seasonal discounts and product highlights.</p>
        </div>
        <button 
          onClick={() => {
            setEditingId(null);
            setFormData({ title: "", discountPercentage: 10, startDate: "", endDate: "", targetType: "all", targetId: "" });
            setIsModalOpen(true);
          }}
          className="flex items-center gap-3 px-8 py-4 bg-gold text-dark font-black rounded-2xl hover:bg-yellow-500 transition-all shadow-xl shadow-gold/10"
        >
          <Plus className="w-5 h-5" />
          SCHEDULE PROMO
        </button>
      </header>

      {/* Promotions Table */}
      <div className="glass-panel border border-white/5 rounded-[2.5rem] overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/5 bg-white/5 text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400">
              <th className="px-10 py-6 text-gray-500">Promotion Title</th>
              <th className="px-10 py-6 text-gray-500">Discount</th>
              <th className="px-10 py-6 text-gray-500">Timeline</th>
              <th className="px-10 py-6 text-gray-500">Applicable To</th>
              <th className="px-10 py-6 text-right text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {isLoading ? (
              <tr><td colSpan={5} className="py-20 text-center text-gray-500"><Loader2 className="w-10 h-10 animate-spin text-gold mx-auto" /></td></tr>
            ) : promotions.length === 0 ? (
              <tr><td colSpan={5} className="py-20 text-center text-gray-500 italic">No promotions scheduled.</td></tr>
            ) : (
              promotions.map((p) => (
                <tr key={p._id} className="group hover:bg-white/5 transition-colors">
                  <td className="px-10 py-8">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-gold">
                           <Sparkles className="w-5 h-5" />
                        </div>
                        <p className="font-bold text-white text-lg">{p.title}</p>
                     </div>
                  </td>
                  <td className="px-10 py-8">
                     <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-lg font-bold">-{p.discountPercentage}%</span>
                  </td>
                  <td className="px-10 py-8 text-gray-400 text-sm font-light">
                     <div className="flex flex-col">
                        <span>Start: {new Date(p.startDate).toLocaleDateString()}</span>
                        <span>End: {new Date(p.endDate).toLocaleDateString()}</span>
                     </div>
                  </td>
                  <td className="px-10 py-8">
                     {p.targetType === "all" ? (
                       <span className="text-gold uppercase tracking-widest text-[10px] font-bold">Store-Wide</span>
                     ) : p.targetType === "category" ? (
                       <span className="text-yellow-500 font-light truncate max-w-[150px] inline-block capitalize">Category: {p.targetId || 'All'}</span>
                     ) : (
                       <span className="text-gray-300 font-light truncate max-w-[150px] inline-block">Product: {p.targetId ? products.find(prod => prod._id === p.targetId)?.name || 'Unknown' : 'All'}</span>
                     )}
                  </td>
                  <td className="px-10 py-8 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => handleEdit(p)} className="p-3 bg-white/5 text-gray-400 rounded-xl hover:bg-gold hover:text-dark transition-all">
                         <Tag className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(p._id)} className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                         <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-dark/60 backdrop-blur-md">
           <div className="relative w-full max-w-2xl glass-panel border border-white/10 rounded-[3rem] shadow-2xl p-12 overflow-hidden animate-in zoom-in-95 duration-300">
              <header className="flex items-center justify-between mb-10">
                 <div>
                    <h2 className="text-2xl font-black heading-luxury text-white">{editingId ? 'Modify Strategy' : 'Schedule Promotion'}</h2>
                    <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">{editingId ? 'Update Discount Parameters' : 'Seasonal Discounts & Highlights'}</p>
                 </div>
                 <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white transition-colors"><X className="w-6 h-6" /></button>
              </header>

              {success ? (
                <div className="py-20 text-center space-y-4">
                   <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto" />
                   <h3 className="text-2xl font-black text-white heading-luxury">{editingId ? 'Strategy Updated' : 'Promotion Published'}</h3>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                   {error && (
                     <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-500 text-sm">
                        <AlertCircle className="w-5 h-5" />
                        {error}
                     </div>
                   )}
                   <div className="grid grid-cols-2 gap-8">
                       <div className="space-y-2">
                          <label className="text-[10px] uppercase font-bold tracking-widest text-gold ml-1">Title</label>
                          <input required type="text" className="w-full bg-dark/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-gold/30" placeholder="Spring Sale 2024" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] uppercase font-bold tracking-widest text-gold ml-1">Discount (%)</label>
                          <input required type="number" min="1" max="99" className="w-full bg-dark/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-gold/30" value={formData.discountPercentage} onChange={(e) => setFormData({...formData, discountPercentage: parseInt(e.target.value)})} />
                       </div>
                   </div>

                   <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-2">
                         <label className="text-[10px] uppercase font-bold tracking-widest text-gold ml-1">Start Date</label>
                         <input required type="date" className="w-full bg-dark/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-gold/30" value={formData.startDate} onChange={(e) => setFormData({...formData, startDate: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] uppercase font-bold tracking-widest text-gold ml-1">End Date</label>
                         <input required type="date" className="w-full bg-dark/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-gold/30" value={formData.endDate} onChange={(e) => setFormData({...formData, endDate: e.target.value})} />
                      </div>
                   </div>

                   <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-gold ml-1">Target Scope</label>
                      <div className="grid grid-cols-2 gap-8">
                         <select className="w-full bg-dark/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none" value={formData.targetType} onChange={(e) => setFormData({...formData, targetType: e.target.value, targetId: ""})}>
                            <option value="all">Entire Store</option>
                            <option value="category">Specific Category</option>
                            <option value="product">Specific Product</option>
                         </select>
                         {formData.targetType === "category" && (
                           <select required className="w-full bg-dark/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none" value={formData.targetId} onChange={(e) => setFormData({...formData, targetId: e.target.value})}>
                              <option value="">Select Category...</option>
                              {dbCategories.map((cat: any) => (
                                <option key={cat._id} value={cat.name}>
                                  {cat.name}
                                </option>
                              ))}
                           </select>
                         )}
                         {formData.targetType === "product" && (
                           <select required className="w-full bg-dark/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none" value={formData.targetId} onChange={(e) => setFormData({...formData, targetId: e.target.value})}>
                              <option value="">Select Product...</option>
                              {products.map((p: any) => (
                                <option key={p._id} value={p._id}>
                                  {p.name}
                                </option>
                              ))}
                           </select>
                         )}
                      </div>
                   </div>

                   <button type="submit" disabled={isSubmitting} className="w-full py-5 bg-gold text-dark font-black rounded-2xl hover:bg-yellow-500 transition-all shadow-xl shadow-gold/20 flex items-center justify-center gap-3 disabled:opacity-50 uppercase tracking-widest">
                      {isSubmitting ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                         <CheckCircle2 className="w-5 h-5" />
                      )}
                      {isSubmitting ? 'Processing...' : (editingId ? 'Update Strategy' : 'Publish Promotion')}
                   </button>
                </form>
              )}
           </div>
        </div>
      )}
    </div>
  );
}
