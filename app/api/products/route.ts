import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import  Product  from "@/models/Product";

/* =========================
   GET → Fetch all products
   ========================= */
export async function GET() {
 // const session = await getServerSession(authOptions);

  //if (!session) {
 //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  //}

  await connectDB();

  const products = await Product.find().sort({ createdAt: -1 });

  return NextResponse.json(products);
}

/* =========================
   POST → Create product
   ========================= */
export async function POST(req: Request) {
//  const session = await getServerSession(authOptions);

//  if (!session) {
//    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  const body = await req.json();
  const { name, description, price, stock, imageUrl } = body;

  if (!name || !description || price == null || stock == null) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  await connectDB();

  const product = await Product.create({
    name,
    description,
    price,
    stock,
    imageUrl,
  });

  return NextResponse.json(product, { status: 201 });
}

/* =========================
   PUT → Update product
   ========================= */
export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { id, ...updates } = body;

  if (!id) {
    return NextResponse.json(
      { error: "Product ID required" },
      { status: 400 }
    );
  }

  await connectDB();

  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    updates,
    { new: true }
  );

  return NextResponse.json(updatedProduct);
}

/* =========================
   DELETE → Delete product
   ========================= */
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
