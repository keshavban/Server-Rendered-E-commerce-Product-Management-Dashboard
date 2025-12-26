"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
type ProductForm = {
  name: string;
  description: string;
  price: string;
  stock: string;
  imageUrl: string;
};

export default function NewProductPage() {
  const router = useRouter();

  const [form, setForm] = useState<ProductForm>({
    name: "",
    description: "",
    price: "",
    stock: "",
    imageUrl: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      }),
    });

    router.push("/products");
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {(["name", "description", "imageUrl"] as const).map((field) => (
          <input
            key={field}
            placeholder={field}
            className="w-full border p-3 rounded"
            value={(form)[field]}
            onChange={(e) =>
              setForm({ ...form, [field]: e.target.value })
            }
          />
        ))}

        <div className="flex gap-4">
          <input
            type="number"
            placeholder="Price"
            className="w-full border p-3 rounded"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Stock"
            className="w-full border p-3 rounded"
            value={form.stock}
            onChange={(e) =>
              setForm({ ...form, stock: e.target.value })
            }
          />
        </div>
        <input
  type="file"
  accept="image/*"
  className="w-full"
  onChange={async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: data,
    });

    const result = await res.json();
    setForm({ ...form, imageUrl: result.url });
  }}
/>
{form.imageUrl && (
  <img
    src={form.imageUrl}
    className="h-40 object-cover rounded mt-3"
  />
)}

        <button className="w-full bg-black text-white py-3 rounded hover:bg-gray-800">
          Create Product
        </button>
      </form>
    </div>
  );
}
