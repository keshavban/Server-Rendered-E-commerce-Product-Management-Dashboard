"use client";

import { useState } from "react";
import Link from "next/link";
import { SellButton } from "./SellButton";

type Product = {
  _id: string;
  name: string;
  price: number;
  stock: number;
  imageUrl?: string;
};

export function ProductCard({
  product,
  onDelete,
}: {
  product: Product;
  onDelete: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-slate-800 rounded-xl p-4 shadow hover:shadow-lg transition">
      {/* IMAGE */}
      {product.imageUrl && (
        <>
          <img
            src={product.imageUrl}
            className="h-32 w-full object-cover rounded cursor-pointer"
            onClick={() => setOpen(true)}
          />

          {open && (
            <div
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
              onClick={() => setOpen(false)}
            >
              <img
                src={product.imageUrl}
                className="max-h-[90%] max-w-[90%] rounded"
              />
            </div>
          )}
        </>
      )}

      {/* INFO */}
      <h3 className="mt-3 font-bold text-lg">{product.name}</h3>

      <p className="text-sm text-gray-400">
        ₹{product.price} • Stock: {product.stock}
      </p>

      {/* ACTIONS */}
      <div className="mt-4 flex items-center gap-2">
        {/* EDIT — WHITE */}
        <Link
          href={`/products/edit/${product._id}`}
          className="px-4 py-2 text-sm rounded border border-slate-400 text-white hover:bg-slate-700 transition"
        >
          Edit
        </Link>

        {/* SELL — GREEN */}
        <SellButton
          productId={product._id}
          className="bg-emerald-600 text-white hover:bg-emerald-700"
        />

        {/* DELETE — RED */}
        <button
          onClick={() => onDelete(product._id)}
          className="px-4 py-2 text-sm rounded bg-red-600 text-white hover:bg-red-700 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
