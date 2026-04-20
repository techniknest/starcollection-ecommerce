"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { 
  ArrowLeft, 
  Sparkles, 
  Package, 
  Image as ImageIcon, 
  DollarSign, 
  Layers, 
  Tag, 
  Hash,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Upload,
  X
} from "lucide-react";
import Link from "next/link";

export default function AddProductPage() {
  const router = useRouter();
  const { accessToken, refreshAccessToken } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "", // Removed hardcoded 'cosmetics'
    brand: "",
    description: "",
    discountPrice: "",
    isFeatured: false,
  });

  const [dbCategories, setDbCategories] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/categories")
      .then(res => res.json())
      .then(data => {
         if (Array.isArray(data)) {
           setDbCategories(data);
           // Auto-select first category if none selected
           if (data.length > 0 && !formData.category) {
             setFormData(prev => ({ ...prev, category: data[0].name }));
           }
         }
      })
      .catch(console.error);
  }, []);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: val
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size must be less than 5MB");
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const data = new FormData();
    data.append("file", file);

    let currentToken = accessToken;

    const performUpload = async (token: string | null) => {
      return fetch("/api/upload", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: data,
      });
    };

    let res = await performUpload(currentToken);

    // If unauthorized, attempt to refresh and retry once
    if (res.status === 401) {
      console.warn("Upload service: Access token expired. Attempting refresh...");
      const newToken = await refreshAccessToken();
      if (newToken) {
        res = await performUpload(newToken);
      }
    }

    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.message || "Upload failed (Unauthorized or Server Error)");
    }
    return json.url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!accessToken) {
      setError("Active session required. Please sign in again.");
      setIsLoading(false);
      return;
    }

    // Basic Frontend Validation
    if (formData.name.trim().length < 3) {
      setError("Product name must be at least 3 characters");
      setIsLoading(false);
      return;
    }

    if (!imageFile) {
      setError("Please upload a product image");
      setIsLoading(false);
      return;
    }

    try {
      // 1. Upload to Cloudinary
      setIsUploading(true);
      const uploadedUrl = await uploadImage(imageFile);
      setIsUploading(false);

      // 2. Create Product
      const performCreate = async (token: string | null) => {
        const productBody = {
          ...formData,
          price: Number(formData.price),
          stock: 99, // Static default for showcase consistency
          discountPrice: formData.discountPrice ? Number(formData.discountPrice) : undefined,
          images: [uploadedUrl],
        };

        return fetch("/api/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(productBody),
        });
      };

      let res = await performCreate(accessToken);
      if (res.status === 401) {
        const newToken = await refreshAccessToken();
        if (newToken) res = await performCreate(newToken);
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create product");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/products/view");
      }, 2000);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
      setIsUploading(false);
    }
  };

  return (
    <div className="p-12 max-w-5xl mx-auto space-y-12">
      {/* Header */}
      <header className="space-y-4">
        <Link 
          href="/admin/products"
          className="flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-opacity"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Hub
        </Link>
        <div className="flex items-center gap-3">
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">Add Product</h1>
          <Sparkles className="w-8 h-8 text-gold" />
        </div>
        <p className="text-gray-400 font-light text-lg">Launch a new item with Cloudinary image hosting.</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        {error && (
          <div className="p-5 bg-red-500/10 border border-red-500/20 rounded-3xl flex items-center gap-4 text-red-400 animate-in fade-in slide-in-from-top-4">
            <AlertCircle className="w-6 h-6" />
            <p className="font-medium">{error}</p>
          </div>
        )}

        {success && (
          <div className="p-5 bg-green-500/10 border border-green-500/20 rounded-3xl flex items-center gap-4 text-green-400 animate-in fade-in slide-in-from-top-4">
            <CheckCircle2 className="w-6 h-6" />
            <p className="font-medium">Product created successfully! Redirecting...</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <section className="bg-surface/20 border border-white/5 rounded-[2.5rem] p-8 space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <Package className="w-5 h-5 text-gold" />
                <h3 className="text-lg font-bold">General Information</h3>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500 ml-1">Product Name</label>
                <input
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-dark/50 border border-white/10 rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/30 transition-all"
                  placeholder="e.g. Silk Radiance Face Oil"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500 ml-1">Brand</label>
                <input
                  required
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="w-full bg-dark/50 border border-white/10 rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/30 transition-all"
                  placeholder="e.g. Celestial Beauty"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500 ml-1">Description</label>
                <textarea
                  required
                  rows={4}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full bg-dark/50 border border-white/10 rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/30 transition-all resize-none"
                  placeholder="Tell the story of this product..."
                />
              </div>
            </section>

            <section className="bg-surface/20 border border-white/5 rounded-[2.5rem] p-8 space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <ImageIcon className="w-5 h-5 text-gold" />
                <h3 className="text-lg font-bold">Product Media</h3>
              </div>
              
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center gap-4 transition-all cursor-pointer group ${
                  imagePreview ? 'border-gold/50 bg-gold/5' : 'border-white/10 bg-white/5 hover:border-gold/30 hover:bg-gold/5'
                }`}
              >
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden" 
                />
                
                {imagePreview ? (
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setImageFile(null);
                        setImagePreview(null);
                      }}
                      className="absolute top-4 right-4 p-2 bg-dark/80 backdrop-blur-md rounded-full text-white hover:bg-red-500 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Upload className="w-8 h-8 text-gray-400 group-hover:text-gold" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-white mb-1">Upload Product Photos</p>
                      <p className="text-xs text-gray-500">Drag & Drop or click to select</p>
                    </div>
                  </>
                )}
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <section className="bg-surface/20 border border-white/5 rounded-[2.5rem] p-8 space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <DollarSign className="w-5 h-5 text-gold" />
                <h3 className="text-lg font-bold">Aesthetic Pricing</h3>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500 ml-1">Exhibition Price (PKR)</label>
                <input
                  required
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full bg-dark/50 border border-white/10 rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/30 transition-all"
                  placeholder="e.g. 2500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500 ml-1">Discount Price (PKR)</label>
                <input
                  type="number"
                  name="discountPrice"
                  value={formData.discountPrice}
                  onChange={handleChange}
                  className="w-full bg-dark/50 border border-white/10 rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/30 transition-all"
                  placeholder="e.g. 1999"
                />
              </div>
            </section>

            <section className="bg-surface/20 border border-white/5 rounded-[2.5rem] p-8 space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <Layers className="w-5 h-5 text-gold" />
                <h3 className="text-lg font-bold">Classification</h3>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500 ml-1">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-dark/50 border border-white/10 rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/30 transition-all appearance-none"
                >
                  <option value="" disabled>Select a structural category</option>
                  {dbCategories.map(cat => (
                    <option key={cat._id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="flex items-center gap-3">
                  <Tag className="w-4 h-4 text-gold" />
                  <span className="text-sm font-medium">Feature on Homepage</span>
                </div>
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-white/10 bg-dark text-gold focus:ring-gold accent-gold"
                />
              </div>
            </section>

            <button
              type="submit"
              disabled={isLoading || success}
              className="w-full group bg-gold text-dark font-black rounded-[2rem] py-5 flex items-center justify-center gap-3 hover:bg-yellow-500 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-gold/20 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>{isUploading ? "UPLOADING IMAGE..." : "SAVING PRODUCT..."}</span>
                </>
              ) : success ? (
                <CheckCircle2 className="w-6 h-6" />
              ) : (
                <>
                  <Hash className="w-5 h-5" />
                  PUBLISH PRODUCT
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
