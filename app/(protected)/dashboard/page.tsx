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
  CartesianGrid,
} from "recharts";

/* ================= STYLES ================= */

const statCard = (accent: string) => ({
  background: "linear-gradient(145deg, #0f172a, #020617)",
  borderRadius: "16px",
  padding: "20px",
  borderLeft: `5px solid ${accent}`,
  boxShadow: "0 20px 40px rgba(0,0,0,0.45)",
});

const statTitle = {
  fontSize: "14px",
  color: "#94a3b8",
  marginBottom: "6px",
};

const statValue = {
  fontSize: "32px",
  fontWeight: 800,
};

const panel =
  "bg-slate-900/80 backdrop-blur p-6 rounded-2xl shadow-2xl border border-slate-800";

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

  if (!data) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-slate-400">
        Loading dashboard…
      </div>
    );
  }

  /* ================= DATA TRANSFORMS ================= */

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

  const lowStockCount = stockByProductData.filter((p) => p.stock < 5).length;
  const categoryCount = inventoryByCategoryData.length;

  return (
    <div className="space-y-10">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight">Dashboard</h1>
        <p className="text-slate-400 mt-1">
          Inventory & sales overview
        </p>
      </div>

      {/* ================= STATS ================= */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "18px",
        }}
      >
        <div style={statCard("#3b82f6")}>
          <div style={statTitle}>Total Products</div>
          <div style={statValue}>{data.totalProducts}</div>
        </div>

        <div style={statCard("#10b981")}>
          <div style={statTitle}>Total Stock</div>
          <div style={statValue}>{data.totalStock}</div>
        </div>

        <div style={statCard("#f59e0b")}>
          <div style={statTitle}>Low Stock Items</div>
          <div style={statValue}>{lowStockCount}</div>
        </div>

        <div style={statCard("#ef4444")}>
          <div style={statTitle}>Categories</div>
          <div style={statValue}>{categoryCount}</div>
        </div>
      </div>

      {/* ================= CHARTS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Inventory by Category */}
        <div className={panel}>
          <h2 className="font-semibold mb-4">Inventory by Category</h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={inventoryByCategoryData}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                innerRadius={50}
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
        <div className={panel}>
          <h2 className="font-semibold mb-4">Monthly Sales</h2>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={monthlySalesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#38bdf8"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Sales by Product */}
        <div className={panel}>
          <h2 className="font-semibold mb-4">Sales by Product</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={salesByProductData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" hide />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="sales"
                fill="#22c55e"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Stock by Product */}
        <div className={panel}>
          <h2 className="font-semibold mb-4">Stock by Product</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={stockByProductData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" hide />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="stock"
                fill="#f97316"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ================= RECENT SALES ================= */}
      <div className={panel}>
        <h2 className="font-semibold mb-4">Recent Sales</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-400 border-b border-slate-800">
                <th className="py-3">Product</th>
                <th className="py-3">Units Sold</th>
              </tr>
            </thead>

            <tbody>
              {salesByProductData.map((item) => (
                <tr
                  key={item.name}
                  className="border-b border-slate-800 hover:bg-slate-800/50 transition"
                >
                  <td className="py-3 font-medium">{item.name}</td>
                  <td className="py-3 text-emerald-400 font-semibold">
                    {item.sales}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
