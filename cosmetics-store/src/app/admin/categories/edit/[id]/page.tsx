"use client";

import { useState, useEffect, useRef, use } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/use-auth";
import Link from "next/link";
import { 
  ArrowLeft, 
  Sparkles, 
  LayoutGrid, 
  Image as ImageIcon, 
  Loader2,
  AlertCircle,
  CheckCircle2,
  Upload,
  X,
  Save
} from "lucide-react";

export default function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
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
    description: "",
    featured: false,
    image: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategory() {
      try {
        const res = await fetch(`/api/categories/${id}`);
        if (!res.ok) throw new Error("Category not found");
        const data = await res.json();
        setFormData({
          name: data.name,
          description: data.description,
          featured: data.featured || false,
          image: data.image,
        });
        setImagePreview(data.image);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCategory();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) return setError("Image size must be less than 5MB");
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
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
        body: data 
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
    setIsSaving(true); setError(null);

    try {
      let finalImageUrl = formData.image;

      if (imageFile) {
        setIsUploading(true);
        finalImageUrl = await uploadImage(imageFile);
        setIsUploading(false);
      }

      const performUpdate = async (token: string | null) => {
        return fetch(`/api/categories/${id}`, {
          method: "PUT",
          headers: { 
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${token}` 
          },
          body: JSON.stringify({ ...formData, image: finalImageUrl }),
        });
      };

      let res = await performUpdate(accessToken);
      if (res.status === 401) {
        const newToken = await refreshAccessToken();
        if (newToken) res = await performUpdate(newToken);
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update category");

      setSuccess(true);
      setTimeout(() => router.push("/admin/categories"), 1500);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSaving(false); setIsUploading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-gold animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-12 max-w-4xl mx-auto space-y-12">
      <header className="space-y-4">
        <Link href="/admin/categories" className="flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-widest hover:opacity-80">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Framework
        </Link>
        <div className="flex items-center gap-3">
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight heading-luxury">Edit Category Node</h1>
          <Sparkles className="w-8 h-8 text-gold" />
        </div>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        {error && (
          <div className="p-5 bg-red-500/10 border border-red-500/20 rounded-3xl flex items-center gap-4 text-red-400">
            <AlertCircle className="w-6 h-6" /> <p className="font-medium">{error}</p>
          </div>
        )}
        {success && (
          <div className="p-5 bg-green-500/10 border border-green-500/20 rounded-3xl flex items-center gap-4 text-green-400">
            <CheckCircle2 className="w-6 h-6" /> <p className="font-medium">Category updated successfully!</p>
          </div>
        )}

        <div className="space-y-8">
          <section className="bg-surface/20 border border-white/5 rounded-[2.5rem] p-8 space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <LayoutGrid className="w-5 h-5 text-gold" />
              <h3 className="text-lg font-bold">Category Nomenclature</h3>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500 ml-1">Title</label>
              <input name="name" value={formData.name} onChange={handleChange} className="w-full bg-dark/50 border border-white/10 rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:border-gold/30" />
            </div>
            {/* Removed Description and Featured Toggle per user request */}

            {/* Removed Featured Toggle per user request */}
          </section>

          {/* Hero Aesthetics Section removed per user request */}

          <button type="submit" disabled={isSaving || success} className="w-full bg-gold text-dark font-black rounded-[2rem] py-5 flex items-center justify-center gap-3 hover:bg-yellow-500 transition-all hover:-translate-y-1 cursor-pointer disabled:opacity-50">
            {isSaving ? <Loader2 className="w-6 h-6 animate-spin" /> : <Save className="w-5 h-5" />}
            {isSaving ? (isUploading ? "UPLOADING NEW AESTHETIC..." : "UPDATING...") : "SAVE CHANGES"}
          </button>
        </div>
      </form>
    </div>
  );
}
