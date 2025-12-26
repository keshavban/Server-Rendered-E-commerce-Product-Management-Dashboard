import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectDB } from "@/lib/db";
import Admin from "@/models/Admin";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { email, password } = await req.json();

  const hashed = await bcrypt.hash(password, 10);

  await connectDB();
  await Admin.create({
    email,
    password: hashed,
    role: "ADMIN",
  });

  return NextResponse.json({ success: true });
}
