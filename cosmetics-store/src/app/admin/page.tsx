"use client";

import { useAuth } from "@/features/auth/hooks/use-auth";
import { Package, ShoppingBag, Users, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="p-12 space-y-12">
      <header className="flex justify-between items-end">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">System Overview</h1>
          <p className="text-gray-400 font-light text-lg">
            Welcome back, <span className="text-white font-medium">{user?.name}</span>. Admin privileges active.
          </p>
        </div>
        <div className="px-5 py-2.5 bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold rounded-full flex items-center gap-2.5 shadow-lg shadow-green-500/5">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
          SYSTEM ONLINE
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Revenue", value: "$45,231.89", trend: "+20.1%", icon: TrendingUp },
          { label: "Active Orders", value: "234", trend: "+15.5%", icon: ShoppingBag },
          { label: "Total Users", value: "1,202", trend: "+12.2%", icon: Users },
          { label: "Stock Units", value: "8,921", trend: "-5.4%", icon: Package },
        ].map((stat) => (
          <div key={stat.label} className="p-8 bg-surface/30 border border-white/5 rounded-[2.5rem] relative overflow-hidden group hover:bg-surface/40 transition-all duration-500">
            <div className="absolute top-0 right-0 p-8 opacity-5 transition-transform group-hover:scale-110">
              <stat.icon className="w-20 h-20" />
            </div>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mb-4">{stat.label}</p>
            <div className="flex justify-between items-end relative z-10">
              <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
              <span className={`text-xs font-bold px-2 py-1 rounded-lg ${
                stat.trend.startsWith('+') 
                  ? 'text-green-400 bg-green-400/5' 
                  : 'text-red-400 bg-red-400/5'
              }`}>
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Welcome Hero */}
      <div className="p-16 border border-white/5 bg-white/[0.02] rounded-[4rem] text-center space-y-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-gold/5 via-transparent to-transparent pointer-events-none" />
        
        <div className="w-24 h-24 bg-gold/10 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner shadow-gold/20">
          <Package className="w-12 h-12 text-gold" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight">Admin Hub Configuration</h2>
        <p className="text-gray-400 max-w-xl mx-auto leading-relaxed text-lg font-light">
          This dashboard is synchronized with your environment variables. You can now manage products, view analytics, and oversee your store's operations securely.
        </p>
        
        <div className="pt-8 flex items-center justify-center gap-4">
          <div className="h-px w-12 bg-white/10" />
          <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-gray-600">Secure Access Verified</span>
          <div className="h-px w-12 bg-white/10" />
        </div>
      </div>
    </div>
  );
}
