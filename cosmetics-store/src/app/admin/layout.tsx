"use client";

import { useAuth } from "@/features/auth/hooks/use-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  ShieldCheck, 
  LayoutDashboard, 
  Package, 
  Users, 
  Settings, 
  LogOut,
  ChevronRight
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
    { name: "Products", icon: Package, href: "/admin/products" },
    { name: "Customers", icon: Users, href: "#" },
    { name: "Settings", icon: Settings, href: "#" },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-dark text-white flex">
      {/* Sidebar */}
      <aside className="w-72 border-r border-white/5 bg-surface/20 backdrop-blur-3xl flex flex-col sticky top-0 h-screen z-50">
        <div className="px-8 py-10 flex items-center gap-3 font-bold text-xl tracking-tighter text-white">
          <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center shadow-lg shadow-gold/20">
            <ShieldCheck className="w-6 h-6 text-dark" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold leading-none">STARS</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-gold mt-1">Admin Panel</span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto pt-4">
          <p className="px-4 text-[10px] uppercase font-bold tracking-[0.2em] text-gray-500 mb-4 ml-1">Menu</p>
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 ${
                  active
                    ? "bg-gold text-dark font-bold shadow-xl shadow-gold/10 translate-x-1"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <item.icon className={`w-5 h-5 transition-transform duration-300 ${active ? "" : "group-hover:scale-110"}`} />
                  <span className="text-sm tracking-tight">{item.name}</span>
                </div>
                {active && <ChevronRight className="w-4 h-4" />}
              </Link>
            );
          })}
        </nav>

        {/* User Profile Area */}
        <div className="p-6 border-t border-white/5 space-y-4">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-full bg-surface border border-white/10 flex items-center justify-center text-gold font-bold">
              {user?.name?.[0].toUpperCase()}
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-bold text-white leading-none">{user?.name}</p>
              <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider">Super Admin</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3.5 text-red-400 hover:bg-red-400/10 rounded-2xl transition-all duration-300 text-sm font-medium"
          >
            <LogOut className="w-5 h-5" />
            Logout Session
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-h-screen relative">
        {/* Top bar shadow/gradient */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-gold/5 to-transparent pointer-events-none" />
        
        <div className="relative z-10 w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
