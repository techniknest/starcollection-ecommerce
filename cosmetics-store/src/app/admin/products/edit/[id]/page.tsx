"use client";

import { useState, useRef, useEffect, use } from "react";
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
  X,
  Save
} from "lucide-react";
import Link from "next/link";

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { accessToken, refreshAccessToken } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    brand: "",
    description: "",
    discountPrice: "",
    isFeatured: false,
    images: [] as string[]
  });

  const [dbCategories, setDbCategories] = useState<any[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Categories
        const catRes = await fetch("/api/categories");
        const categories = await catRes.json();
        if (Array.isArray(categories)) setDbCategories(categories);

        // Fetch Product
        const prodRes = await fetch(`/api/products/${id}`);
        const prodData = await prodRes.json();

        if (prodData.success) {
          const p = prodData.data;
          setFormData({
            name: p.name,
            price: p.price.toString(),
            category: p.category,
            brand: p.brand,
            description: p.description,
            discountPrice: p.discountPrice ? p.discountPrice.toString() : "",
            isFeatured: p.isFeatured || false,
            images: p.images || []
          });
          if (p.images && p.images.length > 0) {
            setImagePreview(p.images[0]);
          }
        } else {
          setError(prodData.message || "Product not found");
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Failed to load product data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

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

    const performUpload = async (token: string | null) => {
      return fetch("/api/upload", {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: data,
      });
    };

    let res = await performUpload(accessToken);
    if (res.status === 401) {
      const newToken = await refreshAccessToken();
      if (newToken) res = await performUpload(newToken);
    }

    const json = await res.json();
    if (!res.ok) throw new Error(json.message || "Upload failed");
    return json.url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      let finalImages = formData.images;
      
      if (imageFile) {
        setIsUploading(true);
        const uploadedUrl = await uploadImage(imageFile);
        finalImages = [uploadedUrl];
        setIsUploading(false);
      }

      const performUpdate = async (token: string | null) => {
        const updateBody = {
          ...formData,
          price: Number(formData.price),
          discountPrice: formData.discountPrice ? Number(formData.discountPrice) : null,
          images: finalImages,
        };

        return fetch(`/api/products/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(updateBody),
        });
      };

      let res = await performUpdate(accessToken);
      if (res.status === 401) {
        const newToken = await refreshAccessToken();
        if (newToken) res = await performUpdate(newToken);
      }

      // Robust JSON Parsing
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to update product");
        setSuccess(true);
        setTimeout(() => router.push("/admin/products/view"), 2000);
      } else {
        const text = await res.text();
        throw new Error(`Server Error: ${res.status} ${res.statusText}`);
      }

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSaving(false);
      setIsUploading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-gold animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-12 max-w-5xl mx-auto space-y-12">
      <header className="space-y-4">
        <Link 
          href="/admin/products/view"
          className="flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-opacity"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Collection
        </Link>
        <div className="flex items-center gap-3">
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">Modify Masterpiece</h1>
          <Sparkles className="w-8 h-8 text-gold" />
        </div>
        <p className="text-gray-400 font-light text-lg">Update specifications for <span className="text-white font-medium">{formData.name}</span>.</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        {error && (
          <div className="p-5 bg-red-500/10 border border-red-500/20 rounded-3xl flex items-center gap-4 text-red-400">
            <AlertCircle className="w-6 h-6" />
            <p className="font-medium">{error}</p>
          </div>
        )}

        {success && (
          <div className="p-5 bg-green-500/10 border border-green-500/20 rounded-3xl flex items-center gap-4 text-green-400">
            <CheckCircle2 className="w-6 h-6" />
            <p className="font-medium">Changes saved successfully!</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <section className="bg-surface/20 border border-white/5 rounded-[2.5rem] p-8 space-y-6 shadow-xl">
              <div className="flex items-center gap-3 mb-2">
                <Package className="w-5 h-5 text-gold" />
                <h3 className="text-lg font-bold">General Information</h3>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500 ml-1">Product Name</label>
                <input required name="name" value={formData.name} onChange={handleChange} className="w-full bg-dark/50 border border-white/10 rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/30 transition-all font-medium" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500 ml-1">Brand</label>
                <input required name="brand" value={formData.brand} onChange={handleChange} className="w-full bg-dark/50 border border-white/10 rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/30 transition-all font-medium" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500 ml-1">Description</label>
                <textarea required rows={5} name="description" value={formData.description} onChange={handleChange} className="w-full bg-dark/50 border border-white/10 rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/30 transition-all resize-none leading-relaxed font-light" />
              </div>
            </section>

            <section className="bg-surface/20 border border-white/5 rounded-[2.5rem] p-8 space-y-6 shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <ImageIcon className="w-5 h-5 text-gold" />
                  <h3 className="text-lg font-bold">Update Aesthetic</h3>
                </div>
                {imageFile && (
                  <button 
                    type="button"
                    onClick={() => { setImageFile(null); setImagePreview(formData.images[0] || null); }}
                    className="flex items-center gap-1 text-[10px] font-bold text-red-400 hover:text-red-300 transition-colors uppercase tracking-widest"
                  >
                    <X className="w-3 h-3" /> Revert to Original
                  </button>
                )}
              </div>
              <div onClick={() => fileInputRef.current?.click()} className={`relative border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center gap-4 transition-all cursor-pointer group ${imageFile ? 'border-gold bg-gold/5' : imagePreview ? 'border-gold/30 bg-gold/5' : 'border-white/10 bg-white/5 hover:border-gold/30'}`}>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                {imagePreview ? (
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <Upload className="w-10 h-10 text-white" />
                    </div>
                  </div>
                ) : (
                  <Upload className="w-10 h-10 text-gray-400 group-hover:text-gold" />
                )}
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <section className="bg-surface/20 border border-white/5 rounded-[2.5rem] p-8 space-y-6 shadow-xl">
              <div className="flex items-center gap-3 mb-2">
                <DollarSign className="w-5 h-5 text-gold" />
                <h3 className="text-lg font-bold">Pricing Architecture</h3>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500 ml-1">Retail Price (PKR)</label>
                <input required type="number" name="price" value={formData.price} onChange={handleChange} className="w-full bg-dark/50 border border-white/10 rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/30 transition-all font-bold" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500 ml-1">Exhibition Price (PKR)</label>
                <input type="number" name="discountPrice" value={formData.discountPrice} onChange={handleChange} className="w-full bg-dark/50 border border-white/10 rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/30 transition-all font-bold" />
              </div>
            </section>

            <section className="bg-surface/20 border border-white/5 rounded-[2.5rem] p-8 space-y-6 shadow-xl">
              <div className="flex items-center gap-3 mb-2">
                <Layers className="w-5 h-5 text-gold" />
                <h3 className="text-lg font-bold">Structural Classification</h3>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500 ml-1">Category</label>
                <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-dark/50 border border-white/10 rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/30 transition-all appearance-none font-bold">
                  {dbCategories.map(cat => (
                    <option key={cat._id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="flex items-center gap-3">
                  <Tag className="w-4 h-4 text-gold" />
                  <span className="text-sm font-medium text-white">Feature on Homepage</span>
                </div>
                <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} className="w-5 h-5 rounded border-white/10 bg-dark text-gold focus:ring-gold accent-gold" />
              </div>
            </section>

            <button
              type="submit"
              disabled={isSaving || success}
              className="w-full group bg-gold text-dark font-black rounded-[2rem] py-6 flex items-center justify-center gap-3 hover:bg-yellow-500 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-gold/20 disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>{isUploading ? "PROCESS MEDIA..." : "COMMITTING CHANGES..."}</span>
                </>
              ) : success ? (
                <CheckCircle2 className="w-6 h-6" />
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  UPDATE CATALOG RECORD
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
