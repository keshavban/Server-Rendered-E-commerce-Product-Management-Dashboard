// app/api/products/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

export async function GET() {
  await connectDB();
  const products = await Product.find().sort({ createdAt: -1 });
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await connectDB();

    // Check if category exists before creating
    if (!body.category) {
      return NextResponse.json(
        { error: "Category is required" }, 
        { status: 400 }
      );
    }

    const product = await Product.create({
      ...body,
      sales: [],
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Create Product Error:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}

// ... keep PUT and DELETE as they are
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