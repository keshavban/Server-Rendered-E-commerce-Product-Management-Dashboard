// app/(protected)/admins/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";
import AdminModel from "@/models/Admin";
import type { Admin } from "@/types/admin";
import { Trash2, UserCog, ShieldAlert } from "lucide-react";

export default async function AdminsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // 🚨 RESTRICTION REMOVED FOR YOU (Uncomment to enable again)
  // if (session.user.role !== "SUPER_ADMIN") {
  //   redirect("/products");
  // }

  await connectDB();
  const admins = await AdminModel.find().lean();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Admin Management</h1>
          <p className="text-slate-400 mt-1">Manage access and roles</p>
        </div>
        <a
          href="/admins/new"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-indigo-600/20 flex items-center gap-2"
        >
          <UserCog size={18} />
          Add Admin
        </a>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-950/50 text-slate-400 uppercase text-xs font-semibold tracking-wider">
              <tr>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {admins.map((admin: Admin) => (
                <tr key={admin._id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 text-white font-medium">
                    {admin.email}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                        admin.role === "SUPER_ADMIN"
                          ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                          : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      }`}
                    >
                      {admin.role === "SUPER_ADMIN" && <ShieldAlert size={12} />}
                      {admin.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {admin.role !== "SUPER_ADMIN" && (
                      <form
                        action={`/api/admins/${admin._id}`}
                        method="POST"
                        className="inline-block"
                        onSubmit={(e) => {
                          // Note: In a real React component you'd handle this better, 
                          // but this works for server-rendered forms
                        }}
                      >
                         {/* Hidden input to simulate DELETE method for the API */}
                         <input type="hidden" name="_method" value="DELETE" /> 
                         {/* Note: Your API must handle this _method check or just accept POST */}
                        <button
                          type="submit"
                          className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                          title="Delete Admin"
                        >
                          <Trash2 size={18} />
                        </button>
                      </form>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {admins.length === 0 && (
          <div className="p-8 text-center text-slate-500">
            No admins found.
          </div>
        )}
      </div>
    </div>
  );
}