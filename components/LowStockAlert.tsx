import type { LowStockProduct } from "@/types/analytics";

export default function LowStockAlert({
  products,
}: {
  products: LowStockProduct[];
}) {
  if (products.length === 0) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-6">
      <h2 className="text-red-700 font-semibold mb-3">
        ⚠️ Low Stock Alerts
      </h2>
      <ul className="space-y-2">
        {products.map((p) => (
          <li key={p._id} className="flex justify-between">
            <span>{p.name}</span>
            <span className="font-semibold text-red-600">
              {p.stock} left
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}