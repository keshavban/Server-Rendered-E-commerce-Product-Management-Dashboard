// app/api/products/[id]/sell/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import Sale from "@/models/Sale"; // 1. Import Sale model

type SaleType = {
  month: string;
  units: number;
  totalAmount: number;
};

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const { quantity, buyerName } = await req.json();

    if (!quantity || quantity <= 0) {
      return NextResponse.json({ error: "Invalid quantity" }, { status: 400 });
    }

    await connectDB();

    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (product.stock < quantity) {
      return NextResponse.json({ error: "Not enough stock" }, { status: 400 });
    }

    // 2. Calculate Total Amount
    const totalAmount = quantity * product.price;

    // 3. Update Stock
    product.stock -= quantity;

    // 4. FIX: If this is an old product with no category, give it a default one
    // This prevents the "ValidatorError: Path `category` is required" crash
    if (!product.category) {
      product.category = "General"; 
    }

    // 5. Update Internal Sales History
    const month = new Date().toISOString().slice(0, 7);
    const sales: SaleType[] = Array.isArray(product.sales) ? product.sales : [];
    const existing = sales.find((s) => s.month === month);

    if (existing) {
      existing.units += quantity;
      existing.totalAmount += totalAmount;
    } else {
      sales.push({
        month,
        units: quantity,
        totalAmount: totalAmount,
      });
    }

    product.sales = sales;
    await product.save(); // This saves the stock update + history

    // 6. FIX: Create the separate Sale Record in MongoDB
    // This ensures your "Sales" collection gets populated
    await Sale.create({
      productId: product._id,
      productName: product.name,
      quantity: quantity,
      totalPrice: totalAmount,
      buyerName: buyerName || "Walk-in Customer",
      date: new Date(),
    });

    // 7. FIX: Return the data your SellButton expects
    return NextResponse.json({ 
      success: true, 
      sold: quantity, 
      totalAmount: totalAmount 
    });

  } catch (error: unknown) {
    console.error("Sell Error:", error);
    
    let errorMessage = "Internal Server Error";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}