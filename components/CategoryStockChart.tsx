"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { CategoryStock }from "@/types/analytics";

export default function CategoryStockChart({
  data,
}: {
  data: CategoryStock[];
}) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Stock by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="totalStock" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
