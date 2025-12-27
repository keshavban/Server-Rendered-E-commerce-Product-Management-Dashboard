import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

type Sale = {
  month: string;
  units: number;
  totalAmount: number;
};

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // ✅ REQUIRED FIX

  const { quantity } = await req.json();

  if (!quantity || quantity <= 0) {
    return NextResponse.json({ error: "Invalid quantity" }, { status: 400 });
  }

  await connectDB();

  const product = await Product.findById(id);
  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (product.stock < quantity) {
    return NextResponse.json(
      { error: "Not enough stock" },
      { status: 400 }
    );
  }

  // update stock
  product.stock -= quantity;

  // update sales
  const month = new Date().toISOString().slice(0, 7);

  const sales: Sale[] = Array.isArray(product.sales)
    ? product.sales
    : [];

  const existing = sales.find((s) => s.month === month);

  if (existing) {
    existing.units += quantity;
    existing.totalAmount += quantity * product.price;
  } else {
    sales.push({
      month,
      units: quantity,
      totalAmount: quantity * product.price,
    });
  }

  product.sales = sales;
  await product.save();

  return NextResponse.json({ success: true });
}
