import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";
import {Product} from "@/models/Product";
import StockChart from "@/components/StockChart";
import CategoryStockChart from "@/components/CategoryStockChart";
import LowStockAlert from "@/components/LowStockAlert";
const stockByCategory = await Product.aggregate([
  {
    $group: {
      _id: "$category",
      totalStock: { $sum: "$stock" },
    },
  },
  {
    $sort: { totalStock: -1 },
  },
]);

const valueByCategory = await Product.aggregate([
  {
    $group: {
      _id: "$category",
      totalValue: {
        $sum: { $multiply: ["$price", "$stock"] },
      },
    },
  },
  {
    $sort: { totalValue: -1 },
  },
]);
const lowStockProducts = await Product.find({
  stock: { $lte: 5 },
})
  .select("name stock")
  .lean();



export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

await connectDB();

const products = await Product.find().lean();

const stockByCategory = await Product.aggregate([
  {
    $group: {
      _id: "$category",
      totalStock: { $sum: "$stock" },
    },
  },
  {
    $sort: { totalStock: -1 },
  },
]);

const lowStockProducts = await Product.find({
  stock: { $lte: 5 },
})
  .select("name stock")
  .lean();

const totalProducts = products.length;

const totalStock = products.reduce(
  (sum, p) => sum + p.stock,
  0
);

const inventoryValue = products.reduce(
  (sum, p) => sum + p.price * p.stock,
  0
);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Products" value={totalProducts} />
        <StatCard title="Total Stock" value={totalStock} />
        <StatCard
          title="Inventory Value"
          value={`₹${inventoryValue}`}
        />
      </div>
      <StockChart
  data={products.map((p) => ({
    name: p.name,
    stock: p.stock,
  }))}
/>

    </div>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}
