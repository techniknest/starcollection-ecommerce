"use client";

import { useState, useEffect } from "react";
import { 
  Star, 
  MessageSquare, 
  User, 
  Sparkles, 
  Plus, 
  X, 
  CheckCircle2, 
  Loader2,
  Quote
} from "lucide-react";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    productName: "",
    rating: 5,
    comment: "",
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await fetch("/api/reviews");
      const json = await res.json();
      if (json.success) setReviews(json.data);
    } catch (err) {
      console.error("Failed to fetch reviews", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({ name: "", productName: "", rating: 5, comment: "" });
        fetchReviews();
        setTimeout(() => {
          setSuccess(false);
          setIsModalOpen(false);
        }, 2000);
      }
    } catch (err) {
      console.error("Submission error", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-32 pb-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 blur-[120px] rounded-full animate-liquid-morph pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-surface-light/20 blur-[150px] rounded-full animate-fluid-float pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Hero Section */}
        <header className="text-center space-y-8 mb-20">
           <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass-panel animate-fade-in-up">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">Customer Experiences</span>
           </div>
           
           <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-black text-foreground tracking-tight heading-luxury leading-[1.1] animate-fade-in-up">
                OUR CLIENTS' <br />
                <span className="text-gold italic font-light">STORIES</span>
              </h1>
              <p className="max-w-2xl mx-auto text-gray-400 text-lg font-light leading-relaxed animate-fade-in-up">
                Discover why Stars Collection is the destination of choice for elegance and authenticity. Real experiences from our valued community.
              </p>
           </div>

           <button 
             onClick={() => setIsModalOpen(true)}
             className="inline-flex items-center gap-3 px-10 py-5 bg-gold text-dark font-black rounded-2xl hover:bg-yellow-500 transition-all hover:scale-[1.02] shadow-xl shadow-gold/20 animate-fade-in-up"
           >
             <Plus className="w-5 h-5" />
             SHARE YOUR STORY
           </button>
        </header>

        {/* Reviews Grid */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-gray-500">
             <Loader2 className="w-10 h-10 animate-spin text-gold" />
             <p className="text-[10px] uppercase font-bold tracking-widest">Gathering Experiences...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {reviews.map((review, idx) => (
               <div 
                 key={review._id} 
                 className="group glass-panel border border-white/5 p-10 rounded-[3rem] space-y-6 hover:border-gold/30 hover:shadow-2xl hover:shadow-gold/10 transition-all duration-500 hover:-translate-y-2 animate-fade-in-up"
                 style={{ animationDelay: `${idx * 100}ms` }}
               >
                  <div className="flex items-center justify-between">
                     <div className="w-12 h-12 rounded-2xl bg-surface-light flex items-center justify-center text-gold shadow-inner">
                        <User className="w-5 h-5" />
                     </div>
                     <div className="flex gap-1 text-gold">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < review.rating ? 'fill-gold' : 'text-gray-700'}`} 
                          />
                        ))}
                     </div>
                  </div>

                  <div className="space-y-4">
                    <div className="relative">
                       <Quote className="absolute -top-4 -left-4 w-10 h-10 text-gold/5 -z-10" />
                       <p className="text-foreground text-base leading-relaxed font-light italic">
                         "{review.comment}"
                       </p>
                    </div>
                    
                    <div className="pt-6 border-t border-white/5">
                       <p className="font-bold text-white tracking-tight text-lg heading-luxury">{review.name}</p>
                       <p className="text-gold text-[10px] uppercase font-bold tracking-widest mt-1">
                         Regarding: <span className="text-gray-400 italic normal-case font-light">{review.productName}</span>
                       </p>
                    </div>
                  </div>
               </div>
             ))}
          </div>
        )}
      </div>

      {/* Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
          <div 
            className="absolute inset-0 bg-dark/60 backdrop-blur-md" 
            onClick={() => setIsModalOpen(false)}
          />
          
          <div className="relative w-full max-w-xl glass-panel border border-white/10 rounded-[3rem] shadow-2xl overflow-hidden p-10 animate-in zoom-in-95 duration-300">
             <header className="flex items-center justify-between mb-8">
                <div>
                   <h2 className="text-2xl font-black heading-luxury text-white">Share Experience</h2>
                   <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-bold">Your feedback matters</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-gray-500 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
             </header>

             {success ? (
               <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mb-4 animate-in zoom-in duration-500">
                     <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-black text-white heading-luxury">Experience Saved</h3>
                  <p className="text-gray-400 max-w-xs">Thank you for sharing your story with Stars Collection.</p>
               </div>
             ) : (
               <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                       <label className="text-[10px] uppercase font-bold tracking-widest text-gold ml-1">Your Name</label>
                       <input 
                         required
                         type="text" 
                         className="w-full bg-dark/50 border border-white/10 rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:border-gold/30 transition-all font-light"
                         placeholder="Jane Doe"
                         value={formData.name}
                         onChange={(e) => setFormData({...formData, name: e.target.value})}
                       />
                    </div>
                    <div className="space-y-1.5">
                       <label className="text-[10px] uppercase font-bold tracking-widest text-gold ml-1">Product</label>
                       <input 
                         required
                         type="text" 
                         className="w-full bg-dark/50 border border-white/10 rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:border-gold/30 transition-all font-light"
                         placeholder="Lipstick, Decor, etc."
                         value={formData.productName}
                         onChange={(e) => setFormData({...formData, productName: e.target.value})}
                       />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                     <label className="text-[10px] uppercase font-bold tracking-widest text-gold ml-1">Rating</label>
                     <div className="flex items-center gap-3 p-2 bg-dark/50 border border-white/10 rounded-2xl w-fit">
                        {[1, 2, 3, 4, 5].map((s) => (
                           <button 
                             key={s}
                             type="button"
                             onClick={() => setFormData({...formData, rating: s})}
                             className="p-1 transition-transform hover:scale-125"
                           >
                             <Star className={`w-6 h-6 ${s <= formData.rating ? 'fill-gold text-gold' : 'text-gray-700'}`} />
                           </button>
                        ))}
                     </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-gold ml-1">Your Experience</label>
                    <textarea 
                      required
                      rows={4}
                      className="w-full bg-dark/50 border border-white/10 rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:border-gold/30 transition-all resize-none font-light"
                      placeholder="Tell us your story..."
                      value={formData.comment}
                      onChange={(e) => setFormData({...formData, comment: e.target.value})}
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-5 bg-gold text-dark font-black rounded-2xl hover:bg-yellow-500 transition-all flex items-center justify-center gap-3 shadow-xl shadow-gold/20 disabled:opacity-50"
                  >
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <MessageSquare className="w-5 h-5" />}
                    {isSubmitting ? "PUBLISHING..." : "PUBLISH STORY"}
                  </button>
               </form>
             )}
          </div>
        </div>
      )}
    </div>
  );
}
