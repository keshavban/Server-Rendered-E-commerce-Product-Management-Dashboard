// app/api/products/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import {
  productSchema,
  productUpdateWithIdSchema,
} from "@/lib/validators/product";

export async function GET() {
  await connectDB();
  const products = await Product.find().sort({ createdAt: -1 });
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const body = await req.json();
  await connectDB();

  const product = await Product.create({
    ...body,
    sales: [], // ensure exists
  });

  return NextResponse.json(product, { status: 201 });
}

export async function PUT(req: Request) {
  const body = await req.json();
  const { id, ...updates } = body;

  await connectDB();
  const updated = await Product.findByIdAndUpdate(id, updates, {
    new: true,
  });

  return NextResponse.json(updated);
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Product ID required" },
      { status: 400 }
    );
  }

  await connectDB();
  await Product.findByIdAndDelete(id);

  return NextResponse.json({ success: true });
}
