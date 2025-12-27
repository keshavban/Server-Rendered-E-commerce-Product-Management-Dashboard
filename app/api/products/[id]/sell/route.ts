import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

/* ================= TYPES ================= */

type Sale = {
  month: string;
  units: number;
  totalAmount: number;
};

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const quantity: number = body.quantity;

  if (!quantity || quantity <= 0) {
    return NextResponse.json({ error: "Invalid quantity" }, { status: 400 });
  }

  await connectDB();

  const product = await Product.findById(params.id);
  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (product.stock < quantity) {
    return NextResponse.json(
      { error: "Not enough stock" },
      { status: 400 }
    );
  }

  /* ---------- UPDATE STOCK ---------- */
  product.stock -= quantity;

  /* ---------- UPDATE SALES ---------- */
  const month = new Date().toISOString().slice(0, 7); // YYYY-MM

  const sales: Sale[] = Array.isArray(product.sales)
    ? product.sales
    : [];

  const existingSale = sales.find(
    (s: Sale) => s.month === month
  );

  if (existingSale) {
    existingSale.units += quantity;
    existingSale.totalAmount += quantity * product.price;
  } else {
    sales.push({
      month,
      units: quantity,
      totalAmount: quantity * product.price,
    });
  }

  product.sales = sales;

  await product.save();

  return NextResponse.json({
    success: true,
    remainingStock: product.stock,
  });
}
