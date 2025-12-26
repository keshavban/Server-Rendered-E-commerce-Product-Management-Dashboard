import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";
import AdminModel from "@/models/Admin";
import type { Admin } from "@/types/admin";

export default async function AdminsPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "SUPER_ADMIN") {
    redirect("/products");
  }

  await connectDB();
  const admins = await AdminModel.find().lean();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admins</h1>
        <a
          href="/admins/new"
          className="bg-black text-white px-4 py-2 rounded"
        >
          + Add Admin
        </a>
      </div>

      <div className="bg-white rounded-xl shadow divide-y">
        {admins.map((admin: Admin) => (
  <div
    key={admin._id}
    className="p-4 flex justify-between items-center"
  >
    <div>
      <span className="block font-medium">{admin.email}</span>
      <span className="text-sm text-gray-500">{admin.role}</span>
    </div>

    {admin.role !== "SUPER_ADMIN" && (
      <form
        action={`/api/admins/${admin._id}`}
        method="POST"
        onSubmit={(e) => {
          if (!confirm("Delete this admin?")) {
            e.preventDefault();
          }
        }}
      >
        <input type="hidden" name="_method" value="DELETE" />
        <button className="text-red-600 hover:underline">
          Delete
        </button>
      </form>
    )}
  </div>
))}

      </div>
    </div>
  );
}
