"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { 
  Trash2, 
  MessageSquare, 
  User, 
  Star, 
  Search, 
  Loader2, 
  AlertCircle,
  ArrowLeft,
  Sparkles
} from "lucide-react";
import Link from "next/link";

export default function AdminReviewsPage() {
  const { accessToken } = useAuth();
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await fetch("/api/reviews");
      const json = await res.json();
      if (json.success) {
        setReviews(json.data);
      } else {
        setError(json.message);
      }
    } catch (err) {
      setError("Failed to fetch reviews");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently remove this review? This action cannot be undone.")) return;
    
    try {
      const res = await fetch(`/api/reviews/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${accessToken}`
        }
      });
      const data = await res.json();
      
      if (res.ok) {
        setReviews(reviews.filter(r => r._id !== id));
      } else {
        alert(data.message || "Delete failed");
      }
    } catch (err) {
      alert("An error occurred while deleting");
    }
  };

  const filteredReviews = reviews.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    r.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.comment.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-12 space-y-12">
      <header className="space-y-4">
        <Link href="/admin" className="flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-widest hover:opacity-80">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </Link>
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-4">
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight heading-luxury">Review Moderation</h1>
              <Sparkles className="w-8 h-8 text-gold" />
           </div>
           
           <div className="relative w-96">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search reviews or customers..." 
                className="w-full bg-surface/40 border border-white/5 rounded-2xl pl-14 pr-6 py-4 text-sm focus:outline-none focus:border-gold/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
           </div>
        </div>
      </header>

      {error && (
        <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-3xl flex items-center gap-4 text-red-400">
           <AlertCircle className="w-6 h-6" />
           <p className="font-medium">{error}</p>
        </div>
      )}

      <div className="glass-panel border border-white/5 rounded-[2.5rem] overflow-hidden">
         <table className="w-full text-left">
            <thead>
               <tr className="border-b border-white/5 bg-white/5 text-[10px] uppercase font-bold tracking-[0.2em] text-gray-500">
                  <th className="px-10 py-6">Customer</th>
                  <th className="px-10 py-6">Reference</th>
                  <th className="px-10 py-6">Experience</th>
                  <th className="px-10 py-6">Rating</th>
                  <th className="px-10 py-6 text-right">Action</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
               {isLoading ? (
                 <tr>
                    <td colSpan={5} className="py-20 text-center">
                       <Loader2 className="w-10 h-10 animate-spin text-gold mx-auto" />
                    </td>
                 </tr>
               ) : filteredReviews.length === 0 ? (
                 <tr>
                    <td colSpan={5} className="py-20 text-center text-gray-500 font-light italic">
                       No customer stories found matching your criteria.
                    </td>
                 </tr>
               ) : (
                 filteredReviews.map((review) => (
                   <tr key={review._id} className="group hover:bg-white/5 transition-colors">
                      <td className="px-10 py-8">
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-surface flex items-center justify-center text-gold">
                               <User className="w-5 h-5" />
                            </div>
                            <div>
                               <p className="font-bold text-white text-lg">{review.name}</p>
                               <p className="text-[10px] text-gray-500 uppercase tracking-widest">{new Date(review.createdAt).toLocaleDateString()}</p>
                            </div>
                         </div>
                      </td>
                      <td className="px-10 py-8 italic text-gold font-light">
                         {review.productName}
                      </td>
                      <td className="px-10 py-8 max-w-md">
                         <p className="line-clamp-2 text-gray-400 text-sm italic font-light">"{review.comment}"</p>
                      </td>
                      <td className="px-10 py-8">
                         <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                               <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-gold text-gold' : 'text-gray-800'}`} />
                            ))}
                         </div>
                      </td>
                      <td className="px-10 py-8 text-right">
                         <button 
                           onClick={() => handleDelete(review._id)}
                           className="p-4 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all shadow-lg shadow-red-500/5 group/btn"
                         >
                            <Trash2 className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                         </button>
                      </td>
                   </tr>
                 ))
               )}
            </tbody>
         </table>
      </div>
    </div>
  );
}
