"use client";

import { 
  Package, 
  Plus, 
  Edit3, 
  BarChart3, 
  Search,
  ArrowRight,
  Sparkles
} from "lucide-react";
import Link from "next/link";

export default function ProductsHubPage() {
  const modules = [
    {
      name: "View Products",
      description: "Manage your entire catalog, search for specific items, and handle deletions.",
      icon: Search,
      href: "/admin/products/view",
      color: "bg-blue-500",
      count: "Active List"
    },
    {
      name: "Add Product",
      description: "Launch new items into your store with full details, images, and categories.",
      icon: Plus,
      href: "/admin/products/new",
      color: "bg-green-500",
      count: "New Entry"
    },
    {
      name: "Edit Selection",
      description: "Modify existing product details, update pricing, or change visibility.",
      icon: Edit3,
      href: "/admin/products/edit",
      color: "bg-gold",
      count: "Bulk Update"
    },
    {
      name: "Inventory",
      description: "Monitor stock levels, set low-stock alerts, and manage supply chain.",
      icon: BarChart3,
      href: "/admin/products/inventory",
      color: "bg-purple-500",
      count: "Stock Management"
    }
  ];

  return (
    <div className="p-12 space-y-12">
      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/5 text-[10px] font-bold text-gold uppercase tracking-widest">
          <Sparkles className="w-3 h-3" />
          Product System
        </div>
        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">Products Hub</h1>
        <p className="text-gray-400 max-w-2xl text-lg font-light leading-relaxed">
          The central Command Center for your store's inventory. Select a module below to begin managing your catalog.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {modules.map((module) => (
          <Link
            key={module.name}
            href={module.href}
            className="group relative bg-surface/30 border border-white/5 rounded-[3rem] p-10 overflow-hidden transition-all duration-500 hover:bg-surface/40 hover:scale-[1.01] hover:border-white/10"
          >
            {/* Background Glow */}
            <div className={`absolute -top-20 -right-20 w-40 h-40 ${module.color} opacity-0 group-hover:opacity-10 blur-[80px] transition-opacity duration-700`} />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-8">
                <div className={`w-16 h-16 ${module.color}/10 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-500`}>
                  <module.icon className={`w-8 h-8 ${module.name === 'Edit Selection' ? 'text-gold' : ''}`} />
                </div>
                <div className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[8px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                  {module.count}
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-3 group-hover:text-gold transition-colors">{module.name}</h3>
              <p className="text-gray-400 text-sm font-light leading-loose mb-10 flex-1">
                {module.description}
              </p>

              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest group-hover:gap-4 transition-all">
                <span>Enter Module</span>
                <ArrowRight className="w-4 h-4 text-gold" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Tips or Analytics mini-row */}
      <footer className="pt-12 border-t border-white/5 flex flex-wrap gap-12">
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <p className="text-xs text-gray-500 font-medium">All modules currently synced with live MongoDB node</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
          <p className="text-xs text-gray-500 font-medium">Secure Admin Session Active</p>
        </div>
      </footer>
    </div>
  );
}
