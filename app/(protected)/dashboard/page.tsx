"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

/* ================= TYPES ================= */

type DashboardData = {
  totalProducts: number;
  totalStock: number;
  inventoryByCategory: Record<string, number>;
  monthlySales: Record<string, number>;
  salesByProduct: Record<string, number>;
  stockByProduct: Record<string, number>;
};

/* ================= COLORS ================= */

const COLORS = ["#38bdf8", "#22c55e", "#f97316", "#a855f7", "#ef4444"];

/* ================= PAGE ================= */

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    fetch("/api/dashboard", { cache: "no-store" })
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) return <p>Loading dashboard...</p>;

  /* ================= TRANSFORMS ================= */

  const inventoryByCategoryData = Object.entries(
    data.inventoryByCategory
  ).map(([name, value]) => ({ name, value }));

  const monthlySalesData = Object.entries(data.monthlySales).map(
    ([month, amount]) => ({ month, amount })
  );

  const salesByProductData = Object.entries(data.salesByProduct).map(
    ([name, sales]) => ({ name, sales })
  );

  const stockByProductData = Object.entries(data.stockByProduct).map(
    ([name, stock]) => ({ name, stock })
  );

  return (
    <div className="space-y-8">
      {/* ================= HEADER ================= */}
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* ================= SUMMARY CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800 p-6 rounded-xl shadow">
          <p className="text-gray-400">Total Products</p>
          <p className="text-3xl font-bold">{data.totalProducts}</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl shadow">
          <p className="text-gray-400">Total Stock</p>
          <p className="text-3xl font-bold">{data.totalStock}</p>
        </div>
      </div>

      {/* ================= CHARTS GRID ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Inventory by Category */}
        <div className="bg-slate-800 p-6 rounded-xl">
          <h2 className="font-semibold mb-4">Inventory by Category</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={inventoryByCategoryData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
              >
                {inventoryByCategoryData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Sales */}
        <div className="bg-slate-800 p-6 rounded-xl">
          <h2 className="font-semibold mb-4">Monthly Sales</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlySalesData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#38bdf8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Sales by Product */}
        <div className="bg-slate-800 p-6 rounded-xl">
          <h2 className="font-semibold mb-4">Sales by Product</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={salesByProductData}>
              <XAxis dataKey="name" hide />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Stock by Product */}
        <div className="bg-slate-800 p-6 rounded-xl">
          <h2 className="font-semibold mb-4">Stock by Product</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={stockByProductData}>
              <XAxis dataKey="name" hide />
              <YAxis />
              <Tooltip />
              <Bar dataKey="stock" fill="#f97316" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
