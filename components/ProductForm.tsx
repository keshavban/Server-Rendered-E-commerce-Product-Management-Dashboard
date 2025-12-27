"use client";

import { useState } from "react";

export default function ProductForm() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    imageUrl: "",
    category : ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        description: form.description,
        price: Number(form.price),
        stock: Number(form.stock),
        imageUrl: form.imageUrl || undefined,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      alert(err.error || "Failed to create product");
      return;
    }

    alert("Product created successfully!");
    setForm({ name: "", description: "", price: "", stock: "", imageUrl: "" ,category:""});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <input
        name="name"
        placeholder="Product name"
        value={form.name}
        onChange={handleChange}
        className="w-full p-2 border"
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full p-2 border"
        required
      />

      <input
        name="price"
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        className="w-full p-2 border"
        required
      />

      <input
        name="stock"
        type="number"
        placeholder="Stock"
        value={form.stock}
        onChange={handleChange}
        className="w-full p-2 border"
        required
      />

      <input
        name="imageUrl"
        placeholder="Image URL (optional)"
        value={form.imageUrl}
        onChange={handleChange}
        className="w-full p-2 border"
      />
<select
  className="border rounded p-3 w-full bg-slate-900"
  value={form.category}
  onChange={(e) =>
    setForm({ ...form, category: e.target.value })
  }
>
  <option value="">Select Category</option>
  <option value="Books">Books</option>
  <option value="Clothing">Clothing</option>
  <option value="Electronics">Electronics</option>
  <option value="Other">Other</option>
</select>

      <button type="submit" className="bg-black text-white px-4 py-2">
        Create Product
      </button>
    </form>
  );
}
