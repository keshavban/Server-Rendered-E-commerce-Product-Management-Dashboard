"use client";

import { useState } from "react";
import { SellButton } from "./SellButton";

type Product = {
  _id: string;
  name: string;
  price: number;
  stock: number;
  imageUrl?: string;
};

export function ProductCard({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-slate-800 rounded-xl p-4 shadow hover:shadow-lg transition">
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

      <h3 className="mt-3 font-bold text-lg">{product.name}</h3>

      <p className="text-sm text-gray-400">
        ₹{product.price} • Stock: {product.stock}
      </p>

      <div className="mt-4 flex gap-2">
        <SellButton productId={product._id} />
      </div>
    </div>
  );
}
