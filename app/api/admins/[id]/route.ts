import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import AdminModel from "@/models/Admin";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (session.user.role !== "SUPER_ADMIN") {
    return NextResponse.json(
      { error: "Forbidden: Super Admin only" },
      { status: 403 }
    );
  }

  const { id } = await params;

  await connectDB();

  const targetAdmin = await AdminModel.findById(id);

  if (!targetAdmin) {
    return NextResponse.json({ error: "Admin not found" }, { status: 404 });
  }

  // ❌ Prevent deleting yourself
  if (session.user.email === targetAdmin.email) {
    return NextResponse.json(
      { error: "You cannot delete your own account" },
      { status: 400 }
    );
  }

  // ❌ Prevent deleting last super admin
  if (targetAdmin.role === "SUPER_ADMIN") {
    const superAdminCount = await AdminModel.countDocuments({
      role: "SUPER_ADMIN",
    });

    if (superAdminCount === 1) {
      return NextResponse.json(
        { error: "Cannot delete the last Super Admin" },
        { status: 400 }
      );
    }
  }

  await AdminModel.findByIdAndDelete(id);

  return NextResponse.json({ success: true });
}
