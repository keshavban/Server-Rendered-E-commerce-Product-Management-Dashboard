// components/Navbar.tsx
"use client";

import { signOut } from "next-auth/react";

export default function Topbar() {
  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-[var(--border)] bg-[var(--panel)]">
      <h1 className="text-lg font-semibold text-indigo-400">
        Admin Portal
      </h1>

      <div className="flex items-center gap-4">
        <span className="text-sm text-[var(--muted)]">Admin</span>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })} // Fix here
          className="px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 text-sm font-medium transition-colors"
        >
          Logout
        </button>
      </div>
    </header>
  );
}