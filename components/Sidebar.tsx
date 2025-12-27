"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  Settings, 
  LogOut, 
  Store,
  LucideIcon
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 min-h-screen bg-slate-950 border-r border-slate-800 flex flex-col shadow-2xl z-50">
      {/* 1. BRANDING / HEADER */}
      <div className="p-8 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Store className="text-white w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            <span className="text-indigo-500">General</span>
          </h1>
        </div>
        
      </div>

      {/* 2. NAVIGATION LINKS */}
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 mt-4">
          Menu
        </p>
        
        <SidebarLink 
          href="/dashboard" 
          label="Dashboard" 
          icon={LayoutDashboard} 
          isActive={pathname === "/dashboard"} 
        />
        <SidebarLink 
          href="/products" 
          label="Products" 
          icon={ShoppingBag} 
          isActive={pathname.startsWith("/products")} 
        />
        <SidebarLink 
          href="/admins" 
          label="Admins" 
          icon={Users} 
          isActive={pathname.startsWith("/admins")} 
        />

        
      </nav>

      {/* 3. USER PROFILE / FOOTER */}
      
    </aside>
  );
}

/* --- HELPER COMPONENT --- */
function SidebarLink({ 
  href, 
  label, 
  icon: Icon, 
  isActive 
}: { 
  href: string; 
  label: string; 
  icon: LucideIcon; 
  isActive: boolean 
}) {
  return (
    <Link
      href={href}
      className={`
        relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
        ${
          isActive
            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/20"
            : "text-slate-400 hover:bg-slate-900 hover:text-white"
        }
      `}
    >
      {/* Icon with slight animation on hover */}
      <Icon 
        size={20} 
        className={`${!isActive && "group-hover:text-indigo-400"} transition-colors`} 
      />
      
      <span className="font-medium">{label}</span>

      {/* Right Arrow indicator for active state */}
      {isActive && (
        <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full opacity-50" />
      )}
    </Link>
  );
}