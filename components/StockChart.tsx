"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function StockChart({
  data,
}: {
  data: { name: string; stock: number }[];
}) {
  return (
    <div className="bg-white rounded-xl shadow p-6 h-80">
      <h2 className="text-lg font-semibold mb-4">
        Stock by Product
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="stock" fill="#000" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
