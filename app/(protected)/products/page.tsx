"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SellButton } from "@/components/SellButton";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl?: string;
  category: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const filteredProducts = products.filter((p) => {
    const matchesName = p.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      category === "" || p.category === category;
    return matchesName && matchesCategory;
  });

  /* =========================
     FETCH PRODUCTS
  ========================= */
  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("/api/products", { cache: "no-store" });
      const data: Product[] = await res.json();
      setProducts(data);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  /* =========================
     DELETE PRODUCT
  ========================= */
  async function handleDelete(id: string) {
    if (!confirm("Delete this product?")) return;

    const res = await fetch(`/api/products?id=${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) {
      alert("Delete failed (unauthorized or server error)");
      return;
    }

    setProducts((prev) => prev.filter((p) => p._id !== id));
  }

  if (loading) return <p className="text-gray-400">Loading...</p>;

  return (
    <div className="space-y-6 text-gray-100">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Products</h1>
        <a
  href="/products/new"
  style={{
    background: "#4f46e5",
    color: "white",
    padding: "10px 16px",
    borderRadius: "8px",
    fontWeight: "bold",
    textDecoration: "none",
  }}
>
  + Add Product
</a>


      </div>

      {/* SEARCH + FILTER */}
      <div className="flex gap-4">
       <input
  placeholder="Search product..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{
    background: "#1e293b",
    color: "white",
    padding: "8px 12px",
    borderRadius: "6px",
    border: "1px solid #334155",
    outline: "none",
  }}
/>


       <select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  style={{
    background: "#1e293b",
    color: "white",
    padding: "8px 12px",
    borderRadius: "6px",
    border: "1px solid #334155",
  }}
>
  <option value="">All Categories</option>
  <option value="Books">Books</option>
  <option value="Clothing">Clothing</option>
  <option value="Electronics">Electronics</option>
</select>

      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="bg-slate-800 rounded-xl shadow-lg p-4 flex flex-col"
          >
            {/* IMAGE */}
            {product.imageUrl && (
              <button
                onClick={() => setPreviewImage(product.imageUrl!)}
                className="w-full h-40 flex items-center justify-center bg-slate-900 rounded-md overflow-hidden"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-full object-contain"
                />
              </button>
            )}

            {/* NAME */}
            <h2 className="mt-4 text-lg font-semibold">
              {product.name}
            </h2>

            {/* CATEGORY BADGE ✅ */}
            <span className="mt-1 inline-block w-fit rounded-full bg-slate-700 px-3 py-1 text-xs text-slate-300">
             Category :  {product.category}
            </span>

            {/* DESCRIPTION */}
            <p className="text-sm text-gray-400 mt-2 line-clamp-2">
            Product Description : {product.description}
            </p>

            {/* PRICE + STOCK */}
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="font-semibold text-white">Price : ₹{product.price}</span>
<span className="text-slate-400">Stock: {product.stock}</span>

            </div>
{filteredProducts.length === 0 && (
  <div className="rounded-lg border border-slate-700 bg-slate-900 p-10 text-center text-slate-400">
    No products found.
  </div>
)}
            {/* ACTIONS (POLISHED) */}
           <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
  {/* EDIT */}
  <a
    href={`/products/edit/${product._id}`}
    style={{
      padding: "6px 14px",
      fontSize: "14px",
      color: "#ffffff",
      border: "1px solid #94a3b8",
      borderRadius: "6px",
      textDecoration: "none",
      background: "transparent",
    }}
  >
    Edit
  </a>

  {/* SELL */}
  <button
    onClick={() => {}}
    style={{
      padding: "6px 14px",
      fontSize: "14px",
      color: "#ffffff",
      background: "#059669",
      borderRadius: "6px",
      border: "none",
      cursor: "pointer",
    }}
  >
    Sell
  </button>

  {/* DELETE */}
  <button
    onClick={() => handleDelete(product._id)}
    style={{
      padding: "6px 14px",
      fontSize: "14px",
      color: "#ffffff",
      background: "#dc2626",
      borderRadius: "6px",
      border: "none",
      cursor: "pointer",
    }}
  >
    Delete
  </button>
</div>
          </div>
        ))}
      </div>

      {/* IMAGE MODAL */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
          onClick={() => setPreviewImage(null)}
        >
          <img
            src={previewImage}
            className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}
