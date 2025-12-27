import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

/* ================= TYPES ================= */

type Sale = {
  units: number;
  totalAmount: number;
  month: string; // e.g. "2025-01"
};

type ProductDoc = {
  name: string;
  category: string;
  stock: number;
  sales?: Sale[];
};

/* ================= GET DASHBOARD ================= */

export async function GET() {
  await connectDB();

  const products: ProductDoc[] = await Product.find().lean();

  const inventoryByCategory: Record<string, number> = {};
  const monthlySales: Record<string, number> = {};
  const salesByProduct: Record<string, number> = {};
  const stockByProduct: Record<string, number> = {};

  let totalStock = 0;

  for (const p of products) {
    /* ---------- inventory by category ---------- */
    inventoryByCategory[p.category] =
      (inventoryByCategory[p.category] ?? 0) + p.stock;

    /* ---------- stock by product ---------- */
    stockByProduct[p.name] = p.stock;
    totalStock += p.stock;

    /* ---------- sales ---------- */
    const sales: Sale[] = Array.isArray(p.sales) ? p.sales : [];

    let unitsSold = 0;

    for (const s of sales) {
      unitsSold += s.units;

      monthlySales[s.month] =
        (monthlySales[s.month] ?? 0) + s.totalAmount;
    }

    salesByProduct[p.name] = unitsSold;
  }

  return NextResponse.json({
    totalProducts: products.length,
    totalStock,
    inventoryByCategory,
    monthlySales,
    salesByProduct,
    stockByProduct,
  });
}
