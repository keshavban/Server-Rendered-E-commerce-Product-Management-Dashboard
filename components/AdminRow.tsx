"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Admin } from "@/types/admin";

type AdminRowProps = {
  admin: Admin;
  isSuperAdmin: boolean; // ✅ ADD THIS
};

export default function AdminRow({
  admin,
  isSuperAdmin,
}: AdminRowProps) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this admin?")) return;

    const res = await fetch(`/api/admins/${admin._id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const data = await res.json();
      alert(data.error || "Not allowed");
      return;
    }

    router.refresh();
  }

  return (
    <tr className="hover:bg-slate-800/40 transition">
      <td className="px-6 py-4 text-white">{admin.email}</td>
      <td className="px-6 py-4 text-slate-300">{admin.role}</td>

      <td className="px-6 py-4 text-right">
        {/* ✅ ONLY SUPER ADMIN SEES DELETE */}
        {isSuperAdmin && (
          <button
            onClick={handleDelete}
            style={{
      padding: "6px 14px",
      fontSize: "14px",
      color: "#ffffff",
      background: "#dc2626",
      borderRadius: "6px",
      border: "none",
      cursor: "pointer",
    }}
          >
            <Trash2 size={18} />
          </button>
        )}
      </td>
    </tr>
  );
}
