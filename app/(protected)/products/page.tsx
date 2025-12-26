"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl?: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // FETCH PRODUCTS
  // =========================
  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("/api/products", {
        cache: "no-store",
      });

      if (!res.ok) {
        alert("Failed to fetch products");
        return;
      }

      const data = await res.json();
      setProducts(data);
      setLoading(false);
    }

    fetchProducts();
  }, []);

  // =========================
  // DELETE PRODUCT
  // =========================
  async function handleDelete(id: string) {
    const confirmed = confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    const res = await fetch(`/api/products?id=${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Failed to delete product");
      return;
    }

    // Remove product from UI instantly
    setProducts((prev) => prev.filter((p) => p._id !== id));
  }

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Products</h1>

        <Link
          href="/products/new"
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
        >
          + Add Product
        </Link>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow p-5 flex flex-col"
          >
            {product.imageUrl && (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-40 w-full object-cover rounded mb-4"
              />
            )}

            <h2 className="text-xl font-semibold">{product.name}</h2>

            <p className="text-gray-600 text-sm mt-1 flex-grow">
              {product.description}
            </p>

            <div className="flex justify-between items-center mt-4">
              <span className="font-bold">₹{product.price}</span>
              <span className="text-sm text-gray-500">
                Stock: {product.stock}
              </span>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-2 mt-4">
              <Link
                href={`/products/edit/${product._id}`}
                className="flex-1 text-center border rounded py-2 hover:bg-gray-100"
              >
                Edit
              </Link>

              <button
                onClick={() => handleDelete(product._id)}
                className="flex-1 border border-red-500 text-red-600 rounded py-2 hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {products.length === 0 && (
          <div className="col-span-full text-center text-gray-500">
            No products found.
          </div>
        )}
      </div>
    </div>
  );
}
