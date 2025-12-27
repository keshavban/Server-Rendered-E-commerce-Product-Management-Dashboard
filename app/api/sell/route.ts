import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

export async function POST(req: Request) {
  const { productId, quantity } = await req.json();

  await connectDB();

  const product = await Product.findById(productId);
  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (product.stock < quantity) {
    return NextResponse.json({ error: "Insufficient stock" }, { status: 400 });
  }

  const month = new Date().toISOString().slice(0, 7);
  const totalAmount = product.price * quantity;

  product.stock -= quantity;
  product.sales.push({ quantity, totalAmount, month });

  await product.save();

  return NextResponse.json({ success: true, totalAmount });
}
