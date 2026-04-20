"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { 
  Settings as SettingsIcon, 
  Save, 
  Store, 
  Phone, 
  MapPin, 
  MessageSquare,
  Sparkles,
  Loader2,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export default function AdminSettingsPage() {
  const { accessToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [formData, setFormData] = useState({
    storeName: "",
    slogan: "",
    whatsappNumber: "",
    supportEmail: "",
    address: "",
    instagramUrl: "",
    tiktokUrl: "",
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/settings");
      const data = await res.json();
      if (res.ok) {
        setFormData({
          storeName: data.storeName || "",
          slogan: data.slogan || "",
          whatsappNumber: data.whatsappNumber || "",
          supportEmail: data.supportEmail || "",
          address: data.address || "",
          instagramUrl: data.instagramUrl || "",
          tiktokUrl: data.tiktokUrl || "",
        });
      }
    } catch (error) {
      console.error("Failed to load settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage({ type: "success", text: "Settings updated successfully!" });
      } else {
        throw new Error("Failed to update settings");
      }
    } catch (error: any) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setIsSaving(false);
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
    <div className="p-6 lg:p-12 max-w-6xl mx-auto space-y-12">
      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">Global Settings</h1>
          <SettingsIcon className="w-8 h-8 text-gold" />
        </div>
        <p className="text-gray-400 font-light text-lg">Centralize your business identity and contact channels.</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        {message && (
          <div className={`p-5 rounded-3xl flex items-center gap-4 animate-in fade-in slide-in-from-top-4 ${
            message.type === "success" ? "bg-green-500/10 border border-green-500/20 text-green-400" : "bg-red-500/10 border border-red-500/20 text-red-400"
          }`}>
            {message.type === "success" ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
            <p className="font-medium">{message.text}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Branding Section */}
          <section className="bg-surface/20 border border-white/5 rounded-[2.5rem] p-8 space-y-8">
            <div className="flex items-center gap-3 mb-2">
              <Store className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-bold">Store Branding</h3>
            </div>

            <div className="space-y-6">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500 ml-1">Store Name</label>
                <input
                  name="storeName"
                  value={formData.storeName}
                  onChange={handleChange}
                  className="w-full bg-dark/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/30 transition-all font-bold text-lg"
                  placeholder="STARS COLLECTION"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500 ml-1">Slogan / Footer Description</label>
                <textarea
                  name="slogan"
                  value={formData.slogan}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-dark/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/30 transition-all resize-none leading-relaxed"
                  placeholder="Experience excellence in every purchase."
                />
              </div>
            </div>
          </section>

          {/* Contact Hub */}
          <section className="bg-surface/20 border border-white/5 rounded-[2.5rem] p-8 space-y-8">
            <div className="flex items-center gap-3 mb-2">
              <MessageSquare className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-bold">Contact Hub</h3>
            </div>

            <div className="space-y-6">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500 ml-1">WhatsApp Number (e.g. 92314...)</label>
                <input
                  name="whatsappNumber"
                  value={formData.whatsappNumber}
                  onChange={handleChange}
                  className="w-full bg-dark/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/30 transition-all"
                  placeholder="923149328645"
                />
                <p className="text-[10px] text-gray-500 italic mt-2 ml-1">Include country code without '+'.</p>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500 ml-1">Physical Address</label>
                <input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full bg-dark/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/30 transition-all"
                  placeholder="Shop #, Market, City"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500 ml-1">Instagram URL</label>
                  <input
                    name="instagramUrl"
                    value={formData.instagramUrl}
                    onChange={handleChange}
                    className="w-full bg-dark/50 border border-white/10 rounded-2xl px-5 py-3 text-sm text-white focus:outline-none transition-all"
                    placeholder="https://..."
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500 ml-1">TikTok URL</label>
                  <input
                    name="tiktokUrl"
                    value={formData.tiktokUrl}
                    onChange={handleChange}
                    className="w-full bg-dark/50 border border-white/10 rounded-2xl px-5 py-3 text-sm text-white focus:outline-none transition-all"
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSaving}
            className="group px-12 py-5 bg-gold text-dark font-black rounded-3xl flex items-center gap-3 hover:bg-yellow-500 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-gold/20 disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="w-6 h-6 animate-spin" /> : <Save className="w-5 h-5" />}
            {isSaving ? "SAVING CONFIGURATION..." : "SAVE SETTINGS"}
          </button>
        </div>
      </form>

      {/* Preview Section */}
      <section className="bg-surface/10 border border-white/5 rounded-[3rem] p-10 space-y-6 text-center">
        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-2">
          <Sparkles className="w-6 h-6 text-gold" />
        </div>
        <h4 className="text-2xl font-bold">Dynamic Branding Active</h4>
        <p className="text-gray-400 max-w-2xl mx-auto">
          These settings are synced globally. Your WhatsApp number, location, and brand name will update across the entire showcase instantly upon saving.
        </p>
      </section>
    </div>
  );
}
