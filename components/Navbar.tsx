"use client";

import { signOut } from "next-auth/react";

export default function Topbar() {
  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-[var(--border)] bg-[var(--panel)]">
      <h1 className="text-lg font-semibold">
        Admin Panel
      </h1>

      <div className="flex items-center gap-4">
        <span className="text-sm text-[var(--muted)]">Admin</span>
        <button
          onClick={() => signOut()}
          className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white text-sm"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
