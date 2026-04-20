"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { Package, Layers, MessageSquare, Sparkles, Loader2 } from "lucide-react";

export default function AdminDashboard() {
  const { user, accessToken, refreshAccessToken } = useAuth();
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    reviews: 0,
    promotions: 0
  });
  const [recentProducts, setRecentProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      const performFetch = async (url: string, token: string | null) => {
        return fetch(url, { headers: { "Authorization": `Bearer ${token}` } });
      };

      try {
        let statsRes = await performFetch("/api/admin/stats", accessToken);
        let productsRes = await performFetch("/api/products", accessToken);

        if (statsRes.status === 401 || productsRes.status === 401) {
          const newToken = await refreshAccessToken();
          if (newToken) {
            statsRes = await performFetch("/api/admin/stats", newToken);
            productsRes = await performFetch("/api/products", newToken);
          }
        }

        const statsJson = await statsRes.json();
        const productsJson = await productsRes.json();

        if (statsJson.success) setStats(statsJson.data);
        if (productsJson.success) setRecentProducts(productsJson.data.slice(0, 5));

      } catch (err) {
        console.error("Dashboard Data Sync Error:", err);
      } finally {
        setIsLoading(false);
      }
    }

    if (accessToken) fetchDashboardData();
  }, [accessToken, refreshAccessToken]);

  const cards = [
    { label: "Total Showcase Items", value: stats.products, icon: Package, color: "text-gold" },
    { label: "Curated Collections", value: stats.categories, icon: Layers, color: "text-blue-400" },
    { label: "Client Stories", value: stats.reviews, icon: MessageSquare, color: "text-green-400" },
    { label: "Active Promotions", value: stats.promotions, icon: Sparkles, color: "text-purple-400" },
  ];

  return (
    <div className="p-8 lg:p-12 space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <h1 className="text-4xl font-bold tracking-tight heading-luxury uppercase">Showcase Overview</h1>
             <div className="px-3 py-1 bg-gold/10 border border-gold/20 text-gold text-[10px] font-black rounded-full uppercase tracking-widest animate-pulse">
               Live Exhibition
             </div>
          </div>
          <p className="text-gray-400 font-light text-lg">
            Welcome back, <span className="text-white font-medium">{user?.name}</span>. Management mode active.
          </p>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((stat) => (
          <div key={stat.label} className="p-8 bg-surface/30 border border-white/5 rounded-[2.5rem] relative overflow-hidden group hover:bg-surface/40 transition-all duration-500 shadow-xl shadow-black/20">
            <div className={`absolute top-0 right-0 p-8 opacity-5 transition-transform group-hover:scale-110 ${stat.color}`}>
              <stat.icon className="w-20 h-20" />
            </div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-4">{stat.label}</p>
            <div className="flex justify-between items-end relative z-10">
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin text-gold" />
              ) : (
                <p className="text-4xl font-black tracking-tight text-white">{stat.value}</p>
              )}
              <div className={`p-2 rounded-xl bg-white/5 ${stat.color} shadow-inner`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Items List */}
        <div className="lg:col-span-2 bg-surface/20 border border-white/5 rounded-[3rem] p-8 space-y-8 shadow-2xl">
           <div className="flex items-center justify-between px-2">
              <h3 className="text-xl font-bold heading-luxury tracking-wider text-white">Recent Masterpieces</h3>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Global Catalog Connection</p>
           </div>

           <div className="space-y-4">
              {isLoading ? (
                Array(3).fill(0).map((_, i) => (
                  <div key={i} className="h-20 bg-white/5 rounded-2xl animate-pulse" />
                ))
              ) : recentProducts.length > 0 ? (
                recentProducts.map(product => (
                  <div key={product._id} className="flex items-center justify-between p-4 bg-white/[0.03] border border-white/5 rounded-2xl group hover:bg-white/[0.07] transition-all">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-surface-light border border-white/10 shrink-0">
                           <img src={product.images[0]} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div>
                           <p className="font-bold text-white group-hover:text-gold transition-colors">{product.name}</p>
                           <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">{product.category}</p>
                        </div>
                     </div>
                     <p className="font-bold text-gold text-sm tracking-tighter">RS. {product.price.toLocaleString()}</p>
                  </div>
                ))
              ) : (
                <p className="py-20 text-center text-gray-500 italic">No products found in the live exhibition.</p>
              )}
           </div>
        </div>

        {/* Gallery Status */}
        <div className="bg-gold/[0.02] border border-gold/10 rounded-[3rem] p-10 flex flex-col justify-center items-center text-center space-y-6 shadow-2xl shadow-gold/5">
           <div className="w-20 h-20 bg-gold/10 rounded-3xl flex items-center justify-center shadow-lg shadow-gold/10">
              <Sparkles className="w-10 h-10 text-gold" />
           </div>
           <div className="space-y-3">
              <h4 className="text-xl font-bold heading-luxury uppercase text-white">Luxury Overview</h4>
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                Your showcase is fully synchronized with the Cloudinary gallery and MongoDB architecture.
              </p>
           </div>
           <div className="pt-6 border-t border-white/5 w-full">
              <p className="text-[10px] uppercase font-black tracking-widest text-gold opacity-50">Authorized Management</p>
           </div>
        </div>
      </div>
    </div>
  );
}
