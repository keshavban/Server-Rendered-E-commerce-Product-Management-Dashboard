"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

type ProductForm = {
  name: string;
  description: string;
  price: string;
  stock: string;
  imageUrl: string;
  category: string;
};

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [form, setForm] = useState<ProductForm>({
    name: "",
    description: "",
    price: "",
    stock: "",
    imageUrl: "",
    category: "",
  });

  /* =========================
     Fetch product
     ========================= */
  useEffect(() => {
    if (!id) return;

    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setForm({
          name: data?.name ?? "",
          description: data?.description ?? "",
          price: data?.price != null ? String(data.price) : "",
          stock: data?.stock != null ? String(data.stock) : "",
          imageUrl: data?.imageUrl ?? "",
          category: data?.category ?? "",
        });
      });
  }, [id]);

  /* =========================
     Submit update
     ========================= */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      }),
    });

    if (!res.ok) {
      alert("Failed to update product");
      return;
    }

    router.push("/products");
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {(["name", "description", "imageUrl"] as const).map((field) => (
          <input
            key={field}
            className="w-full border p-3 rounded"
            placeholder={field}
            value={form[field]}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, [field]: e.target.value }))
            }
          />
        ))}

        <select
          className="w-full border p-3 rounded"
          value={form.category}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, category: e.target.value }))
          }
        >
          <option value="">Select Category</option>
          <option value="books">Books</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
        </select>

        <div className="flex gap-4">
          <input
            type="number"
            placeholder="Price"
            className="w-full border p-3 rounded"
            value={form.price}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, price: e.target.value }))
            }
          />
          <input
            type="number"
            placeholder="Stock"
            className="w-full border p-3 rounded"
            value={form.stock}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, stock: e.target.value }))
            }
          />
        </div>

        {/* Image upload */}
        <input
          type="file"
          accept="image/*"
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
            if (result?.url) {
              setForm((prev) => ({ ...prev, imageUrl: result.url }));
            }
          }}
        />

        {form.imageUrl && (
          <img
            src={form.imageUrl}
            alt="Product preview"
            className="h-40 object-cover rounded mt-3"
          />
        )}

        <button className="w-full bg-black text-white py-3 rounded hover:bg-gray-800">
          Save Changes
        </button>
      </form>
    </div>
  );
}
