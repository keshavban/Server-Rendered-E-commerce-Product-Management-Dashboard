// app/(protected)/admins/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";
import AdminModel from "@/models/Admin";
import type { Admin } from "@/types/admin";
import { UserCog } from "lucide-react";
import AdminRow from "@/components/AdminRow";

export default async function AdminsPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  const isSuperAdmin = session.user.role === "SUPER_ADMIN";

  await connectDB();

  // ✅ IMPORTANT FIX
  const admins = JSON.parse(
    JSON.stringify(await AdminModel.find().lean())
  ) as Admin[];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Admin Management</h1>
          <p className="text-slate-400 mt-1">Manage access and roles</p>
        </div>

        {isSuperAdmin && (
          <a
  href="/admins/new"
  style={{
    background: "#4f46e5",
    color: "white",
    padding: "10px 16px",
    borderRadius: "8px",
    fontWeight: "bold",
    textDecoration: "none",
  }}
>
  + Add Admin
</a>
        )}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left">
          <thead className="bg-slate-950/50 text-slate-400 uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800">
            {admins.map((admin) => (
              <AdminRow
                key={admin._id}
                admin={admin}
                isSuperAdmin={isSuperAdmin}
              />
            ))}
          </tbody>
        </table>

        {admins.length === 0 && (
          <div className="p-8 text-center text-slate-500">
            No admins found.
          </div>
        )}
      </div>
    </div>
  );
}
