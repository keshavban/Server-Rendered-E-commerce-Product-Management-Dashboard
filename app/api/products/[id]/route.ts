import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

/* =========================
   GET single product
   ========================= */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await connectDB();

  const product = await Product.findById(id);

  if (!product) {
    return NextResponse.json(
      { error: "Product not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(product);
}

/* =========================
   UPDATE product
   ========================= */
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await connectDB();
  const body = await req.json();

  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    {
      name: body.name,
      description: body.description,
      price: body.price,
      stock: body.stock,
      imageUrl: body.imageUrl,
      category: body.category,
    },
    { new: true, runValidators: true }
  );

  if (!updatedProduct) {
    return NextResponse.json(
      { error: "Product not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(updatedProduct);
}

/* =========================
   DELETE product
   ========================= */
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await connectDB();
  await Product.findByIdAndDelete(id);

  return NextResponse.json({ success: true });
}
