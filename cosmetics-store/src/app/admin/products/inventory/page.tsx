"use client";

import { BarChart3, ArrowLeft, TrendingDown, AlertCircle, Package } from "lucide-react";
import { useRouter } from "next/navigation";

export default function InventoryManagementPage() {
  const router = useRouter();

  return (
    <div className="p-12 space-y-12">
      <header className="space-y-4">
        <button 
          onClick={() => router.push("/admin/products")}
          className="flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-opacity"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Hub
        </button>
        <div className="flex items-center gap-3">
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">Inventory</h1>
          <div className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] font-bold text-purple-400 uppercase tracking-widest">
            Stock Monitor
          </div>
        </div>
        <p className="text-gray-400 max-w-lg font-light text-lg">High-level oversight of your stock movements, replenishment schedules, and low-inventory alerts.</p>
      </header>

      {/* Placeholder Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Low Stock Items", value: "12", icon: TrendingDown, color: "text-red-400" },
          { label: "In Stock SKU", value: "84", icon: Package, color: "text-green-400" },
          { label: "Replenishment Orders", value: "3 Active", icon: BarChart3, color: "text-gold" },
        ].map((item) => (
          <div key={item.label} className="p-8 bg-surface/30 border border-white/5 rounded-3xl space-y-3">
            <div className="flex justify-between items-start">
              <p className="text-[10px] uppercase font-bold tracking-widest text-gray-500">{item.label}</p>
              <item.icon className={`w-5 h-5 ${item.color}`} />
            </div>
            <p className="text-2xl font-bold">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="p-16 border border-white/5 bg-white/[0.02] rounded-[4rem] flex flex-col items-center justify-center text-center space-y-6">
        <div className="w-20 h-20 bg-purple-500/10 rounded-full flex items-center justify-center mb-4">
          <AlertCircle className="w-10 h-10 text-purple-400" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight">Inventory Dashboard Pending</h2>
        <p className="text-gray-400 max-w-sm font-light">
          The stock management engine will allow for bulk updates and automated alerts for supply chain management.
        </p>
      </div>
    </div>
  );
}
