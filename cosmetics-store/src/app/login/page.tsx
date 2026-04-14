"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/use-auth";
import Link from "next/link";
import { ArrowRight, Loader2, Sparkles } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      login(data.accessToken, data.user);
      
      // Redirect based on role
      if (data.user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      {/* Background ambient glow */}
      <div className="fixed inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <div className="w-[40rem] h-[40rem] bg-gold/10 rounded-full blur-[100px] absolute mix-blend-screen" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 text-center space-y-2 translate-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center justify-center p-3 bg-surface/50 rounded-2xl mb-4 border border-white/5 backdrop-blur-xl">
            <Sparkles className="w-6 h-6 text-gold" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-400">
            Sign in to your STARS COLLECTION account
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-surface/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl relative overflow-hidden transition-all duration-500 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150"
        >
          <div className="space-y-5">
            {error && (
              <div className="p-3 text-sm text-red-300 bg-red-950/50 border border-red-500/20 rounded-xl">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider ml-1">
                Email
              </label>
              <input
                type="email"
                required
                className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/30 transition-all"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider ml-1">
                Password
              </label>
              <input
                type="password"
                required
                className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/30 transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full group mt-6 bg-gold text-dark font-bold rounded-xl px-4 py-3.5 flex items-center justify-center gap-2 hover:bg-yellow-500 focus:bg-yellow-400 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:hover:scale-100 cursor-pointer"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Sign In"
              )}
              {!isLoading && (
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              )}
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-gray-400 animate-in fade-in duration-700 delay-300">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-gold hover:text-yellow-400 font-medium transition-colors cursor-pointer"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
