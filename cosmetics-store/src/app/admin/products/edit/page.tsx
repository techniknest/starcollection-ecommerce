"use client";

import { Edit3, ArrowLeft, AlertCircle, Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EditProductSelectionPage() {
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
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">Edit Products</h1>
          <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold text-blue-400 uppercase tracking-widest">
            Selection Flow
          </div>
        </div>
        <p className="text-gray-400 max-w-lg font-light text-lg">Modify existing records. The flow will involve selecting a product from your catalog before opening the editor.</p>
      </header>

      <div className="relative">
        <div className="absolute inset-0 bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="relative z-10 p-20 border border-white/5 bg-surface/20 backdrop-blur-3xl rounded-[4rem] text-center space-y-8">
          <div className="w-24 h-24 bg-gold/10 rounded-[2rem] flex items-center justify-center mx-auto mb-6 border border-gold/20">
            <Edit3 className="w-12 h-12 text-gold" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Select for Modification</h2>
          <div className="max-w-md mx-auto space-y-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-gold transition-colors" />
              <input 
                disabled
                type="text" 
                placeholder="Search to select product..." 
                className="w-full bg-dark/50 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-sm opacity-50 cursor-not-allowed"
              />
            </div>
            <p className="text-gray-500 text-xs font-medium uppercase tracking-[0.2em]">Selection Logic Pending Integration</p>
          </div>
        </div>
      </div>
    </div>
  );
}
