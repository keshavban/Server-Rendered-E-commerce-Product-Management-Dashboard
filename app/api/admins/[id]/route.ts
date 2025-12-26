import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import AdminModel from "@/models/Admin";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  await connectDB();

  const targetAdmin = await AdminModel.findById(params.id);

  if (!targetAdmin) {
    return NextResponse.json({ error: "Admin not found" }, { status: 404 });
  }

  // ❌ Cannot delete yourself
  if (targetAdmin.email === session.user.email) {
    return NextResponse.json(
      { error: "You cannot delete yourself" },
      { status: 400 }
    );
  }

  // ❌ Cannot delete last SUPER_ADMIN
  if (targetAdmin.role === "SUPER_ADMIN") {
    const superAdminCount = await AdminModel.countDocuments({
      role: "SUPER_ADMIN",
    });

    if (superAdminCount <= 1) {
      return NextResponse.json(
        { error: "At least one SUPER_ADMIN required" },
        { status: 400 }
      );
    }
  }

  await AdminModel.findByIdAndDelete(params.id);

  return NextResponse.redirect(
    new URL("/admins", req.url)
  );
}
